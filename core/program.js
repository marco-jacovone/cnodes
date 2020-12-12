
import { Node } from './node.js'

export class Program extends Node {

  _nodes = new Map();
  _start = null;
  _vars = new Map();

  constructor(name) {
      super(name);
    }
    get vars() {
        return this._vars;
    }
    set vars(val) {
        this._vars = val;
    }
    get start() {
      return this._start;
    }
    set start(val) {
      this._start = val;
    }
    get nodes() {
      return this._nodes;
    }
    set nodes(val) {
      this._nodes = val;
    }
    addNode(node, isStart) {
      this._nodes.set(node.id, node);
      if (isStart) {
        this._start = node;
      }
      node.program = this;
      return this;
    }
    removeNode(node) {
      if (this.start && this.start.id === node.id) {
        this.start = null;
      }
      this._nodes.delete(node.id);
      node.program = null;
      return this;
    }
    clear() {
      this._nodes = [];
      return this;
    }
    toString() {
      return (
        "P{'" +
        this.name +
        "',{" +
        this._nodes.reduce(
          (t, n, i, a) => t + n.toString() + (i < a.length - 1 ? "," : ""),
          ""
        ) +
        "}"
      );
    }
    process() {
        this.vars.set('start_timestamp', new Date().getTime());
      if (!this._start) {
        return new Result();
      }
      let currentNode = this._start;
      while (currentNode !== null) {
        let result = currentNode.process();
        currentNode = result.next;
      }
    }
  }

  export function program(name) {
      return new Program(name);
  }
  