/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { Node } from "../core/node.mjs";
import { NextSocket, PrevSocket } from "../core/socket.mjs";

/**
 * This class implements a subroutine/function call
 */
export class Call extends Node {
  // Provide a node instance
  static instance = () => new Call();

  /**
   * Construct a new Call node
   */
  constructor() {
    super("Call");
    this.inputs = [];
    this.outputs = [];
    this.nexts = [new NextSocket("Out", this), new NextSocket("Call", this)];
    this.prev = new PrevSocket("In", this);
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = Call.instance) {
    return super.clone(factory);
  }

  /**
   * The process function
   */
  async process() {
    // Save the current program's node
    let prevCurrentNode = this.program.currentNode;

    // Execute a sub program beginning on that node
    await this.program.processFrom(this.next("Call").peer.node);

    // Restore the current program's node
    this.program.currentNode = prevCurrentNode;

    return this.getFlowResult(this.next("Out"));
  }
}
