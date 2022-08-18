/*
Problem:

A given array that is having 2 sorted partion, sort them without using extra memory.

eg : [1,5,6,9,2,3,4,10], s=2 's' is the start index of second partition

need to pointers
i form 0 - s-1
if nums[i]<=nums[s] continue
else 
	swap nums[i] and nums[s]
	resort 2nd partition - insertion sort will run T(n)=O(n) for alsmost sorted
	repeat the process

complexcity
n2=n-s
n1=n-n2

T(n1,n2) = O(n1*n2)
S(n1,n2) = O(1)

*/

const mergeTwoSorted = (nums, s) => {

	const insertionSort = (start, end) => {
		for(let j=start; j<=end-1; j++){
			if(nums[j] <= nums[j+1]) break;
			[nums[j], nums[j+1]] = [nums[j+1], nums[j]]

		}
	}

	for(let i=0; i<s; i++){
		if(nums[i]<= nums[s]) continue;
		// swap
		[nums[i], nums[s]]=[nums[s], nums[i]]
		// sort
		insertionSort(s,nums.length-1);
	}
	return nums;


}


console.log(mergeTwoSorted([1,5,6,9,2,3,4,10],4))
console.log(mergeTwoSorted([2,3,4,10,1,5,6,9],4))

