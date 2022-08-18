/*
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

 

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

 

Constraints:

    n == nums.length
    1 <= n <= 104
    0 <= nums[i] <= n
    All the numbers of nums are unique.

 

Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?


*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*
if n=3
indexs are = 0,1,2

we know,
missing number = sum of [0,1,2,3] - [actual number]
               = [sum of indexs] + n -  [actual number]
               = n - sum[vaue(i) - index(i)]                  -addtitin and subtraction is associative



for each index
sum of  value - index
n-sum=missing number

Complexcity - T-O(n), S-O(1)


There is another way to do this using bitwise XOR

if we have SET A an SET B havving the same elements
SET A XOR SET B = 0

why?
[0,1,3] ^ [0,3,1]
0^0^1^1^3^3 =0                                        0010 ^ 0010 = 0000

and SET A has extra element
SET A XOR SET B = extra element
 hence,
 n^[indexes]^[values]=missing number



*/


/*
Test case 1:
[3,0,1]
 ^
 sum=1
 missing=2
*/

// 1st way

var missingNumber1 = function(nums) {
    let sum=0;
    for(let i=0; i<nums.length; i++){
        sum+=nums[i]-i;
    }
    
    return nums.length-sum;
};

// 2nd way

var missingNumber = function(nums) {
    let missingNumber=nums.length;
    for(let i=0; i<nums.length; i++){
       missingNumber=missingNumber^i^nums[i];
    }
    
    return missingNumber;
};



