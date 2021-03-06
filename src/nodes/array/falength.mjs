/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../../core/node.mjs";
import { InputSocket, OutputSocket } from "../../core/socket.mjs";
import { Types } from "../../core/type.mjs";

/**
 * This class implements a functional node for get
 * the length of an array
 */
export class FALength extends Node {
  // Provide a node instance
  static instance = () => new FALength();

  /**
   * Construct a new FALength node
   */
  constructor() {
    super("FALength");

    // The node is pure functional
    this.functional = true;

    // Default to two numeric inputs
    this.inputs = [new InputSocket("Array", this, Types.ARRAY, 0)];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FALength.instance) {
    return super.clone(factory);
  }

  /**
   * The process override
   */
  async process() {
    await this.evaluateInputs();
    let arr = this.input("Array").value;

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      this.output("Val").value = arr.length;
    }
  }
}
