/*
Problem Statement 
Given a binary tree and a number ‘S’, 
find all paths in the tree such that the sum of all the node values of each path equals ‘S’. 
Please note that the paths can start or end at any node but all paths must follow direction from parent to child (top to bottom).

*/

/*
one way to do it to use map for identfing there is a downward path matching k sum aywhere
also need to keep track what are the lements travased by the current path from the root
so when we find a matching counter part we can
again loop the the current path array until counter part sum matches and add the remaing path as a matching path  

this will be T-O(log n) for each opration
so will effect as T-O(n^2)
for all opration
alos S-O(n+logn*logn)

but we willbe visting a node only 1 time

*/

var countPath = function(root, S) {
const paths = [];
const map = new Map();
// handle root element val is S
map.set(0,1)
const countPathRec = (root, currentSum,  path) => {
	if(!root){
		return;
	}
	const p = [...path, root.val];
	currentSum+=root.val;
	const counterPart = currentSum - S;
	if(map.has(counterPart)){
		// find the start of the path
		let i=0;
		let counterSum = 0;
		while(counterSum !== counterPart){
			counterSum+=path[i]
			i++;
		}
		paths.push(p.slice(i+1, p.length));
	}
	if(!map.has(currentSum)) map.set(currentSum, 0);
	map.set(currentSum, map.get(currentSum)+1);

	countPathRec(root.left, currentSum, path);
	countPathRec(root.right, currentSum, path);
	map.set(currentSum, map.get(currentSum)-1);

}
countPathRec(root, 0, []);
return paths;

}





















































function TreeNode (val, left, right){
	this.val = val;
	this.left = left;
	this.right = right;
}

const roots =  {
	test_case_1 : {
		params: [new TreeNode(10, new TreeNode(5, new TreeNode(3,new TreeNode(3, null, null),new TreeNode(-2, null, null)), new TreeNode(2,null, new TreeNode(1, null, null))), new TreeNode(-3, null, new TreeNode(11, null, null))), 8],
		input: '[10,5,-3,3,2,null,11,3,-2,null,1], S = 8',

		output: [[5,3], [5,2,1], [-3,11]]
	},
	// test_case_2 : {
	// 	params: [new TreeNode(0, new TreeNode(1, new TreeNode(0, null, new TreeNode(1, null, null)), new TreeNode(1, new TreeNode(0, null, null), new TreeNode(0, null, null))), new TreeNode(0, new TreeNode(0, null, null), null)), [0,0,1]],
	// 	input: '[0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]',

	// 	output: false
	// },
	// test_case_3 : {
	// 	params: [new TreeNode(0,new TreeNode(1,new TreeNode(0, null, new TreeNode(1, null, null)), new TreeNode(1, new TreeNode(0, null, null), new TreeNode(0, null, null))),new TreeNode(0, new TreeNode(0, null, null), null)), [0,1,1]],
	// 	input: '[0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]',

	// 	output: false
	// }
}


Object.keys(roots).forEach((testCase, i) => {
	const {params, input, output} = roots[testCase];
	console.log(`test case:${i+1}: ${input} `);
	console.log(`Output: ${output}`)
	const result = countPath(params[0], params[1]);
	console.log(`result: ${result}`);
	let isFailed = false;
	for(let i=0; i<result.length; i++){
		if(!output.some(path => compareArr(path, result[i]))){
			console.log(`Test Case Failed`);
			isFailed = true;
			break;
		}
	}
	if(!isFailed){
		console.log(`Test Case Passed}`);
	}
	
	
})



function compareArr(arr1, arr2) {
  return arr1.sort().join(',') == arr2.sort().join(',');
}