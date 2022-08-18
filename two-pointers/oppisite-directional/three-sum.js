/**
 * @param {number[]} nums
 * @return {number[][]}
 */


/*
[-1,0,1,2,-1,-4]

-1 find two sum
0 find two some
1,
2,
-1 will the same result set like previos -1

to prevet that we can use hash map,

then,

for sum probelem we have to use another hash map

T-O(n+n^2)~~O(n^2), S-O(2n+n)

but if we  sort the array first hash maps are not needed

T-O(nlogn + n^2)~O(n^2), S-O(n)


[-1,0,1,2,-1,-4]

for -1, index=0
find two sum, skip index=0
if need to find two sum for -1 gain skip it

also,

[-4, -1, -1, 0, 1, 2]
 for -4 two sum in [-1, -1, 0, 1, 2]
 then for -1 two sum for [-1, 0, 1,2]
 then for 0 two sum for [1,2]
 because we have already condsider -4,-1, other in -4 two sum
 no need calculate gain in -1 two sum



*/


/*
[-4, -1, -1, 0, 1, 2]
             ^
                ^  ^

[[-1,-1,2], [-1, 0, 1]]

*/

var threeSum = function(nums) {
    // sort list - ASC
    const results = [];
    nums=nums.sort((el1, el2) =>  el1-el2);
    for(let i=0; i< nums.length-1; i++){
        
        // to prevent doplicate pairs
        if(i>0 && nums[i]===nums[i-1]){
            continue;
        }
        let left=i+1;
        let right=nums.length-1;

        while(left<right){
            const sum = nums[i] + nums[left] + nums[right];
            if(sum<0){
                left++;
                while(nums[left]===nums[left-1]){left++}
                continue;
            }
            if(sum>0){
                right--;
                continue;
            }

            results.push([nums[i], nums[left], nums[right]]);
            left++;

            // to prevent doplicate pairs
            while(left<right && nums[left]=== nums[left-1]){
                left++;
            }
        }
                
    }
    return results;
    
};
