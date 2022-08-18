/*
Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. 
The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b

 

Example 1:

Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Example 2:

Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]

 

Constraints:

    1 <= k <= arr.length
    1 <= arr.length <= 104
    arr is sorted in ascending order.
    -104 <= arr[i], x <= 104



*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */


/*
way to do this is performe binary seacrh for x
find the matching/min(left, right) index m
then traverse from m-k maximum 2k times 

T(n,k) = O(log n + k)
S(k) = O(k)


*/


/*
test case 1 : arr = [1,2,3,4,5], k = 4, x = 3
m = 2
i=4
q= [1,2,3,4]

test case 2 :  arr = [1,2,3,4,5], k = 4, x = -1
m= 0
q= [1,2,3,4]

test case 3: arr = [1,1,1,10,10,10] k=1, x=9 
m=1
q=[1]
*/

const findClosestElement = (arr, key) => {
  
    if(key < arr[0]) return 0;
    if(key > arr [arr.length-1]) return arr.length-1;
    let left = 0;
    let right = arr.length -1;
    while(left<=right){
        const m = Math.floor((left+right)/2);
        if(key === arr[m]) return m;
        if(key > arr[m]) left=m+1;
        else right=m-1    
    }
    // get the index of the closest value
    if(arr[left] !== undefined && !arr[right] !== undefined) {
        // here left >right
        // left will be onthe right
        if(Math.abs(arr[right]-key)>Math.abs(arr[left]-key)) return left
        else return right;
    }
    if(arr[right]!== undefined) return right;
    return left;
    
}


var findClosestElements1 = function(arr, k, x) {
    const m = findClosestElement(arr,x);
    const q = [];
    let i=m-k;
    while(arr[i] === undefined){i++}
    while(q.length <k){
        q.push(arr[i])
        i++;
    }
    while(Math.abs(arr[i] - x) < Math.abs(q[0] - x)){
        q.shift();
        q.push(arr[i]);
        i++;
    }
    
    return q;
};

// another way of slowing this is using two pointer soultion
// because the next closet values will come form two closests nebghours

var findClosestElements = function(arr, k, x) {
    const m = findClosestElement(arr,x);
    let left = m-1, right = m+1
    while((right-left)-1<k && (left>-1 || right <arr.length)){
        if(left<0){
            right++;
            continue;
        }
        if(right > arr.length-1){
            left--
            continue;
        }
        if(arr[right]-x < x-arr[left]) right++;
        else left--;
    }
    
    // now the result set in between the left and right pointers
    return arr.slice(left+1, right);
};