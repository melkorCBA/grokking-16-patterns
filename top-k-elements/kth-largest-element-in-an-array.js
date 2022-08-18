/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

You must solve it in O(n) time complexity.

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

 

Constraints:

    1 <= k <= nums.length <= 105
    -104 <= nums[i] <= 104




/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*
soultion 1
sort the array the then return n-k th value = T(n) = O(nlogn), S(n)=O(1)

soultion 2
use a min heap (size k) and in the end return the top elements
complexcity
T(n)=O(klogk - (n-k)logk + logk) = O((n+1)log k)~O(nlogk), T(s)=O(k)

souton 3
Quick select

[3,2,1,5,6,4]

pick a pivot = 4
partion by pivot = [3,2,1,5,6,4]
swap pivot with left = [3,2,1,4,6,5]
check if n-left === k
    the element at n-left will be the kth largest value
    because there are (n-left)-1 = k-1 elements larger than the pivot
if not if left-k > k the k the largest will be in the left partion
other wise it should be in the right

then we can redo this for that partion until we find the kth largest

so each ittration we wil be dealing with
n, n/2, n/4, ... size sub arrays (in avarage case)

but for worst case this could be = n, n-1, n-2, ....

so the 
average case time complexcity is = T(n) = O(n + n/2 + n/4 + n/8 + ...) = O(n + i=0Σ∞ n/2^i) = (n + n =0Σ∞ 1/2^i) = O(n+n) ~ O(n)
worst case = T(n) = O(n^2)

if we use ittrative soultion S(n) = O(1)



*/


/*
test case : [3,2,1,4,5,6] k=2
left=4
right=3
pivot=5
l=2
=>5

*/

var findKthLargest1 = function(nums, k) {
    
    let left=-1, right = pivot = nums.length-1;
    let start = left;
    while(true){
        start = left;
        while(true){
            while(nums[++left]<nums[pivot] && left<=right);
            while(nums[--right]>=nums[pivot] && left<=right);
           
            if( left > right) break;
             // swap left and right
            
            const temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
       
        // swap with pivot
        const temp = nums[left];
        nums[left] = nums[pivot];
        nums[pivot] = temp;
        
        const l = nums.length - left;
        
        if(l === k) return nums[left];
        if(l < k) {
            right=pivot=left-1;
            left=start;
            
        }
        if(l>k){
            right=pivot;
            start=left;
        }
    }
    
    
};


var findKthLargest = function(nums, k) {
    let left=0, right=nums.length-1;
    while(true){
        let pivot=nums[right];
        let p = left;
        for(let i=left; i<right; i++){
            if(nums[i]<=pivot){
               
                // swap
                [nums[i], nums[p]] = [nums[p], nums[i]]
                p++;
            }
        }
        // swap the pivot
        [nums[p],nums[right]]=[nums[right], nums[p]];
        
        // current k value
        const l = nums.length - p;
        
        if(l===k) return nums[p];
        if(l>k){
            left=p+1;
        }
        else{
            right=p-1
        }
    }
    
    
}













