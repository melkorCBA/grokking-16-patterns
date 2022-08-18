/*
Given a non-empty array nums containing only positive integers, 
find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

 

Constraints:

    1 <= nums.length <= 200
    1 <= nums[i] <= 100


"""

"""
brute force soultion
----------------------
[_ _ _ _ ]

first the given array can be partioned for two, with equal sums,
partion sum = total sum/2

so, we can simplify the problem as finding subset where sum is equal to total sum/2

now for each element, that element can either,
1.in the subset
2. not in the subset

eg: [1,5,11,5]

total = 22,
target = 11

i=0 .. 4, t=11..0


               /                              \
           i=0,t=11                         i=0,t=10
      /                \                /            \
   i=1,t=11          i=1,t=6         i=1,t=10      i=1,t=5
   /      \          /      \        /       \     /      \
i=3,t=11 i=3,t=0


f(nums,t,i)
    if t<0 return false
    if t=0 return true
    if i=nums.length-1 return false
    return f(nums,t,i+1) || f(nums,t+nums[i],i+1)

Complexcity:
 T(n) = O(2^n), S(n)=O(n)


 Top-Down DP
 -------------
 just maintain a cach
 complexcities
 T(n)=O(n*sum(n)/2)
 S(n)=O(n*sum(n)/2 + n)

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition1 = function(nums) {
    const sum = nums.reduce((a,b)=>a+b);
    if(sum%2>0) return false;
    const target = Math.floor(sum/2);
    
    const dp = [...Array(nums.length+1)].map(e=>[...Array(target+1)].map(e=>null));
    
    const rec = function(i,t){
        if(t<0) return 0;
        if(i>=nums.length) return 0;
        if(t===0) return 1;
        
        const ex = i+1 >= nums.length ? 0 : dp[i+1][t] ?? rec(i+1,t);
        const inc = i+1>= nums.length || t - nums[i] < 0 ? 0 : dp[i+1][t-nums[i]] ?? rec(i+1, t-nums[i]);
        dp[i][t] = ex || inc;
        return ex || inc
    }
    
    return rec(0,target) ? true : false;;
};


/*
DP-bottom up soultion

[1,5,11,5]
 ^
 i

 when our pointer at the element '1'
 let's assume we already know all the posible sums of other elements

 sum set for other elements = {0,5,11,5,16,10}
 if we see a total sum/2 = 11 in the sum set or 1 + any elements in the set is 11 we can say the
 array is parttionable for 2 equal sums

 so if we some how calculate all the posible sum set for all the items
 in their, if there is sum/2 element we can say 'equal Partition'

 the size of the set won't exced the sum of the array
 hence Space complecity, S(n)=O(sum(n))

 time, for each elements in the array
 we will be traversing a set, which the max size will be sum(n)
 T(n)=O(n*sum(n));

 overall complexcities
  T(n)=O(n*sum(n));
  S(n)=O(sum(n))

space complexcity is better than cachig (top down DP)- here space complexcity is redcue because we are using a set


steps 1: for each element in the array, 
add that element and that (element + each element in the set) to the set
step 2: in the end, check if sum(n)/2 exissts in the set

*/


var canPartition = function(nums) {
    const sum = nums.reduce((a,b)=>a+b);
    if (sum%2 >0) return false;
    const target = Math.floor(sum/2);
    let sums = new Set([0]);
    for(let i=nums.length-1; i>=0; i--){
       const s2 = new Set();
        sums.forEach(e=> {
            s2.add(e+nums[i])
            s2.add(e);
            // early exit
            if(s2.has(target)) return true;
        });
        sums=s2;
    }
    return sums.has(target);
};