/*
[4,2,2,7,8,1,2,8,1,0]

find the smallest subarray with sum greater than or equal to 8

window
	grow untill meet the sum requirement
	check, we do better by shrinking the window
	** if found a one element satisfying the condidtion , terminate the iterattion and retunrn 1

	worst case,
	 last element is greater than the sum and sum ao all remaning elements are less than the given sum

	 T -O(2n) ~ O(n)
	 S - O(2n)

	 n - number of element in the array

*/

// assume there is one slution for any array given and sum


/*
test cases:

     [4,2,2,7,8,1,2,8,1,0], sum>=8
end           ^
start         ^

minLength = 2
currentSum = 15

*/

const minLength = (arr, targetSum) => {
	let minLength = arr.length;
	
	let wStart= 0;
	let currentSum = 0;
	for(let wEnd=0; wEnd<arr.length; wEnd++){
		// grow untill meet the sum requirement
		currentSum+=arr[wEnd];	
		// check, we do better by shrinking the window
		while(currentSum>=targetSum){
			minLength = Math.min(minLength, (wEnd - wStart)+1);
			// ** if found a one element satisfying the condidtion , terminate the iterattion and retunrn 1
			if(minLength === 1) {
				return 1;
			}
			currentSum-=arr[wStart++];
		}
		
		
	}

	return minLength;
}