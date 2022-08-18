/*
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Example 2:

Input: nums = [0]
Output: [[],[0]]

 

Constraints:

    1 <= nums.length <= 10
    -10 <= nums[i] <= 10


/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/*
can solve this using back-trackking
but need to know the number of duplicates before hand for each interger in the array

or we can sort the array making the duplicate values contgues

itterative soultion would be ok for this case
we scan the element one by one untill no duplicates
then we will go through current results
adding the element to each result set
eg: [[]]
current elemt is 1 and no duplictes
[[], [1]]
then we found 2 with 3 dupplictes
[[], [1],]
+one 2
[[2], [1,2]]
+two 2s
[[2,2], [1,2,2]]
+three 2s
[[2,2,2], [1,2,2,2]]

*/

// [1,2,2]
        

// complexcity fo this will be alos T(n) = O(n2^n), S(n) = O(2^n)
// but if there is duplicates T(n)< O(n2^n)
var subsetsWithDup1 = function(nums) {
    // sort the nums
    nums.sort((a,b) => a-b);
   
    
    
    var bc = function (nums) {
        if(nums.length <= 0) return [[]]; // base case for same element list : [2,2,2,2,2]
        if(nums.length ===1) return [[], [nums[0]]];
        const n = [[nums.pop()]]
        // will create the all posibilies of having a duplicate item
        // eg: if there is 2 s's n will be n= [[2], [2,2]]
        while(nums[nums.length-1] === n[0][0]){
            const m = nums.pop();
            const len = n.length;
            n.push([...n[n.length-1], m])
        }
        const subsets = bc(nums);
        const len = subsets.length;
        for(let i=0; i<len; i++){
           for(let j=0; j<n.length; j++){  // if j is size n (have the same element) then subsets will contain only 1 
               const subset = [...subsets[i], ...n[j]];
               subsets.push(subset);
           }
        }
            
        return subsets;
        
    }
    return bc(nums);
    
    
};

/*
Second way : 

for each element we have two choises
1.include a elemnts at least once
2. not include that elemnt in the subset at all
eg: [1,2,2,3]
                                             []
                          [1]                                        []
                [1,2]             [1]                        [2]             []
       [1,2,2]       [1,2]     [1,3] [1]               [2,2]      [2]      [3][]
  [1,2,2,3][1,2,2][1,2,3][1,2]                    [2,2,3][2,2] [2,3][2]

complexcity
T(n) = O(n * 2^n); n is for copying and 2^n is total of recusrin tree
S(n) = O(2^n)

*/

var subsetsWithDup = function(nums) {
    const results = [];
    // sort
    nums.sort((a,b) => a-b);
    const bc = function(i, subset) {
        if(i >= nums.length){
            results.push([...subset]); // this wil be O(n) for each recursive call
            return
        }
        
        // subsets that include a elemnts at least once
        subset.push(nums[i]);
        bc(i+1, subset);
        subset.pop();
        
        // subsets that not include the elemnt
        while(i+1 < nums.length && nums[i]===nums[i+1]){
            i++;
        }
        bc(i+1, subset);
        
    }
    bc(0, [])
    return results;
}