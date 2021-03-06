/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "./node.mjs";
import { NextSocket, OutputSocket, InputSocket } from "./socket.mjs";
import { Types } from "./type.mjs";

/**
 * This class implements a cnode that is the starting point for a
 * program. The program can be top-level or not
 */
export class Enter extends Node {
  // Provide a node instance
  static instance = () => new Enter();

  /**
   * Construct a new Enter node
   */
  constructor() {
    super("Enter");
    this.removable = false;
    this.creatable = false;
    this.inputs = [];
    this.outputs = [new OutputSocket("Val", this, Types.ANY, 0)];
    this.nexts = [new NextSocket("Begin", this)];
    this.prev = null;
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Enter.instance) {
    return super.clone(factory);
  }

  /**
   * The process method
   */
  async process() {
    return this.getFlowResult(this.next("Begin"));
  }
}
