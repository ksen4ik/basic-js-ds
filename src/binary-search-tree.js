const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addSub(this.rootNode, data);
    function addSub(node, data) {
      if(!node) return new Node(data);
      if(node.data == data) return node;
      if(data > node.data) {
        node.right = addSub(node.right, data);
      } else {
        node.left = addSub(node.left, data);
      }
      return node;
    }
  }

  has(data) {
    return hasSub(this.rootNode, data);

    function hasSub(node, data) {
      if(!node) return false;
      if(node.data == data) return true;

      return data > node.data ? hasSub(node.right, data) : hasSub(node.left, data);
    }
  }

  find(data) {
    return hasSub(this.rootNode, data);

    function hasSub(node, data) {
      if(!node) return null;
      if(node.data == data) return node;

      return data > node.data ? hasSub(node.right, data) : hasSub(node.left, data);
    }
  }

  remove(data) {
    this.rootNode = removeSub(this.rootNode, data);

    function removeSub(node, data) {
      if(!node) return null;
      if(data < node.data) {
        node.left = removeSub(node.left, data);
        return node;
      } else if(data > node.data) {
        node.right = removeSub(node.right, data);
        return node;
      } else {
        if(!node.left && !node.right) return null;
        if(!node.left) {
          node = node.right;
          return node;
        }
        if(!node.right) {
          node = node.left;
          return node;
        }

        let rightMin = node.right;
        while(rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;
        node.right = removeSub(node.right, rightMin.data)

        return node;
      }
    }
  }

  min() {
    if(!this.rootNode) return;

    let node = this.rootNode;
    while(node.left) node = node.left;

    return node.data;
  }

  max() {
    if(!this.rootNode) return;

    let node = this.rootNode;
    while(node.right) node = node.right;

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
