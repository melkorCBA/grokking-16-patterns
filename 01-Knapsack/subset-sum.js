/*
Problem Statement 
Given a set of positive numbers, determine if a subset exists whose sum is equal to a given number ‘S’.

Example 1: 
Input: {1, 2, 3, 7}, S=6
Output: True
The given set has a subset whose sum is '6': {1, 2, 3}

Example 2: 
Input: {1, 2, 7, 1, 5}, S=10
Output: True
The given set has a subset whose sum is '10': {1, 2, 7}

Example 3: 
Input: {1, 3, 4, 8}, S=6
Output: False
The given set does not have any subset whose sum is equal to '6'.
*/

/*
same as the partition equal subset problem

3 approuches

1.brute force - T(n)=O(2^n), S(n)=O(n)
2. DP top down/caching - T(n,s)=O(n*s), S(n,s)=O(n*s+n), s=target  sum
3. DP bottom up - T(n,S)=O(n*S), S(n,S)=O(S);, S=total sum of all the numbers

*/

const canPartition = function (nums, sum){
	let dp=new Set([0]);
	for(let i=nums.length-1; i>=0; i--){
		const s=new Set();
		for(e of dp){
			if (e<= sum && e+nums[i]<=sum){
				s.add(e+nums[i]);
				s.add(e);
			}
			// early exit
			if(dp.has(sum)) return true;
		}
		dp = s;
	}

	return dp.has(sum);
}

console.log(`expected : true VS actual : ${canPartition([1, 2, 3, 7], 6)}`);
console.log(`expected : true VS actual : ${canPartition([1, 2, 7, 1, 5], 10)}`);
console.log(`expected : false VS actual : ${canPartition([1, 3, 4, 8], 6)}`);