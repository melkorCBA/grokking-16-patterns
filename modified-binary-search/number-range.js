/*
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position 
of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:

Input: nums = [], target = 0
Output: [-1,-1]

 

Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
    nums is a non-decreasing array.
    -109 <= target <= 109



*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/*
if the target is outside the nums => [-1,-1]

do a normal binary search untill you get a match number

once you find the a middle matchig target

      [5,7,7,8,8,10]
left   ^   
right            ^
middle     ^

left         ^   
right            ^
middle         ^

left         ^   
start        ^
right            ^
end              ^

two seperate paths for two sights untill left > right

Complexcities
T(n) = O(log n) bit lartger than O(log n) becuase of extra search for range
S(n) = O(1)

*/


/*
test case 1:  [5,7,7,8,8,10], target = 8

[5,7,7,8,8,10]
       ^    ^
         ^
left=3
right=5
start=4
end=4

[8,10]
   ^ 
 ^
   ^
 start = 4
 
 
          ^
left=3
right=4
[8,8]


*/

var searchRange = function(nums, target) {
    // empty
    if(nums.length < 1) return [-1,-1]
    // outside
    if(target > nums[nums.length-1] || target < nums[0]) return [-1,-1];
    
    // first target
    let left=0, right=nums.length-1;
    let start = -1, end = -1;
    while(left<=right){
        const m = Math.floor((left + right)/2);
        if(target === nums[m]) {
            start = m, end = m;
            break;
        };
        if(target > nums[m]) left=m+1;
        else right=m-1;
    }
    
    // find the range
    if(left<=right){
        let leftE = end, rightE = right;
        // find the end
        while(leftE<=rightE){
            const m = Math.floor((leftE + rightE)/2);
            if(nums[m]=== target) leftE = m+1;
            else rightE= m-1;
        }
        end = rightE;
        let leftS = left, rightS = start;
        // find the start
        while(leftS <= rightS){
            const m = Math.floor((leftS + rightS)/2);
            if(nums[m]=== target) rightS = m-1;
            else leftS= m+1;
        }
        start = leftS;
    }
    
    return [start, end]
    
    
};