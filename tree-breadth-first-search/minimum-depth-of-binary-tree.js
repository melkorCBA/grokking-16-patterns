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
 * @return {number}
 */

/*
test case 1:
 3
 /\
9 20
  /\
 15 7
 
depth=1 
 
*/

/*
complexcicty
T-O(n), S-O(n/2)

but acctually
T-O(n^2), S-O(n/2)
*/

var minDepth = function(root) {
    if(!root){
        return 0;
    }
    
    const queue = [root];
    let depth=1;
    while(queue.length > 0){
        let i = queue.length;
        while(i>0){
            const node = queue.shift();
            if(!node.left && !node.right){
                return depth;
            }
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
            i--;
        }
        depth++;
    }
};