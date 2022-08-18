/*
Given a binary tree where each path going from the root to 
any leaf form a valid sequence, check if a given string is a valid sequence in such binary tree.

Example 1:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]
Output: true
Explanation: 
The path 0 -> 1 -> 0 -> 1 is a valid sequence (green color in the figure). 
Other valid sequences are: 
0 -> 1 -> 1 -> 0 
0 -> 0 -> 0

Example 2:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]
Output: false 
Explanation: The path 0 -> 0 -> 1 does not exist, therefore it is not even a sequence.

Example 3:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]
Output: false
Explanation: The path 0 -> 1 -> 1 is a sequence, but it is not a valid sequence.

Constraints:

    1 <= arr.length <= 5000
    0 <= arr[i] <= 9
    Each node’s value is between [0–9].

*/


function TreeNode (val, left, right){
	this.val = val;
	this.left = left;
	this.right = right;
}

const roots =  {
	test_case_1 : {
		params: [new TreeNode(0, new TreeNode(1, new TreeNode(0, null, new TreeNode(1, null, null)), new TreeNode(1, new TreeNode(0, null, null), new TreeNode(1, null, null))), new TreeNode(0, new TreeNode(1, null, null), null)), [0,1,0,1]],
		input: '[0,1,0,0,1,0,null,null,1,0,0], arr=[0,1,0,1]',

		output: true
	},
	test_case_2 : {
		params: [new TreeNode(0, new TreeNode(1, new TreeNode(0, null, new TreeNode(1, null, null)), new TreeNode(1, new TreeNode(0, null, null), new TreeNode(0, null, null))), new TreeNode(0, new TreeNode(0, null, null), null)), [0,0,1]],
		input: '[0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]',

		output: false
	},
	test_case_3 : {
		params: [new TreeNode(0,new TreeNode(1,new TreeNode(0, null, new TreeNode(1, null, null)), new TreeNode(1, new TreeNode(0, null, null), new TreeNode(0, null, null))),new TreeNode(0, new TreeNode(0, null, null), null)), [0,1,1]],
		input: '[0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]',

		output: false
	}
}

/*
if we do a DFS with removing first chracter after each valid node
can do it with T-O(n), S-O(logn)
can remove the 

if !root && sequence.length > 0 return false
if !root && sequence.length === 0 return true
if root.val ! == sequence[0]
	return false;
if root.val === sequence[0]
	const leftTree = findPath(roo.left, sequence.slice(1, sequence.length));
	const rightTree = findPath(roo.right, sequence.slice(1, sequence.length));
	return leftTree || rightTree;

*/

/*

but with Array.slice -T-O(n)
so actual T of the soultion will be T-O(n^2)
but if we mantain a index of the current character checking in the sequence we can dial it down for T-O(n)
*/

var findPath1 = function (root, sequence) {
	if(!root){
		// make sure there is no remaning part to check in the sequence
		if(sequence.length > 0) return false;
		// sequence is matched a path from root to leaf
		if(sequence.length === 0) return true;
	}
	// not yet reached a leaf but sequence is already over
	if(sequence.length == 0) return false;

	if(root.val !== sequence[0]) return false;

	const newSequence = sequence.slice(1,sequence.length);
	return findPath(root.left, newSequence) || findPath(root.right, newSequence);
}

/*
complexcity of this
T-O(n)
S-O(log n)
*/

var findPath = function (root, sequence) {
	const findPathRec = function (root, sequence, index) {
	if(!root){
		// make sure there is no remaning part to check in the sequence
		if(index < sequence.length) return false;
		// sequence is matched a path from root to leaf
		if(index === sequence.length) return true;
	}
	// not yet reached a leaf but sequence is already over
	if(index === sequence.length) return false;

	// sequece's current character is matched
	if(root.val !== sequence[index]) return false;

	// check either of the subtree can complete the path to leaf with given sequence
	index++;
	return findPathRec(root.left, sequence, index) || findPathRec(root.right, sequence, index);
	}
	return findPathRec(root, sequence, 0);
}

Object.keys(roots).forEach((testCase, i) => {
	const {params, input, output} = roots[testCase];
	console.log(`test case:${i+1}: ${input} `);
	console.log(`Output: ${output}`)
	const result = findPath(params[0], params[1])
	console.log(`result: ${result}`);
	console.log(`Test Case ${result === output ? 'Passed' : 'Failed'}`)
})
