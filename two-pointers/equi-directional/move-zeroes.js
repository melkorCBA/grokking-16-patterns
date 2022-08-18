/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:

Input: nums = [0]
Output: [0]


-231 <= nums[i] <= 231 - 1


two pointers,
left = keep track of the postion next non-zero elment will be - slow pointer
right=normal pointer - fast pointer

left pointer moves once a non-zero value is found and swaped
swap happens when only non-zero value is found


      [1,3,12,0,0]
left          ^
right           ^

complexcity: T - O(n), S-T(n)

*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */


/*
test cases: 
      [1,3,12,0,0]
left:         ^
right:          ^

*/ 
var moveZeroes = function(nums) {
    let left=0;
    for(let right=0; right<nums.length; right++){
    	if(nums[right]!==0){
    		const temp = nums[left];
    		nums[left] = nums[right];
    		nums[right] = temp;
    		left++;
    	}
    }
};