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
 * This class implements a node to get return a simple
 * number constant. This is a functional node.
 */
export class FNConst extends Node {
  constructor() {
    super("FNConst");
    this.functional = true;
    this.inputs = [new InputSocket("Val", this, Types.ANY, 0)];
    this.outputs = [new OutputSocket("Val", this, Types.NUMBER, 0)];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process function
   */
  process() {
    this.evaluateInputs();

    // Convert the constant/input value to a string
    this.output("Val").value = parseFloat(this.input("Val").value);
  }
}

/**
 * A helper function to create the node
 */
export function fnconstNode() {
  return new FNConst();
}