"""
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

"""
import os

# System call
os.system("")
counter =0;
class Solution:
    def canPartition1(self, nums: list[int]) -> bool:
        sm = sum(nums)/2;
        # if sum is not divisble by 2 can't be partition
        if sm%2 >0 : return False
        target = sm/2;
        
        def canPartitionBruteF(nums:list[int],t:int,i:int): 
            if t<0: return False;
            if t==0: return True;
            if i == len(nums): return False;
            return canPartitionBruteF(nums,t,i+1) or canPartitionBruteF(nums,t-nums[i], i+1);
        return canPartitionBruteF(nums,target,0);
    def canPartition(self, nums: list[int]) -> bool:
        sm = sum(nums);
        # if sum is not divisble by 2 can't be partition
        if sm%2 >0 : return False
        target = int(sm//2);
        mx = target*len(nums);
        mid = mx//2;
        # initlize dp memory
        dp = [[None]*(target+1)]*(len(nums)+1);
        query = lambda i,t: dp[i][t] if i>=0 and i<len(dp) and t>=0 and t<len(dp[0]) else None;
        def canPartitionBruteF(nums:list[int],t:int,i:int): 
            global counter;
            counter+=1;
            print('\033[96m'+str(counter)+'\033[0m') if counter < mid else print('\033[92m' + str(counter)+'\033[0m') if counter>mid and counter < mx else print('\033[91m'+str(counter)+'\033[0m');
            os.system('cls' if os.name=='nt' else 'clear')
            if t<0: return False;
            if t==0: return True;
            if i == len(nums): return False;
            exclude = query(t,i+1) if query(t,i+1) != None else canPartitionBruteF(nums,t,i+1);
            include = query(t-nums[i],i+1) if query(t-nums[i],i+1) != None else canPartitionBruteF(nums,t-nums[i], i+1);
            dp[i][t] = exclude or include;
            return  exclude or include ;
        return canPartitionBruteF(nums,target,0);


"""
top-down dynamic with memoizations
 dp demantions
 n*target
 Complexcity:
 T(n,s) = O(n*s), S(n,s)=O(n*s + n), where n, nummber of items, s=total sum/2

"""

sol = Solution();
#print(sol.canPartition([1,5,11,5]))
print(sol.canPartition([100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,99,97]))
            
            
            