/*
Given a sorted array of distinct integers and a target value, return the index if the target is found. 
If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4

 

Constraints:

    1 <= nums.length <= 104
    -104 <= nums[i] <= 104
    nums contains distinct values sorted in ascending order.
    -104 <= target <= 104



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
have to implement the binary search
if elemnt is not in the list
when left > right
left index always gives the succsors index

T(n) = O(log n)
S(n) = O(1)

*/

/*
test case 1: [], target=any
returns =>0

test case 2 : [2,3,4,5] target =5
left=3 right=3
m=3 => 3

test case 3: [2,3,4,5] target =1
left=0, right=-1
m=0
return => 0

test case 4 : [2,3,4,5] target =7
left=4 right=3
m=3
return => 4

*/

var searchInsert = function(nums, target) {
    let left = 0, right = nums.length-1;
    // target is outside
    if(target > nums[right]) return right+1;
    if(target < nums[left]) return left;
    // target is inside
    while(left<=right){
        const middle = Math.floor((left+right)/2);
        if(nums[middle]===target) return middle;
        if(target>nums[middle]) left=middle+1;
        else right=middle-1;
    }
    return left;
};