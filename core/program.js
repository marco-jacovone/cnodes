/**
 * cnodes
 *
 * A representation-agnostic library to define and execute nodes based processes
 * License: MIT
 * Author: Marco Jacovone
 * Year: 2020
 */

import { Enter } from "./enter.js";
import { Exit } from "./exit.js";
import { Node, Result } from "./node.js";
import { InputSocket, NextSocket, OutputSocket, PrevSocket } from "./socket.js";
import { type, Type, Types } from "./type.js";

/**
 * A program is a special node that contains nodes. The program
 * manages the flow of the global execution by starting from the
 * "Enter" default, autocreated node, call its process() method and receive the next
 * "next". A program also store a global variable space
 */
export class Program extends Node {
  /** Engine version */
  static version = 1;

  /** The nodes in this program */
  #nodes = [];

  /** The Enter node */
  #enter = null;

  /** The Exit node */
  #exit = null;

  /** The instruction pointer equivalent :) */
  #currentNode = null;

  /** The variable global space */
  #vars = new Map();

  constructor() {
    super("Program");
    this.inputs = [new InputSocket("Val", this, type(Types.ANY, false), 0)];
    this.outputs = [new OutputSocket("Val", this, type(Types.ANY, false), 0)];
    this.nexts = [new NextSocket("Out", this)];
    this.prev = new PrevSocket("In", this);

    // Create default enter, exit nodes
    this.addNode((this.#enter = new Enter())).addNode(
      (this.#exit = new Exit())
    );
  }

  get vars() {
    return this.#vars;
  }
  set vars(val) {
    this.#vars = val;
  }
  get enter() {
    return this.#enter;
  }
  set enter(val) {
    this.#enter = val;
  }
  get exit() {
    return this.#exit;
  }
  set exit(val) {
    this.#exit = val;
  }
  get currentNode() {
    return this.#currentNode;
  }
  set currentNode(val) {
    this.#currentNode = val;
  }
  get nodes() {
    return this.#nodes;
  }
  set nodes(val) {
    this.#nodes = val;
  }

  /**
   * Add a new node to this program
   * @param {*} node The node to add
   * @param {*} isStart Is that node the start node?
   */
  addNode(node) {
    this.#nodes.push(node);

    // Set this program to the node
    node.program = this;
    return this;
  }

  /**
   * Removes a node from this program, disconnect all sockets
   * @param {*} node The node to remove
   */
  removeNode(node) {
    // Disconnect its sockets
    node.disconnectAllSockets();

    this.#nodes = this.#nodes.filter((n) => n.id !== node.id);
    node.program = null;
    return this;
  }

  /**
   * The process method will start from the Enter node and
   * cycle over nexts returned by the process functions of nodes.
   * The Program node couldn't be a top-level program, but a sub-nod
   * of another program. For that reason, the process() method copy the
   * value of the only input in the Program node to the only one
   * input of the "Enter" forst node.
   * This is a limitation: The Program node can be actually only 1 input
   * and only 1 output. At the same, Enter and Exit nodes will have only
   * 1 input and output respectively.
   * At the end, the process() methos of the Program node, will copy the
   * value of the Exit's output to the unique output of the Program node
   */
  process() {
    this.evaluateInputs();

    // Copy input to enter's input
    this.#enter.input("Val").value = this.input("Val").value;
    this.#enter.input("Val").type = this.input("Val").type;

    this.processFrom(this.#enter);

    // Copy output to exit's output
    this.output("Val").value = this.#exit.output("Val").value;
    this.output("Val").type = this.#exit.output("Val").type;

    return this.getFlowResult(this.next("Out"));
  }

  /**
   * Execute a program useng node as starting point
   * @param {*} node Starting point node
   */
  processFrom(node) {
    this.currentNode = node;
    while (this.currentNode !== null) {
      let result = this.currentNode.process();
      this.currentNode = result.next;
    }
  }
}

/**
 * A helper function to create the program
 * @param {*} name The name of the program
 */
export function program() {
  return new Program();
}