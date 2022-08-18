/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*
[10,5,2,6]
 ^
 
 subarray [10,5] starting from 10, has 2 subarrays,
 size of the longest local sub array = number of sub arrays
 or
 each time we adding a element to a contiuos part the new subarrays are icremtn by new length of the contigus part
 
 sliding window
 time complexcity T-O(n), S-O(1)
*/

/*
[10,5,2,6], k = 100

        ^
    ^

product=60
count=8

*/


var numSubarrayProductLessThanK = function(nums, k) {

    if(k<2){
        return 0;
    }

    let numOfSubArrays= 0;
    let wStart=0;
    let product=1;

    for(let wEnd=0; wEnd< nums.length; wEnd++){
        product*=nums[wEnd];

        while(product>=k){
            product/=nums[wStart];
            wStart++;
        }

        numOfSubArrays+=wEnd-wStart+1;

    }


    return numOfSubArrays;
};