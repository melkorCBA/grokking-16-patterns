/*
Given a string s, you can transform every letter individually to be lowercase or uppercase to 
create another string.

Return a list of all possible strings we could create. Return the output in any order.

 

Example 1:

Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Example 2:

Input: s = "3z4"
Output: ["3z4","3Z4"]

 

Constraints:

    1 <= s.length <= 12
    s consists of lowercase English letters, uppercase English letters, and digits.



*/


/**
 * @param {string} s
 * @return {string[]}
 */


/*
for any letter there is two choises
1. uppder case
2.lower case
 so if the n is the total number of letters in the string
 there will be 2^n subsets
 
 complexcity ?
if we are using smothing like java the time complxcity will be,
worst case having only letteer charters,
tree size = 2^n
then for concat for each recusrron is n
T(n) = O(n*2^n)

but javascript we can assue this to be
T(n) = O(logn*2^n)

S(T) = O(n+2^m); n= number of characters(depth of the tree), m= number of leteer characters
*/

/*
test caee 1:
'a1b2'

                  p(0,'')
           /                  \
        p(1,a),             p(1,A)
          |                    |
     p(2, a1)               p(2,A1)
      /     \               /   \
p(3,a1b), p(3, a1B)  p(3,A1b), p(3,A1B)
  |          |           |         |
p(4, a1b2)  p(4,a1B2) p(4,A1b2)  p(4,A1B2)

['a1b2', 'a1B2', 'A1b2', 'A1B2']

*/
var letterCasePermutation = function(s) {
    const perms = [];
    const permutation = function(i, perm) {
        if(i>= s.length){
            perms.push(perm);
            return;
        }
        const chCode = s[i].charCodeAt(); // here reading charaters is O(logn)
        if(47<chCode && chCode<58 ) { // 0 is 48 and 9 is 57
            permutation(i+1, perm+s[i]); // here concatitantion we can assume as O(1) beacuse of ropes data strcutres; 
            return                       // insertion to top of rope (tree like structre is O(1))
        }
        
        // a-z = 97 - 122 and A-Z 65 -97
        // upper to lower = add 32 to the code
        // lower to upper = decremnt 32 from the code
        const otherCh = String.fromCharCode(chCode>64 && chCode <91 ? chCode + 32 : chCode -32);
        permutation(i+1, perm+s[i]);
        permutation(i+1, perm+otherCh);
    }
    permutation(0,'');
    return perms;
};