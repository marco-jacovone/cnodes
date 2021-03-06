/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import { InputSocket, OutputSocket } from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a functional GetVar node,
 * a node to read a variable's value from the global
 * program's space
 */
export class FGetvar extends Node {
  // Provide a node instance
  static instance = () => new FGetvar();

  /**
   * Construct a new FGetvar node
   */
  constructor() {
    super("FGetvar");
    this.functional = true;
    this.inputs = [new InputSocket("Name", this, Types.STRING, "")];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "", false)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FGetvar.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    await this.evaluateInputs();

    let varName = this.input("Name").value;
    this.output("Val").value = this.program.vars.get(varName);
  }
}
