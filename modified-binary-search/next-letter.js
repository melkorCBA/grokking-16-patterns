/*
Given a characters array letters that is sorted in non-decreasing order and a character target, return the smallest character in the array that is larger than target.

Note that the letters wrap around.

Assume the given array is a circular list, which means that the last letter is assumed to be connected with the first letter. 
This also means that the smallest letter in the given array is greater than the last letter of the array 
and is also the first letter of the array.

For example, if target == 'z' and letters == ['a', 'b'], the answer is 'a'.

 

Example 1:

Input: letters = ["c","f","j"], target = "a"
Output: "c"

Example 2:

Input: letters = ["c","f","j"], target = "c"
Output: "f"

Example 3:

Input: letters = ["c","f","j"], target = "d"
Output: "f"

 

Constraints:

    2 <= letters.length <= 104
    letters[i] is a lowercase English letter.
    letters is sorted in non-decreasing order.
    letters contains at least two different characters.
    target is a lowercase English letter.




*/


/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */

/*
for the circular postion we can use a pre check,
if target >= letters[letter.length-1] return letters[0]
if target < letters[0] return letters [0]

other cases can be accesed from regular binray search

here,
target >= letter[middle] will increase the left

since the letter are lower case
ASCI codes willbe between 97 -122

complexcity:
T(n) - O(log n)
S(n) - O(1)

*/


/*
test case 1 :['a', 'b'] t=z
z=122
b=98
return 'a'

test case 2 : ["c","f","j"] t=a
t=97
return 'c'

test case 3: ["c","f","j"] t=c
t=100
return 'f'

test case 4: ["c","f","j"] t=d
t=101
l=1
r=0
m=0
return 'f'


*/

var nextGreatestLetter = function(letters, target) {
    const targetCode = target.charCodeAt();
    if(targetCode >= letters[letters.length-1].charCodeAt()) return letters[0];
    if(targetCode < letters[0].charCodeAt()) return letters[0];
    
    let left=0, right = letters.length-1;
    while(left<=right){
        const m = Math.floor((left+right)/2);
        if(targetCode >= letters[m].charCodeAt()) left=m+1;
        else right=m-1;
    }
    
    return letters[left];
};