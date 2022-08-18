/*

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:

Input: nums = [0,0,0], target = 1
Output: 0

Constraints:

    3 <= nums.length <= 1000
    -1000 <= nums[i] <= 1000
    -104 <= target <= 104


*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
Input: nums = [-1,2,1,-4], target = 1

[-1, 2,1,-4] sort - T-O(nlogn)
[-4, -1, 1, 2]
 ^
     ^      ^
 
 diff = abs(target - nums[0]+nums[1], nums[3]) need to minimize, memorize the sum
 
 if(target < sum) left++
 if(target> sum) right--
 if(target === sum) return target
 
 T-O(n^2)



complexcities: T- O(n^2), S-O(1)

*/


/*
test cases:
Input: nums = [-1,2,1,-4], target = 1

  [-4,-1,1,2]
i      ^
         ^ ^
  
 sum=-2
minDif=1
closestSum=2
*/

var threeSumClosest = function(nums, target) {
    nums=nums.sort((el1, el2) => el1-el2);
    
    let minDiff = 20000;
    let closestSum;
    
    for(let i=0; i< nums.length-2; i++){
        let left=i+1;
        let right=nums.length-1;
        while(left<right){
            const sum=nums[i]+nums[left]+nums[right];
            const diff = Math.abs(target - sum);
            if(diff === 0){
                return target;
            }
            if(diff<minDiff){
                minDiff=diff;
                closestSum=sum;
            }
            
            // try to get more close
            if(sum<target){
                left++;
                while(left<right && nums[left]=== nums[left-1]){
                    left++;
                }
            }
            
            if(sum> target){
                right--;
                while(left<right && nums[right]=== nums[right+1]){
                    right--;
                }
            }
            
            
        }
    }
    
    
    
    return closestSum;
};