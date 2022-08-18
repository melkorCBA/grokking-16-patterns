/*
Problem Statement 
We are given an unsorted array containing ‘n+1’ numbers taken from the range 1 to ‘n’. 
The array has only one duplicate but it can be repeated multiple times. 
Find that duplicate number without using any extra space. You are, however, allowed to modify the input array.

Example 1:
Input: [1, 4, 4, 3, 2]
Output: 4


Example 2:
Input: [2, 1, 3, 3, 5, 4]
Output: 3


Example 3:
Input: [2, 4, 1, 4, 4]
Output: 4


cycle sort it,
when found currentValue^target cell value = 0
return as the duplicte value

complexcity - T-O(n), S-O(1)

there is another way - better way with no swaps
set minus for alreday visted indexes
and if -minus index visted nums[i] is the duplicate


*/

/*
test cases: 1
[2, 1, 3, 3, 5, 4]
 ^

*/

const findDuplicate1 = (nums) => {
	let i=0;
	while(i<nums.length){
		if(i+1===nums[i]){
			i++;
		}
		else {
			if(!(nums[i]^nums[nums[i]-1])){
				return nums[i];
			}
			// swap
			const temp = nums[i];
			nums[i]=nums[nums[i]-1];
			nums[temp -1] = temp;
			continue;
		}
		
	}
}

var findDuplicate = function(nums) {
    const duplicates = [];
    for(let i=0; i<nums.length; i++){
        let index = Math.abs(nums[i])
        if(nums[index-1]<0){
            return index;
        }
        nums[index-1]=-1*Math.abs(nums[index-1]);
    }
    
};

console.log(`taste case 1 : [1, 4, 4, 3, 2], Expected: 4, Actual: ${findDuplicate([1, 4, 4, 3, 2])}`);
console.log(`taste case 1 : [2, 1, 3, 3, 5, 4], Expected: 3, Actual: ${findDuplicate([2, 1, 3, 3, 5, 4])}`);
console.log(`taste case 1 : [2, 4, 1, 4, 4], Expected: 4, Actual: ${findDuplicate([2, 4, 1, 4, 4])}`);