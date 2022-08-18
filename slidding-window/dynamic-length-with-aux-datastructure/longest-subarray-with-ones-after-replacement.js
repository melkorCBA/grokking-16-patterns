/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 
 
 [1,1,1,0,0,0,1,1,1,1,0], k=2
                      ^
            ^
 

 0's count = 2
 bits to flip = 0's count (if 0's count <= k) = 0
 maxLength = 6
 
 complexcicties,
 T - O(n), S - O(n)
 
 
 test cases:
  [1,1,1,0,0,0,1,1,1,1,0], k=2
                       ^
             ^
  
  bitsToFlip = 2
  maxLength = 6
 
 */
var longestOnes = function(nums, k) {
    
    let wEnd = 0;
    let wStart = 0;
    
    let bitsToFlip = 0;
    let maxLength = 0;
    
    for(wEnd; wEnd<nums.length; wEnd++){
        if(nums[wEnd] === 0){
            bitsToFlip++;
        }
        
        while(bitsToFlip > k){
            if(nums[wStart] === 0){
                bitsToFlip--;
            }
            wStart++;
        }
        
        if(bitsToFlip <= k){
            maxLength = Math.max(maxLength, (wEnd-wStart +1));
        }
    }
    
    return maxLength;
    
};


