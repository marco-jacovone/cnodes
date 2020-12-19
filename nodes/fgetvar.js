/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Node } from "../core/node.js";
import { InputSocket, OutputSocket } from "../core/socket.js";
import { Type, Types } from "../core/type.js";

/**
 * This class implements a functional GetVar node,
 * a node to read a variable's value from the global
 * program's space
 */
export class FGetvar extends Node {
  constructor() {
    super("FGetvar");
    this.functional = true;
    this.inputs = [
      new InputSocket("Name", this, new Type(Types.STRING, false), ""),
    ];
    this.outputs = [
      new OutputSocket("Val", this, new Type(Types.ANY, false), ""),
    ];
    this.nexts = [];
    this.prev = null;
  }

  /**
   * The process method
   */
  process() {
    this.evaluateInputs();

    let varName = this.input("Name").value;
    this.output("Val").value = this.program.vars.get(varName);
  }
}

/**
 * Helper function to create the node
 */
export function fgetvarNode() {
  return new FGetvar();
}