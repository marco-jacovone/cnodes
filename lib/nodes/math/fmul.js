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
 * This class implements a functional node for multiply numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
export class FMul extends Node {
  constructor() {
    super("FMul");
    // The node is pure functional
    this.functional = true;

    // This node has a variable number of inputs
    this.canAddInput = true;

    // Default to two numeric inputs
    this.inputs = [
      new InputSocket("0", this, Types.NUMBER, 0),
      new InputSocket("1", this, Types.NUMBER, 0),
    ];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0)];
    this.prev = null;
    this.nexts = [];
  }

  /**
   * The process override
   */
  process() {
    let mul = 1;
    this.evaluateInputs();
    for (let inp of this.inputs) {
      mul *= parseFloat(inp.value);
    }
    this.output("Val").value = mul;
  }

  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 2 inputs
   * @param {InputsSocket} input The input to remove
   */
  canRemoveInput(input) {
    return this.inputs.length > 2;
  }
}

/**
 * Helper fuction to create the node
 */
export function fmulNode() {
  return new FMul();
}