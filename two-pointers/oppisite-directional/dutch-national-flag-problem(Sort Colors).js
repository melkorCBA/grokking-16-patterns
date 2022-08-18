/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/*
[0,0,1,1,2,2]
     ^     ^

pivot
<=0 >0
<=1 >1

Complexcity- T-O(2n)~O(n), S-O(1)

worst case time
[2,2,2,2]
 ^     ^

*/

/*
 [0,0,1,1,2,2]
      ^   ^
 
 pivot=2

*/

var sortColors1 = function(nums) {
    let pivot=0;
    let left=-1;
    let right=nums.length;
    
    while(pivot<2){
        while(true){
            while(nums[++left] === pivot && left<right);
            while(nums[--right] !== pivot && left<right);
            if(left>=right){
                break;
            }
            nums[right]=nums[left];
            nums[left]=pivot;
        }
        left-=1;
        right=nums.length;
        pivot++;
    }
};

/*
doing this with n pases
need three pointer,
left=first non zero elment from the left (means all the elements left this poniter are zeros)
left=first non two elment from the right (means all the elements right this poniter are twos)
i=pointer that can skip 1's

so after waps array should be [0,1,2] format
edge case is [0,1,2,1,0,2]
here when we replace 2 in i with right,
the rplced value could be 0,1,2
so we need to keep the value of i as it is, so it can be resolved (swap with left) in the next pass

other way around we don't to keep the vlau of i as it is after swap with the left because,
the left value can't be 2,
because we would have swaped it already to right
if it is a 1 we gona skip it anyway in the next pass, 
if it is a zero no issue

so in summary
if i encounter 2 swap with the right,decrement right, dont't increment i
if i encounter 0 swap with left, increment left, increment i
if i encounter 1 increment i

*/

var sortColors = function(nums) {
    if(nums.length <2){
        return;
    }
    let i=0;
    let left=0;
    let right=nums.length-1;


    while(i<right){
        if(nums[i]===0){
            nums[i]=nums[left]
            nums[left]=0;
            left++;
        }

        if(nums[i]===2){
            nums[i]=nums[right];
            nums[right]=2;
            right--;
            i--;
        }

        i++;
    }
};

