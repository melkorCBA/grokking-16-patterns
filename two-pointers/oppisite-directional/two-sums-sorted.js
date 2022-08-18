/*

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

*/


/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 
 numbers = [2,7,11,15], target = 9
 
 [2,7,11,15]
  ^ ^
  
  2+15 = 17 > 9
  2+11 = 13 > 9
  2+7 = 9 return [1,2]
  
  numbers = [2,3,4], target = 6
  
  [2,3,4]
   ^   ^
   
   2+4=6 return [1,3]
   
   Complexcity T - O(n), S - O(n)
   
    numbers = [2,3,4], target = 6
    [2,3,5]
     ^ ^
     2+5=7 > 6
     2+3 = 5 < 8
     
     
  
 
 */
var twoSum = function(numbers, target) {
    let left = 0; // 0
    let right = numbers.length-1;
    
    while(left<right){
        const sum = numbers[left] + numbers[right]; 
        
        if(sum === target){
            return [left+1, right+1];
        }
        
        if(sum > target){
            right--;
            continue;
        }
        
        if(sum < target){
            left++;
            continue;
        }
    }
    
    return [-1, -1];
};