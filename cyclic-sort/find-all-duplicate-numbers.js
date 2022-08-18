/*
Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Example 2:

Input: nums = [1,1,2]
Output: [1]

Example 3:

Input: nums = [1]
Output: []

 

Constraints:

    n == nums.length
    1 <= n <= 105
    1 <= nums[i] <= n
    Each element in nums appears once or twice.




*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/*
set minus for alreday exsising valuse
index= abs(nums[i])-1
if nums[index]<0 abs(nums[i]) is a duplicate


complexcity - T-O(n), S-O(1)
*/


/*

test case 1
[0, 1, 2, 3,4,5, 6, 7]
[-4,-3,-2,-7,8,2,-3,-1]
                    ^
 
[2,3]

test case 2: [1,1,2]
[-1,1,2]
      ^

*/

var findDuplicates = function(nums) {
    const duplicates = [];
    for(let i=0; i<nums.length; i++){
        let index = Math.abs(nums[i])
        if(nums[index-1]<0){
            duplicates.push(index);
            continue;
        }
        nums[index-1]=-1*Math.abs(nums[index-1]);
    }
    

    
    return duplicates;
};