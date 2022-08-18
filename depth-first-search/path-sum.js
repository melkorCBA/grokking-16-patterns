/*
Given the root of a binary tree and an integer targetSum,
return true if the tree has a root-to-leaf path such
that adding up all the values along the path equals targetSum.

Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.

Example 2:
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.

Example 3:
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.

*/

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
 * @param {number} targetSum
 * @return {boolean}
 */

/*
if we can check a node is already visted from T-O(1)
this could be done linearly using only one stack interatively
T-O(n), S-O(logn)

but lookup of already visted hard to do with O(1)
if use a array it will be O(n^2) - n*n

if we use 2 stacks  interative soultion wil be T-O(n), S-O(2logn)
two stacks
visted stack
sum stack

this won't be excatly in-order/post-order trversal or DEF because we pop top to bottom
5,4,11,2
*/


/*
test case 1
stack = [7, ]
sums = [27,]
*/

var hasPathSum1 = function(root, targetSum) {
    
    if(!root){
        return false;
    }
    const stack = [root];
    const sums = [root.val];
    
    while(stack.length > 0){
        const node = stack.pop();
        const sum = sums.pop();
        if(!node.left && !node.right && sum===targetSum){
            return true;
        }
        if(node.left){
            stack.push(node.left);
            sums.push(sum+node.left.val);
        }
        if(node.right){
            stack.push(node.right);
            sums.push(sum+node.right.val);
        }
    }
    return false;
    
    
};


/*
recursive soultion

this can be done in T-O(n), S-O(logn)
*/


var hasPathSum = function(root, targetSum) {
    
    if(!root){
        return false;
    }
    
    if(!root.left && !root.right){
        if(targetSum-root.val === 0){
            return true;
        }
        return false;
    }
    
    return hasPathSum(root.left, targetSum - root.val) ||
       hasPathSum(root.right, targetSum - root.val) 
    
    
}