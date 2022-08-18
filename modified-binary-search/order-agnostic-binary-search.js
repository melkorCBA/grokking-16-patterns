/*
Problem Statement 
Given a sorted array of numbers, find if a given number ‘key’ is present in the array. 
Though we know that the array is sorted, we don’t know if it’s sorted in ascending or descending order. 
You should assume that the array can have duplicates.

Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.

Example 1:
Input: [4, 6, 10], key = 10
Output: 2


Example 2:
Input: [1, 2, 3, 4, 5, 6, 7], key = 5
Output: 4


Example 3:
Input: [10, 6, 4], key = 10
Output: 0


Example 4:
Input: [10, 6, 4], key = 4
Output: 2

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */


/*
this will done assuming the array os  Order-agnostic (sorted but don't know asec/desc)

can do with recusrrion shell function

before calling the function compare the first and last elemnt to find out asec/desc

need extra parmanter in recussion function = coff
coff=1 if asec
aaoff = -1 if desc

complexcity is T(n) - O(log n)
S(T) = (log n)

ittrative soultion is better for space
T(n) = O(logn)
S(n) = O(1)

*/

/*
test case 1:
[-1,0,3,5,9,12], target = 9

b(0,5,9, 1)
m=2 [3]
b(3,5,9,1)
m=4 return 4

test case 2:
Input: [10, 6, 4], key = 4
b(0,2,4,-1)
m=1
b(2,2,4,-1)
m=2
return 2
*/

var search1 = function(nums, target) {
    if(nums.length<2) return nums[0] === target ? 0 : -1 ;
    
    const coff = nums[nums.length-1] >= nums[0] ? 1 : -1;
    
    const bSearch = function (nums, left, right, target, coff) {
        if(left>right) return -1;
        const middle = Math.floor((left+right)/2);
        if(coff*target === coff*nums[middle]) return middle;
        if(coff*target > coff*nums[middle]) {
            return bSearch(nums, middle+1, right, target, coff);
            
        }
        return bSearch(nums, left, middle-1, target, coff);
    }
    return bSearch(nums, 0, nums.length-1, target, coff);
};


var search = function(nums, target) {
    if(nums.length<2) return nums[0] === target ? 0 : -1 ;
    
    const coff = nums[nums.length-1] >= nums[0] ? 1 : -1;
    
    let left=0, right = nums.length;
    while(true){
        if(left>right) return -1;
        const middle = Math.floor((left+right)/2);
        if(coff*nums[middle] === coff*target) return middle;
        if(coff*target > coff*nums[middle]){
            left=middle+1;
        }
        else{
            right=middle-1;
        }
    }
};
