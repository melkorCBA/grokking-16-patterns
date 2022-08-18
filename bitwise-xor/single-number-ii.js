/*
Given an integer array nums where every element appears three times except for one, which appears exactly once. 
Find the single element and return it.

You must implement a solution with a linear runtime complexity and use only constant extra space.

 

Example 1:

Input: nums = [2,2,3,2]
Output: 3

Example 2:

Input: nums = [0,1,0,1,0,1,99]
Output: 99

 

Constraints:

    1 <= nums.length <= 3 * 104
    -231 <= nums[i] <= 231 - 1
    Each element in nums appears exactly three times except for one element which appears once.



*/


/**
 * @param {number[]} nums
 * @return {number}
 */


/*

k=3

 2 => 000000000000000000000000000010
 2 => 000000000000000000000000000010
 2 => 000000000000000000000000000101
 2 => 000000000000000000000000000010

total 000000000000000000000000000131
 bit
count

c%3   000000000000000000000000000101 = 3


for each bit if we claclulate tottal bit count
and get the Rmainders of k
we get the one time occrance vlaue


how to get the bit value of ceratin postion

a^1 = 0 if last bit is zero, 1 if last bit is 1
then we can right shift by bit
a=a>>1

complexcity
create a array of zero bits - T(n) -O(32) = O(1), S(n) = O(32) = O(1),
liner to update bit count - T(n) = O(32*n) = O(n), S(n) = O(1)
loop through 32 bit and get the answer = T(n) = O(32) = O(1), S(n) = O(1)

so overall T(n) = O(n), S(n)=O(1)

** weh can consider bit shfting is O(1) for any numebr of shifts in mordern CPUs

*/

var singleNumber = function(nums) {
    const bits=[];
    for(let i=0; i<32; i++){
        bits.push(0);
    }
    
    for(let i=0; i<nums.length; i++){
        let n=nums[i];
        for(let j=0; j<32; j++){
            if(n === 0) break; // no poiting
            
            const bit = n&1;
            if(bit === 1){
               
                bits[31 -j]+=1;
            }
            n=n>>1;
        }
    }
   
    let results = 0;
    for(let i=0; i<32; i++){
        results = results<<1 | bits[i]%3; // 5 << 1 == 101 => 1010
    }
    return results;
 
};
        
