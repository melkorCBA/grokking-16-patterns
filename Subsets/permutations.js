/*
Given an array nums of distinct integers, return all the possible permutations. 
You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:

Input: nums = [1]
Output: [[1]]

 

Constraints:

    1 <= nums.length <= 6
    -10 <= nums[i] <= 10
    All the integers of nums are unique.



*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */


/*

total permutations = 3*2*1 = 6
each path is a permutation

eg :return to level 2
[[2]] and [[3]]
append the removed elemnt 
[[2,3]]  and [[3,2]]
concat
[[2,3], [3,2]]
return to higher level


    [1,     2,    3]
    /       |     \
  [2,3]   [1,3]  [1,2]
  /  \    /  \    / \
[2] [3] [1] [3] [1] [2]

divide and concour to sub problems
need to creat a sub probelm excluding 1 elemnt fomr the array 

complexcity -



*/

/*
test case 1:
p([1,2,3], [])
    p([3,2], []) n=1
    p([1,3],) n=2
    p([1,2]) n=3
    
p([3,2], [])
    p([2], [[2,3]]) n=3
    p([3], [[2,3],[3,2]]) n=2
    
[[2]]<=p([2], [])

*/


var permute = function(nums) {
    if(nums.length === 0) return [];
    if(nums.length ===1){
        return [[...nums]]; // since there is only one elements it will be T-O(1) for each n (overall T-O(n))
    }
    
    let results = [];
    const len = nums.length;
    for(let i=0; i<len; i++){
        // eg: [1,2,3,4]
        const temp = nums[i]; 
        nums[i] = nums[len-1]; 
        nums[len-1] = temp; // [4,2,3,1]
        const n = nums.pop(); // [4,2,3]
        const prems = permute(nums);
        prems.forEach(perm => perm.push(n));
        
        // concat is not mutation opertation
        // so only results.concat(prems) won't work as results contents won't be changes
        // you can use the spread opertor  but it'll be too expensive (... spread in T-O(n)) 
        // results.push(...perms)
        results = results.concat(prems); // this is signifivatly faster than push with spread
        nums.push(nums[i]) // [4,2,3,4]
        nums[i] = temp; // [1,2,3,4]
        
    }
    
    return results;
    
 
};