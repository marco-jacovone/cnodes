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
 * This class override the FCompare node with a comparision of NOT_EQUAL
 */
export class FNotEqual extends FCompare {
  // Provide a node instance
  static instance = () => new FNotEqual();

  /**
   * COnstruct a new FNotEqual node
   */
  constructor() {
    super(Comparision.NOT_EQUAL);
    this.name = "FNotEqual";
    this.title = "!=";
  }

  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */
  clone(factory = FNotEqual.instance) {
    return super.clone(factory);
  }
}
