/**
 * @param {number[]} nums
 * @return {number[]}
 */


/*

T-O(n), S-O(n) way - maintain a hash set

S-O(1), T-O(2n) way
 cycle sort it skiiping the repeted cycles
 then non index mathcing elements are the missing elements
 
 [4,3,2,7,8,2,3,1]
  ^

*/


/*
test case 1: 
[0,1,2,3,4,5,6,7]
[1,2,3,4,3,2,7,8]
               ^
pre=8


// there is another way but still T-O(2n) but without swaps-----------------
go through the array for elemnts

nums[nums[i]] = -abs[nums[nums[i]]]

then the all existing index vlaue will be negetive
all the postinve vlaue index +1 are the mising vlaues

*/

var findDisappearedNumbers1 = function(nums) {
    let i=0;
    let previousValue;
    while(i<nums.length){
        if(i+1 === nums[i] || previousValue==nums[i]){
            i++;
            continue;
        }
        // swap
        previousValue = nums[i];
        nums[i] =  nums[nums[i]-1];
        nums[previousValue-1]= previousValue;
    }
    
    const missingElements = [];
    for(let j=0; j<nums.length; j++){
        if(j+1!==nums[j]){
            missingElements.push(j+1);
        }
    }
    
    return missingElements;
    
};


/*
test case : 
[0,1,2,3,4,5,6,7]
[4,3,2,7,8,2,3,1]
 ^

*/

var findDisappearedNumbers = function(nums) {
    
   for(let i=0; i< nums.length; i++){
       let index=Math.abs(nums[i]);
       nums[index-1]=-1*Math.abs(nums[index-1]);
   }
   const missing = [];
    for(let i=0; i < nums.length; i++){
        if(nums[i]>0){
            missing.push(i+1);
        }
    }
    
    return missing;
}