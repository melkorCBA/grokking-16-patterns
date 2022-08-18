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
can apply DFS
in a leaf node return the countrcted number to parent node will do it
need to constrcut number

next number = currentNumber * 10 + node.val

by going down a level will ad a new digit the the current number
so the complexcity of this will be
T-O(n) S-O(log n) worst case S-O(n)

but need a shell function
let's just call it sumNumbersRec

*/

/*
test case 2
    4
   /\
  9 0
 /\
5 1

f(4,0,0) = (495+491) + (40) = 1026
cu=4
f(9,4,1)+f(0,4,1)
(495+491) + (40)
f(9,4,1)
--------
cu=4*0+9=49
f(5,49,2) + f(1,49,2)
 (495)       (491)

f(5,49,2)
-------------
cu=49*100 + 5 = 495
return 495

f(1,49,2)
-------------
cu=491
return 491

f(0,4,1)
---------
cu=4*10 + 40
return 40

*/

var sumNumbers = function(root) {
    const sumNumbersRec = function(root, current)  {
        if(!root) return 0;

        current = (current * 10) + root.val;
        
        if(!root.left && !root.right) return current;
           
        return sumNumbersRec(root.left, current)
        + sumNumbersRec(root.right, current);
        
    }
    return sumNumbersRec(root, 0);
};