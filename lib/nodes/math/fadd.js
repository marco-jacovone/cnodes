"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAdd = undefined;

var _node = require("../../core/node.js");

var _socket = require("../../core/socket.js");

var _type = require("../../core/type.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This class implements a functional node for adding numeric values.
 * Supports a indefinite number of value inputs and one single output
 */
class FAdd extends _node.Node {
  // Provide a node instance

  /**
   * Construct a new FAdd node
   */
  constructor() {
    super("FAdd"); // The node is pure functional

    this.functional = true; // This node has a variable number of inputs

    this.canAddInput = true; // Default to two numeric inputs

    this.inputs = [new _socket.InputSocket("0", this, _type.Types.NUMBER, 0), new _socket.InputSocket("1", this, _type.Types.NUMBER, 0)];
    this.outputs = [new _socket.OutputSocket("Val", this, _type.Types.NUMBER, 0, false)];
    this.prev = null;
    this.nexts = [];
  }
  /**
   * The process override
   */


  async process() {
    let sum = 0;
    await this.evaluateInputs();

    for (let inp of this.inputs) {
      sum += parseFloat(inp.value);
    }

    this.output("Val").value = sum;
  }
  /**
   * If this.#canAddInput is true, the user can add an input
   * equal to the (at least one) input that already exists
   */


  addInput() {
    if (this.canAddInput) {
      this.inputs.push(new _socket.InputSocket("", this, _type.Types.NUMBER, "")); // Rename all inputs to its ordinal number in the inputs array

      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't add input!");
    }
  }
  /**
   * This method removes a specific input from the node, if
   * this is possible whit this instance
   * @param {InputSocket} input The input to remove
   */


  removeInput(input) {
    if (this.canRemoveInput(input)) {
      this.inputs = this.inputs.filter(i => i !== input); // Rename all inputs to its ordinal number in the inputs array

      for (let [idx, i] of this.inputs.entries()) {
        i.name = "" + idx;
      }
    } else {
      throw new Error("Can't remove input");
    }
  }
  /**
   * Can this node remove a specific input?
   * In this case, there must be at least 2 inputs
   * @param {InputsSocket} input The input to remove
   */


  canRemoveInput(input) {
    return this.inputs.length > 2;
  }
  /**
   * Clone this node
   * @param {Function} factory The factory class function
   */


  clone(factory = FAdd.instance) {
    return super.clone(factory);
  }

}

exports.FAdd = FAdd;

_defineProperty(FAdd, "instance", () => new FAdd());