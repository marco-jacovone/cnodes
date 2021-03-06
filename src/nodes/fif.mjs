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
 * This class implements a functional conditional node
 */
export class FIf extends Node {
  // Provide a node instance
  static instance = () => new FIf();

  /**
   * Construct a new FIf node
   */
  constructor() {
    super("FIf");

    // The node is pure functional
    this.functional = true;

    // Default to two any inputs
    this.inputs = [
      new InputSocket("Condition", this, Types.BOOLEAN, false),
      new InputSocket("True", this, Types.ANY, 0),
      new InputSocket("False", this, Types.ANY, 0),
    ];

    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FIf.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    this.output("Val").value = this.input("Condition").value
      ? this.input("True").value
      : this.input("False").value;
  }
}
