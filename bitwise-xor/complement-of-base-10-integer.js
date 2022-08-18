/*
The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

    For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.

Given an integer n, return its complement.

 

Example 1:

Input: n = 5
Output: 2
Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.

Example 2:

Input: n = 7
Output: 0
Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.

Example 3:

Input: n = 10
Output: 5
Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

 

Constraints:

    0 <= n < 109

 
*/

/**
 * @param {number} n
 * @return {number}
 */

/*
since n>=0
n=5
00000000000000000000000000000101

calculate the number of bits = 3
 get all bits 1 number

11111111111111111111111111111111 = ~ (00000000000000000000000000000000) = ~0

make first 3 least significat bits zero by shifting right by 3
~0>>3 = 1111111111111111111111111111000
~5 = 11111111111111111111111111111010

so (~0>>3)^~5 = 2

overall time complexcity is,
T(n) = O(32) = O(1), S(n) = O(1)
*/

var bitwiseComplement = function(n) {
    // edge case n=0
    if(n===0) return 1;
    
    // find the number of bits
    let nOfbits = 0;
    let n1 = n;
    while(n1!==0){ // complexcity is constant - T(n) = O(32) = O(1), S(n) = O(1)
        nOfbits++;
        n1=n1>>1
    }
    
    return (~0<<nOfbits)^~n
     
};

/*
Conversion from Two's Complement
URL: https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html

Use the number 0xFFFFFFFF as an example. In binary, that is:

1111 1111 1111 1111 1111 1111 1111 1111

What can we say about this number? It's first (leftmost) bit is 1, which means that this represents a number that is negative. That's just the way that things are in two's complement: a leading 1 means the number is negative, a leading 0 means the number is 0 or positive.

To see what this number is a negative of, we reverse the sign of this number. But how to do that? The class notes say (on 3.17) that to reverse the sign you simply invert the bits (0 goes to 1, and 1 to 0) and add one to the resulting number.

The inversion of that binary number is, obviously:

0000 0000 0000 0000 0000 0000 0000 0000

Then we add one.

0000 0000 0000 0000 0000 0000 0000 0001

So the negative of 0xFFFFFFFF is 0x00000001, more commonly known as 1. So 0xFFFFFFFF is -1.
Conversion to Two's Complement

Note that this works both ways. If you have -30, and want to represent it in 2's complement, you take the binary representation of 30:

0000 0000 0000 0000 0000 0000 0001 1110

Invert the digits.

1111 1111 1111 1111 1111 1111 1110 0001

And add one.

1111 1111 1111 1111 1111 1111 1110 0010

Converted back into hex, this is 0xFFFFFFE2. And indeed, suppose you have this code:

#include <stdio.h>

int main() {
    int myInt;
    myInt = 0xFFFFFFE2;
    printf("%d\n",myInt);

    return 0;
}

That should yield an output of -30. Try it out if you like


*/