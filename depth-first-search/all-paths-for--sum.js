/*
Given the root of a binary tree and an integer targetSum, return 
all root-to-leaf paths where the sum of the node values in the path 
equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

Example 1:

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22

Example 2:

Input: root = [1,2,3], targetSum = 5
Output: []

Example 3:

Input: root = [1,2], targetSum = 0
Output: []

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
 * @return {number[][]}
 */

/*
can do it recursively - T=O(n), S-O(logn)

if node is leaf and target sum matched
    return [node.val]
if leaf node
    return []
    
    leftPaths = pathSum(node.left, tagegetSum-node.val)
    rightPaths = pathSum(node.right, tagegetSum-node.val)
    paths = []
    leftPaths.forEach  => path      // T-O(n^2), S-O(number of leafs nodes = n/2)
        paths.push([node.val].push(path))
    rightPaths.forEach  => path
        paths.push([node.val].push(path))
    return paths

*/

var pathSum1 = function(root, targetSum) {
    if(!root){
        return [];
    }
    if(!root.left && !root.right && root.val === targetSum){
        return [[root.val]];
    }
    if(!root.left && !root.right){
        return [];
    }
    
    const leftPaths = pathSum(root.left, targetSum - root.val);
    const rightPaths = pathSum(root.right, targetSum - root.val);
    const paths = [];
    leftPaths.concat(rightPaths).forEach(path => {
        const p = [root.val];
        p.push(...path);
        paths.push(p);
    })
    return paths;
};


/*
to archive T-O(n^2)
we have to use a shell function
 need to keep track of what are the nodes currently from root
 for each node
 
 that way week and add root-to leaft paths

*/

/*
here T-O(n)
but S-space complexcity coud be O(nlogn)
***but
the spread operator is going the the list m time (m = number of elements)
so heigest number of elemnts path list can have = logn
so T-O(n*logn)~O(nlogn)

stack size - log n
max posible size of on path array = logn
S-O(2log n)


*/

var pathSum = function(root, targetSum) {
    const paths = [];
    
    const pathSumRec = function (node, sum, path) {
        if(!node) {
            return [];
        }
        
        if(!node.left && !node.right && sum===node.val){
            paths.push( [...path, node.val])
            return;
        }
        const p = [...path, node.val];
        pathSumRec(node.left, sum - node.val, p)
        pathSumRec(node.right, sum - node.val, p);
    }
    
    pathSumRec(root, targetSum, []);
    
    
    return paths;
}

