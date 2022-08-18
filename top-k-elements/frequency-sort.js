/*
Given a string s, sort it in decreasing order based on the frequency of the characters. 
The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

 

Example 1:

Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

Example 2:

Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.

Example 3:

Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

 

Constraints:

    1 <= s.length <= 5 * 105
    s consists of uppercase and lowercase English letters and digits.



*/

/**
 * @param {string} s
 * @return {string}
 */

/*
can do in lineer time
same as top k frequent elemnts's bucket sort (since we know the range of count will 0-n)

1.record counts in a hashmap - T(n)=O(n), S(n,d)=O(d)
2.ittrate over map keys and but keys to count buckets in size n aux array  - T(d)=O(n+d), S(n,d)=O(n)
3. ittrate over count buckets and set new string based on counts - T(n)=O(n), S(n)=1

overall complexcity : T(n,d)=O(n+d), S(n,d)=O(n+d)

*/

/*
test case 1  : tree

hm = {
    t:1
    r:1
    e:2
}
buckets =['tr','ee','','']
results = eetr
*/

var frequencySort = function(s) {
    // record counts in a hashmap
    const hm=new Map();
    for(const c of s){
        hm.has(c) ? hm.set(c,hm.get(c)+1) : hm.set(c,1);
    }
    // ittrate over map keys and but keys to count buckets in size n aux array
    const buckets = [...Array(s.length)].map(e=>'');
    const itt = hm.keys();
    while(true){
        const {value:key, done} = itt.next();
        if(done) break;
        for(let i=0; i<hm.get(key); i++){
            buckets[hm.get(key)-1]+=key
        }
        
    }
    // ittrate over count buckets and set new string based on counts
    let results = '';
    for(let i=buckets.length-1; i>=0; i--){
        results+=buckets[i];
    }
    return results;
};