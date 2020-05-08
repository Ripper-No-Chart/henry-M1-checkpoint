class Queue {
  constructor() {
    this.array = [];
  }
  enqueue(elemento) {
    return this.array.push(elemento);
  }
  dequeue() {
    return this.array.shift();
  }
  size() {
    return this.array.length;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.listSize = 0; //Linea extra añadida
  }

  add(valor) {
    var nuevoNodo = new Node(valor);
    if (!this.head) {
      this.head = nuevoNodo;
    } else {
      var tailActual = this.head;
      while (tailActual.next !== null) {
        tailActual = tailActual.next;
      }
      tailActual.next = nuevoNodo;
    }
    this.listSize++; //Linea extra añadida
  }
  remove() {
    if (!this.head) {
      return undefined;
    }
    if (this.head.next === null) {
      var unicoNodo = this.head;
      this.head = null;
      return unicoNodo.value;
    }
    var nodoActual = this.head.next;
    var nodoPrevious = this.head;
    while (nodoActual.next !== null) {
      nodoPrevious = nodoActual;
      nodoActual = nodoActual.next;
    }
    nodoPrevious.next = null;
    this.listSize--; //Linea extra añadida
    return nodoActual.value;
  }
  search(arg) {
    var nodoActual = this.head;
    if (nodoActual === null) {
      return null;
    }
    while (nodoActual !== null) {
      if (typeof arg === "function") {
        if (arg(nodoActual.value)) {
          return nodoActual.value;
        }
      } else if (nodoActual.value === arg) {
        return nodoActual.value;
      }
      nodoActual = nodoActual.next;
    }
    return null;
  }
}

class Node {
  constructor(valor) {
    this.value = valor;
    this.next = null;
  }
}

function BinarySearchTree(valor) {
  this.value = valor;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function (value) {
  if (value < this.value) {
    if (this.left === null) {
      var newTree = new BinarySearchTree(value);
      this.left = newTree;
    } else {
      this.left.insert(value);
    }
  } else {
    if (this.right === null) {
      var newTree = new BinarySearchTree(value);
      this.right = newTree;
    } else {
      this.right.insert(value);
    }
  }
};

BinarySearchTree.prototype.size = function () {
  if (this.value === null) {
    return 0;
  }

  if (this.left === null && this.right === null) {
    return 1;
  }

  if (this.left === null) {
    return 1 + this.right.size();
  }

  if (this.right === null) {
    return 1 + this.left.size();
  }

  return 1 + this.left.size() + this.right.size();
};

module.exports = {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree,
};
