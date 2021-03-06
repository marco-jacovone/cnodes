/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020-2021
 */

import { FCompare } from "./fcompare.mjs";
import { Comparision } from "./fcompare.mjs";

/**
 * This class override the FCompare node with a comparision of EQUAL
 */
export class FEqual extends FCompare {
  // Provide a node instance
  static instance = () => new FEqual();

  /**
   * Construct a new FEqual
   */
  constructor() {
    super(Comparision.EQUAL);
    this.name = "FEqual";
    this.title = "==";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FEqual.instance) {
    return super.clone(factory);
  }
}
