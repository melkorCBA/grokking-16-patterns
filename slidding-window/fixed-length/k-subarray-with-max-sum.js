/*
Find the max sum subarray of a fixed size K

example input: [4,2,1,7,8,1,2,8,1,0], K=3
output: 16

loop through each elment
get length k window and calculate the sum
if current sum > maxSum update maxSum

after loop end, return maxSum


*/

const maxSum = (arr, k) => {
	let maxSum = 0;

	// loop through arr
	for(let i=0; i<arr.length; i++){
		let currentRunningSum+=arr[i];
		// when reached window length 
		if(i>= k-1){
			maxSum = Math.max(maxSum, currentRunningSum);
			// removing the beginging item of the window
			currentRunningSum-= arr[i-(k-1)];
		}
			
	}

	return maxSum;
}

/*
test case : [4,2,1,7,8,1,2,8,1,0], K=3
			                   ^
	currentRunningSum=9
	maxSum = 16
	
*/

/*
time complexcities
T - O(n)
S - O(n)

n= number of elements in the array
*/