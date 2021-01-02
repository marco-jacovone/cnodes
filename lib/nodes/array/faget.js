/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../../core/node.js";
import { InputSocket, OutputSocket } from "../../core/socket.js";
import { Types } from "../../core/type.js";

/**
 * This class implements a functional node for pick
 * a single value from an array
 */
export class FAGet extends Node {
  constructor() {
    super("FAGet");

    // The node is pure functional
    this.functional = true;
    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("Array", this, Types.ARRAY, 0),
      new InputSocket("Index", this, Types.NUMBER, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    this.evaluateInputs();
    let arr = this.input("Array").value;
    let index = parseInt(this.input("Index").value, 10);

    if (!Array.isArray(arr)) {
      // TODO: Manage error
    } else {
      this.output("Val").value = arr[index];
    }
  }
}

/**
 * Helper fuction to create the node
 */
export function fagetNode() {
  return new FAGet();
}