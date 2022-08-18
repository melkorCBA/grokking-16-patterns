/*
We are given an array containing ‘n’ objects. Each object, when created, was assigned a unique number 
from 1 to ‘n’ based on their creation sequence. This means that the object with sequence number ‘3’ was 
created just before the object with sequence number ‘4’.

Write a function to sort the objects in-place on their creation sequence number in O(n) 
and without any extra space. (sort the array in O(n))

For simplicity, let’s assume we are passed an integer array containing only the sequence numbers, though 
each number is actually an object.


Example 1:
Input: [3, 1, 5, 4, 2]
Output: [1, 2, 3, 4, 5]

Example 2:
Input: [2, 6, 4, 3, 1, 5]
Output: [1, 2, 3, 4, 5, 6]

Example 3:
Input: [1, 5, 6, 4, 3, 2]
Output: [1, 2, 3, 4, 5, 6]


since there is every N+ element bewtween 1-5
is there in the array (single occurance each)

we know the each index vlaue should be
eg: value 4's index = 4-1 = 3

if we loop through array and swap curent elememtas with corret index,
we can sort this using max n-1 swaps
hence T-O(n) < O(nlogn), S-O(1)



*/

/*
test case: 
[5, 1, 3, 4, 2]
 ^

*/

const cycleSort = (sequence) => {
	let index=0;
	while(index<sequence.length){
		if(index===sequence[index]-1){
			index++;
			continue;
		}
		// swap
		const temp=sequence[sequence[index]-1];
		sequence[sequence[index]-1]=sequence[index]
		sequence[index]=temp;
	}
	return sequence;
}


console.log(`Test case 1 : ${[3, 1, 5, 4, 2].sort().toString() === cycleSort([3, 1, 5, 4, 2]).sort().toString() ? 'Passed' : 'Failed'}`)
console.log(`Test case 2 : ${[2, 6, 4, 3, 1, 5].sort().toString() === cycleSort([2, 6, 4, 3, 1, 5]).sort().toString() ? 'Passed' : 'Failed'}`)
console.log(`Test case 3 : ${[1, 5, 6, 4, 3, 2].sort().toString() === cycleSort([1, 5, 6, 4, 3, 2]).sort().toString() ? 'Passed' : 'Failed'}`)
