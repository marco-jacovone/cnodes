import { Types, Type, type } from './type.js';

export class Socket {

  _name = '';
  _node = null;

  constructor(name, node) {
    this._name = name;
    this._node = node;
  }
  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }
  get node() {
    return this._node;
  }
  set node(val) {
    this._node = val;
  }
}

export class ValueSocket extends Socket {
  _type = type(Types.NUMBER, false);
  _value = 0;

  constructor(name, node, type = type(Types.NUMBER, false), value = 0) {
    super(name, node);
  }
  get type() {
    return this._type;
  }
  set type(val) {
    this._type = val;
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }
}

export class InputSocket extends ValueSocket {
  _peer = null;

  constructor(name, node, type, value) {
    super(name, node, type, value);
  }
  get peer() {
    return this._peer;
  }
  set peer(val) {
    this._peer = val;
  }
  evaluate() {
    if (this.peer !== null) {
      if (this.peer.node && this.peer.node.functional) {
        this.peer.node.process();
      }
      this.type = this.peer.type;
      this.value = this.peer.value;
    }
  }
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
  }
}

export class OutputSocket extends ValueSocket {
  _peers = [];

  constructor(name, node, type, value) {
    super(name, node, value, type);
  }
  get peers() {
    return this._peers;
  }
  set peers(val) {
    this._peers = val;
  }
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

export class FlowSocket extends Socket {
  constructor(name, node) {
    super(name, node);
  }
}

export class PrevSocket extends FlowSocket {
  _peers = [];
  constructor(name, node) {
    super(name, node);
  }
  get peers() {
    return this._peers;
  }
  set peers(val) {
    this._peers = val;
  }
  connect(socket) {
    if (this.peers.find((s) => s.peer === socket) === undefined) {
      this.peers.push(socket);
    }
    socket.peer = this;
  }
  disconnect(socket) {
    let index = this.peers.find((s) => s.peer === socket);
    if (index !== undefined) {
      this.peers.splice(index, 1);
      socket.peer = null;
    }
  }
}

export class NextSocket extends FlowSocket {
  _peer = null;
  constructor(name, node) {
    super(name, node);
  }
  get peer() {
    return this._peer;
  }
  set peer(val) {
    this._peer = val;
  }
  connect(socket) {
    this.peer = socket;
    if (socket.peers.find((s) => s.peer === this) === undefined) {
      socket.peers.push(this);
    }
  }
  disconnect(socket) {
    this.peer = null;
    let index = socket.peers.findIndex((s) => s.peer === this);
    if (index !== -1) {
      socket.peers.splice(index, 1);
    }
  }
}
