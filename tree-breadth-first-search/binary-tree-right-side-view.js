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

   10
   /\
  5 12
 /\
2 8
 \ 
  7
  
  right side = [10,12,8,7]
  if we enter left first and right second to the last elemnt to level from the queue for a level
  is the node that contrbutes to the right side
  
  so need perforem the lvel order traversal (BFS) and record last elements lveing the queue for each elevel
  complexcity:  T-O(n), S-O(n/2)


*/

/*
test case : 1
queue = []
rightSide = [1, 3, 4]

*/

var rightSideView = function(root) {
    if(!root){
        return [];
    }
    
    const rightSide = [];
    const queue = [root];
    while(queue.length >0){
        let i = queue.length;
        while(i>0){
            const node = queue.shift();
            if(i===1){
                rightSide.push(node.val);
            }
            if(node.left){
                queue.push(node.left);
                
            }
            if(node.right){
                queue.push(node.right);
            }
            
            i--;
        }
    }
    
    
    
    return rightSide;
};