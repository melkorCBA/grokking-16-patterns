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
 * @return {number[]}
 */

/*
same ad level order traversl 
apply BFS

complexcity
T-O(n)
S-O(n/2)

*/
var averageOfLevels = function(root) {
    if(!root){
        return [0];
    }
    
    const queue = [];
    queue.push(root);
    const averages =[];
    while(queue.length > 0){
        let i = queue.length, d = queue.length;
        let sum = 0;
        while(i>0){
            const node = queue.shift();
            sum+=node.val;
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
            i--;
        }
        averages.push(sum/d);
    }
    return averages;
};