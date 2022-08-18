/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

/*
can be archived with a data structure that act as both queue and stack
- dobbly linked list
T-O(n), S-O(n/2)

*/

class QueueC {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  Add(node) {
    if (this.size === 0) {
      this.head = new TreeNode(node, null, null);
      this.tail = this.head;
      this.size = 1;
      return this.size;
    }

    this.tail.right = new TreeNode(node, this.tail, null);
    this.tail = this.tail.right;
    this.size++;
    return this.size;
  }

  AddLeft(node) {
    if (this.size === 0) {
      this.head =  new TreeNode(node, null, this.head);
      this.tail = this.head;
      this.size = 1;
      return this.size;
    }

    this.head.left = new TreeNode(node, null, this.head);
    this.head = this.head.left;
    this.size++;
    return this.size;
  }

  Pop() {
    if(this.size ===0){
        return null;
    }
    const popItem = this.head;
    this.head = this.head.right;
    if(this.head){
        this.head.left = null; 
    }
    this.size--;
    return popItem.val;
  }

  PopRight() {
    if(this.size ===0){
        return null;
    }
    const popItem = this.tail;
    this.tail = this.tail.left;
    if(this.tail){
        this.tail.right = null;    
    }
    this.size--;
    return popItem.val;
  }
}

/*
test case 1:
  3
 /\
9 20
  /\
 15 7
 
queue= 15 <-> 7 
l=3
[
[3],
[20,9],
[15,7]
]

*/

var zigzagLevelOrder1 = function (root) {
    if(!root){
        return [];
    }
    const queue = [];
    queue.push(root);
    let l = 1;
    const levels = [];
    while (queue.length > 0) {
      let i = queue.length;
      const level = [];
      while (i > 0) {
        // queue like or stack like
        const node = l % 2 !== 0 ? queue.shift() : queue.pop();
        level.push(node.val);
        if (l % 2 !== 0) {
          if (node.left) {
            queue.push(node.left);
          }
          if (node.right) {
            queue.push(node.right);
          }
        } else {
          if (node.right) {
            queue.unshift(node.right);
          }
          if (node.left) {
            queue.unshift(node.left);
          }
        }
        i--;
      }
      l++;
      levels.push(level);
    }
    return levels;
};

var zigzagLevelOrder = function (root) {
    if(!root){
        return [];
    }
    const queue = new QueueC();
    queue.Add(root);
    let l = 1;
    const levels = [];
    while (queue.size > 0) {
      let i = queue.size;
      const level = [];
      while (i > 0) {
        // queue like or stack like
        const node = l % 2 !== 0 ? queue.Pop() : queue.PopRight();
        level.push(node.val);
        if (l % 2 !== 0) {
          if (node.left) {
            queue.Add(node.left);
          }
          if (node.right) {
            queue.Add(node.right);
          }
        } else {
          if (node.right) {
            queue.AddLeft(node.right);
          }
          if (node.left) {
            queue.AddLeft(node.left);
          }
        }
        i--;
      }
      l++;
      levels.push(level);
    }
    return levels;
};

