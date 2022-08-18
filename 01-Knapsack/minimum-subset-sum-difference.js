/*
Problem Statement 
Given a set of positive numbers, partition the set into two subsets with minimum difference 
between their subset sums.

Example 1: 
Input: {1, 2, 3, 9}
Output: 3
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of numbers is '3'. Following are the two subsets: {1, 2, 3} & {9}.

Example 2: 
Input: {1, 2, 7, 1, 5}
Output: 0
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of number is '0'. Following are the two subsets: {1, 2, 5} & {7, 1}.

Example 3: 
Input: {1, 3, 100, 4}
Output: 92
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of numbers is '92'. Here are the two subsets: {1, 3, 4} & {100}.
*/

/*
n=[1,2,3,4]

lets say c = [1,3] is a subset 
then sum differentce (d) = abs |sum(c)-(sum(n)-sum(c))| = abs |2*sum(c) - sum(n)|

our target is to check what is the minum d there any subet, 

3 approuches
1.Brute force - T(n)=O(2^n), S(n)=O(n)
2.DP TOP/DOWN - T(n)=O(n*sum(n)), S(n)=O(n*sum(n))
3.DP Bottom UP - T(n)=O(n*sum(n)), S(n)=O(sum(n))



*/

// bottom-up DP

const getDiff = (t) => (s) => Math.abs(2*s - t);
const canPartition = function (nums){
	const sum = nums.reduce((a,b)=>a+b);
	const diff = getDiff(sum);
	let dp = new Set([0]);
	let min = sum;
	for(let i=nums.length-1; i>=0; i--){
		const dp2 = new Set();
		for(e of dp){
			const d = diff(e+nums[i]);
			if (d<min) min=d;
			dp2.add(e+nums[i]);
			dp2.add(e);
		}

		dp=dp2;
	}
	return min;
}


console.log(`expected : 3 VS actual : ${canPartition([1, 2, 3, 9])}`);
console.log(`expected : 0 VS actual : ${canPartition([1, 2, 7, 1, 5])}`);
console.log(`expected : 92 VS actual : ${canPartition([1, 3, 100, 4])}`);