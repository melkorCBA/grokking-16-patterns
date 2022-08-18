/*
An array arr a mountain if the following properties hold:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
    arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Given a mountain array arr, return the index i such that 
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

You must solve it in O(log(arr.length)) time complexity.

 

Example 1:

Input: arr = [0,1,0]
Output: 1

Example 2:

Input: arr = [0,2,1,0]
Output: 1

Example 3:

Input: arr = [0,10,5,2]
Output: 1

 

Constraints:

    3 <= arr.length <= 105
    0 <= arr[i] <= 106
    arr is guaranteed to be a mountain array.



*/

/**
 * @param {number[]} arr
 * @return {number}
 */

/*
   /\
  /  \
 /    \
/      \
left   right


if we canclaue the middle

if(nums[m-1]<nums[m]<nums[m+1]) that means we are climbing up
if(nums[m-1]>nums[m]>nums[m+1]) than means we are climbing down
if(nums[m-1]<nums[m]>nums[i+1]) then we are at the top

edge cases
since 0 < i < arr.length - 1; u can't be the last element,
and arr[i] > arr[i + 1] 
so defently the last element will be less than the previos last

other words the mountain will have a down-ward path. not just climbing up and end in the top

so we have to worry abount m+1 being undefinded
since arr[0] < arr[1] ; can not start from the top; no need to worry abount m-1 being undefined

complexcity
we are reducinf our search space by hald every step
T(n) = O(log n)
S(n) = O(1)

*/

/*
test cases 1: [0,1,0]
m=1
max=1
=> 1



test cases 2: [0,2,1,0]
m=1
max=2
=>1




test cases 3: [0,10,5,2]
m=1
max=1
=>1

test cases 3: [0,5,10,2]
m=1
max=10

m=2
max=10
=>2

*/

var peakIndexInMountainArray = function(arr) {
    let left=0, right=arr.length-1;
    while(true){
        const m = Math.floor((left+right)/2);
        const max = Math.max(arr[m], arr[m-1] ?? Number.MIN_VALUE, arr[m+1] ?? Number.MIN_VALUE);
        if(max === arr[m]) return m;
        if(max === arr[m+1]) left=m+1;
        else right = m-1;
    }
};