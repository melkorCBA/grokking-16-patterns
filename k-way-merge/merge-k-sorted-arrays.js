/*
Problem

You are given k sorted arrays in the form of 2D integer matrix arr of size k*n.
Merge them into a single sorted array.

Example 1

Input 1:

 A = [  [1, 2, 3]
        [2, 4, 6]
        [0, 9, 10]
     ]
Output 1: [0, 1, 2, 2, 3, 4, 6, 9, 10]


way to do this is (non-inplaced merge) is,
have a seperete k size array to hold pointer

ittrate form 0 - k*n
 for each itt
 	find the min value from all the array by going thriugh poniter array = (min value and it's index in poniter array)
 	set the value as curret and incelent poiner index

 initial poniert array = [0,0,0, .... 0]

 complexcity : 
 T(n,k)=O(n*k*k)=O(n*(k^2)), S(n,k)=O(n*k + k)

Better approuch
--------------
 we can improve this by using min heap to store poniters
 each time we pop a poniter, should put next poniter index to heap
 this will reduce finding out min from T(n,k) = O(k) to O(logk)

 ** but initaly inseting the all pointer would take - T(n,k)=O(klogk)
 The new complecicties = T(n,k)=O(n*k*logk)=O(n*k*logk), S(n,k)=O(n*k + k)

*/


const mergeKSortedArrays = (arrs, n) => {
	const k = arrs.length;
	const results = [...Array(n*k)].map(e=>0);
	const pointers = [...Array(k)].map(e=>0);
	for(let i=0; i<results.length; i++){
		const [min, idx] = findMin(arrs, pointers);
		results[i]=min;
		pointers[idx]+=1;
	}
	return results;

}

function findMin(arrs,pointers)  {
	let min = Number.MAX_SAFE_INTEGER;
	let idx= 0;
	pointers.forEach((v,i) => {
		if(arrs[i][v] !== undefined && arrs[i][v]<min){
			min=arrs[i][v];
			idx=i;
		}
	})
	return [min, idx];
}





console.log(mergeKSortedArrays([[1, 2, 3],[2, 4, 6],[0, 9, 10],[1, 69, 77]],3))
