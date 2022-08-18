/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Input: nums = [3,2,4], target = 6
Output: [1,2]

Input: nums = [3,3], target = 6
Output: [0,1]

*/

// can't do using two pointers ->  one pointer and hash set is enough
// complexcities will be = T - O(n), S - O(n+n-1)~O(n)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 
 [3,2,4], target = 6
      ^
 
 hashmap = {
 3:0,
 2:1
 }
 
 the brute force soultion would be T-(n^2) and S-O(n)
 
 so need is acctually to archive quick lookup
 while passing through array one time,
 checking if we have already find a matching element
 
 solution:  user hash map with O(1) lookup and 1 pass loop
 
 new Complexcities
 T-O(n), S-(2n)
 
 eg: [el1, el2, matEl3, el4, el5, el6, matEl7, el8, el9]
 here search space will be from el1 to matEl7
 
 }
 
 */
var twoSum = function(nums, target) {
/*
looping through array
for Each element,
check diff = target - currentElement is alreday in the hash map
    if exisits ->  return current index and hash index
    else -> insert element to the hash map
hasmap structure: {
element: index
}

complexcity - O(n)
*/

const hashMap = {};
for(let i=0; i<nums.length; i++){
    const diff = target - nums[i];
    // if(diff < 0){ continue;}
    const matchingIndex = hashMap[diff];
    if(matchingIndex=== 0 || matchingIndex){
        return [i, matchingIndex ];
    }
    hashMap[nums[i]] = i;
}
    
 
};

