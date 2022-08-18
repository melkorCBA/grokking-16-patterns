/*
Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. 
Find the two elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

 

Example 1:

Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.

Example 2:

Input: nums = [-1,0]
Output: [-1,0]

Example 3:

Input: nums = [0,1]
Output: [1,0]

 

Constraints:

    2 <= nums.length <= 3 * 104
    -231 <= nums[i] <= 231 - 1
    Each integer in nums will appear twice, only two integers will appear once.


*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */


/*
[1,2,1,3,2,5]

1 => 001
2 => 010
1 => 001
3 => 011
2 => 010
5 => 101

1^2^1^3^2^5 = 6 => 110

so we can say if two numbers are a and b
2 bits are different and 1 bit is the same

if we pick any on of this set bits
that postion one of a or b 's bit will be 1 and another will be 0

so if we parttion all numbers based on the picked postion's bit
we get two groups with
1 and 0

so a and b will be sperated

let's take let most set bit

1 group => 2^3^2=3
0 group => 1^1^5=5

if we xor two groups we can get the two numbers

check the picked postion bit vlaue

picking the left most set bit

from a^b
left shift untill a^b&1=1
record how many shfting happed

let's say did i shifts

loop throug every number 
shift i posting from left

xor with relevent group base one
the num<<i &1 = 1

complexcity
T(n) = O(2n) = O(n)
S(n) = O(1)

*/

var singleNumber = function(nums) {
    let xorOfsingles=0;
    nums.forEach((num)=> xorOfsingles^=num);
    // find the left most set bit postion
    let i = 0;
    while((xorOfsingles>>i & 1 )!== 1){i++}
    const groups=[0,0];
    
    // partition
    nums.forEach(num => {
        const isSetBit = (num >>i & 1)=== 1;
        if(isSetBit) groups[1]^=num;
        else groups[0]^=num;
    })
    
    return groups;
    
};