/*
Problem Statement 
Given an infinite sorted array (or an array with unknown size), 
find if a given number ‘key’ is present in the array. 
Write a function to return the index of the ‘key’ if it is present 
in the array, otherwise return -1.

Since it is not possible to define an array with infinite (unknown) size,
you will be provided with an interface ArrayReader to read elements of
the array. 

ArrayReader.get(index) will return the number at index; 
if the array’s size is smaller than the index, it will return Integer.MAX_VALUE.

Example 1:
Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 16
Output: 6
Explanation: The key is present at index '6' in the array.

Example 2:
Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 11
Output: -1
Explanation: The key is not present in the array.

Example 3:
Input: [1, 3, 8, 10, 15], key = 15
Output: 4
Explanation: The key is present at index '4' in the array.

Example 4:
Input: [1, 3, 8, 10, 15], key = 200
Output: -1
Explanation: The key is not present in the array.
*/

/*
obious way of solving this would be liner but the complexcity wil be
T(i) = O(i), S(i) = 1 :  where i is the index of the key

to directyl solving this from binary search we need to know the upper bound 
which is unknown

one way to do this is define some contant length which will be the lwngth of 
the two bonds 
and travesr the array untill we found a bound that incles the key 

the do the binary seacrh

if c=contant length we definded,

number of steps to find the bound that includes i will be = i/c

<---------i-------------->
[*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*. .....]

the will be performing the binary search on c number if items

so the complexcity will be,
T(i) = O(i/c + log c)
since c i contant for any i
T(i) = O(i)

but if the length the interval is not contant and if ti increases 2 times 
from lat length
we can find the boundry form log i steps

<
[0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19]

start from (0,1)
1st step (1, 2^1) = (1,2)
2nd step (2, 2^2) = (2,4)
3rd step (4, 2^3) = (4,8)

number of steps to find the  the 8th index  = log 8 = 3
so, number of steps to find the ith index  = log i

let's say mber of steps to find the ith index is 'm'
m=log i
number of items in the ith step interval = 2^m - 2^m-1 = 2^m-1
binary search complexcity = O(log 2^m-1) = O(m-1*log2) = O(m) = O(log i)


so the complexcity
T(i) = O(log i) + O(log i) =  = O(log i)
S(i) = 1;

this is alod called exponetional search


*/

function ArrayReader(arr){
	this.arr = arr;
}

ArrayReader.prototype.get = function (index) {
	if(this.arr[index] === undefined) return Number.MAX_SAFE_INTEGER;
	return this.arr[index];
}


const searchInInfiniteArray = function(reader, key){
	if(reader.get(0) ===Number.MAX_SAFE_INTEGER) return -1;

	// find the bounded interval for binary search
	let left = 0, right = 1;
	while(reader.get(right)<=key){
		if(reader.get(right) === key) return right;

		left=right+1;
		right*=2;
	}

	// binary search
	while(left<=right){
		const m = Math.floor((left+right)/2);
		if(reader.get(m) === key) return m;
		if(reader.get(m) < key) left=m+1;
		else right=m-1;
	}

	return -1;

}

const test_cases = [
{
	input : [[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],16],
	output : 6
},
{
	input : [[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],11],
	output : -1
},
{
	input : [[1, 3, 8, 10, 15],15],
	output : 4
},
{
	input : [[1, 3, 8, 10, 15],200],
	output : -1
}
	
];

const test = () => {
	test_cases.forEach(({input, output},i) => {
		console.log('------------------------------------------')
		console.log(`test case : ${i+1}`);
		console.log(`arr : ${input[0]}, key: ${input[1]}`);
		const reader = new ArrayReader(input[0]);

		const result = searchInInfiniteArray(reader, input[1])
		console.log(`expected : ${output} Actual: ${result}`)
		console.log(`Status : ${output === result ? 'Passed' : 'Failed'}`)
	})
}

test();