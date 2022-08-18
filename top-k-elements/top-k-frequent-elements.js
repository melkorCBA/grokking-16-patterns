/*
Given an integer array nums and an integer k, return the k most frequent elements. 
You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:

Input: nums = [1], k = 1
Output: [1]

 

Constraints:

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.


*/


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/*

can do this using min heap but 
Complexicty will be T(n,k)=O(nlogk), S(n,k)=O(n+k)
** check "top-k-frequent-elements-python.py" for implmentation


better way
----------
can do with T(n,d)=O(n), S(n,d)=O(n+d); n=number of elements, d=number of distinct elements
with methode simlar to counting sort + bucket sort (since we know the range of count will 0-n)
**but here no need to sort the indivdual bucket as we only need frquency

steps
1.record counts in a hashmap - T(n,d)=O(n) S(n,d)=O(d)
2. in a size n auxliary array record numbers  taking counts as indexes (index=count-1) - T(n,d)=O(d) S(n,d)=O(n)
3.now right most non-zero k lements will be top k frequent elemnts  - T(n,d)=O(n+d) S(n,d)=O(d)

overall Complexicity
T(n,d)=O(n+d) S(n,d)=O(n+d)

*/

var topKFrequent = function(nums, k) {
    // record counts in a hashmap 
    const hm = new Map();
    nums.forEach(num => hm.has(num) ? hm.set(num, hm.get(num)+1) : hm.set(num, 1));
    // record numbers  taking counts as indexes
    const itt = hm.keys();
    const freq = [...Array(nums.length)].map(e=>[]);
    while(true){
        const {value:key, done} = itt.next();
        if(done){
            break;
        }
        freq[hm.get(key)-1].push(key);
    }
   
    // loop right most non-zero k lements
    const results = [];
    for(let i=freq.length-1; i>=0; i--){
        for(let j=0; j<freq[i].length; j++){
            results.push(freq[i][j])
        }
        if(results.length === k) break;
    }
    
    return results;
};