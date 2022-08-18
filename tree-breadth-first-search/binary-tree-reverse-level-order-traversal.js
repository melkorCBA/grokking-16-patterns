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
one way to do this by adding the levels to a stack insted of a array 
follwing the same way as lvel order traversal

then poping up n times to a new array

T-(2n) S-O(3n)
 need to 2 arrays and a queue
 
 -- overall camparied to Level Order Traversal
 this requires extra n ittrations and extra array

but if we use Array.unshift no need extra array
but unShift's time complxity will be T-O(n*l); l= number of levels

*/

const customQueue = function () {
    const queue = [];
    return {
        front: 0,
        Add: function (el) {
           queue.push(el);
            return this.length();
        }, 
        Pop: function() {
            return queue[this.front++]
        },
        length: function () {
            return queue.length - this.front;
        }
    }
}

var levelOrderBottom = function(root) {
    if(!root){
        return [];
    }
    const queue = customQueue();
    const levels =[];
    queue.Add(root);
    while(queue.length() > 0){
        let i = queue.length();
        const level = [];
        while(i>0){
            const node = queue.Pop();
            if(node.left){
                queue.Add(node.left);
            }
            if(node.right){
                queue.Add(node.right);
            }
            level.push(node.val);
            --i;
        }
        levels.unshift(level)
    }
    return levels;
    
};