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
need to implement BFS (visit closet nodes first)

to Implement BFS need a queue

when at a new level
find the queue length
pop queue lenght times untill the current level is over
when popping element add not null chidls to the queue
BFS is over when the queue is empty

for queue in js can use array
but for pop wen can use Array.splice(0,1) insted of pop to remove fomr begning

but Array.splcie is T-O(n)
so better to have pointers front and rear

if wenn neet to archiive S-O(n/2) (the maximum number of elemnts a level can have)
need to implement a circullar queue

but implment a circullar queue need the queue size = n/2
need to find how may nodes in the tree - T-O(n)

but without a reguallr queue we can do that with the S-O(n)
so this queue
Add - T-O(1)
Pop - T-O(1)
S-O(n)
length = rear-front +1 (array.length) -  front


Overall complexcity
T-(queue oprations- O(1), vist each node 1 time - O(n))=O(n)
S-(queue O(n)) = O(n)

*/


//this queue has S-O(n) for BFS level order trversal
const customQueue = () => {
    const q = [];
    return {
      front: 0,
      Add: function (el) {
        q.push(el);
        return this.length();
      },
      Pop: function () {
        return q[this.front++];
      },
      length: function () {
        return q.length - this.front;
      },
    };
};


/*
test cases: 1
  3
 /\
9 20
  /\
 15 7
 
 queue = [15,7]
 i=2
 levels=[
 [3], [9, 20]
 ]

*/
var levelOrder = function (root) {
    if (!root) {
      return [];
    }

    const queue = customQueue();

    queue.Add(root);
    const levels = [];
    while (queue.length() > 0) {
      let i = queue.length();
      const level = [];
      while (i > 0) {
        const node = queue.Pop();
        if (node.left) {
          queue.Add(node.left);
        }
        if (node.right) {
          queue.Add(node.right);
        }
        level.push(node.val);
        --i;
      }
      levels.push(level);
    }
    return levels;
};
