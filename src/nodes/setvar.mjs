/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import {
  InputSocket,
  NextSocket,
  PrevSocket,
  OutputSocket,
} from "../core/socket.mjs";
import { Types } from "../core/type.mjs";

/**
 * This class implements a node to set a variable
 * value in the program's global space. If the variable
 * don't exists, the processo function will create it
 */
export class Setvar extends Node {
  // Provide a node instance
  static instance = () => new Setvar();

  /**
   * Construct a new Setvar node
   */
  constructor() {
    super("Setvar");
    this.inputs = [
      new InputSocket("Name", this, Types.STRING, 0),
      new InputSocket("Val", this, Types.ANY, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, "")];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Setvar.instance) {
    return super.clone(factory);
  }

  /**
   * The process fmethod
   */
  async process() {
    await this.evaluateInputs();

    let varName = this.input("Name").value;
    let varVal = this.input("Val").value;
    this.program.vars.set(varName, varVal);
    this.output("Val").value = varVal;

    return this.getFlowResult(this.next("Out"));
  }
}
