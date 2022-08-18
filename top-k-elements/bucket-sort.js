/*
consting sort suitable when 
1.The range of numbes (r) are know 
2.but r can be any (r<=>n)
3. almost as pigon sort, expect the bucket/holes are not granteedt to be sorted
4. here there will be total of n+1 buckets

steps
1.find the min/max - T(n)= O(n) S(n)=O(1)
2.build a mapper function
3.put items to buckets -  T(n)= O(n) S(n)=O(n+1)
4. sort buckets (avarage - uniform random ditribution/ every element has an equale chance to be in every bucket)
	T(n) = O(n) {worst case O(n^2)}, S(n)=O(1)
5.concat them to oroginal array = T(n)= O(r+n) S(n)=O(1)



overall Complexcicty:
T(n)= O(n) S(n)=O(n) 
** uniform random ditributed and using dynamic arrays

*/

const bucketSort = (nums) => {
	// find min/max
	let min = nums[0], max = nums[0];
	nums.forEach(num => {
		if(num > max) max=num;
		if(num < min) min=num;
	})
	
	
	// set the mapper function
	const f = (el) => Math.floor(nums.length*(el-min)/(max-min));

	// put items to buckets
	const buckets =[...Array(nums.length+1)].map(e=>[]);

	nums.forEach(num => buckets[f(num)].push(num));

	// sort buckets
	for(let i=0; i<buckets.length; i++){
		// idealy use insertion - which givies n for aveage case
		buckets[i].sort((a,b)=> a-b);
	}
	// concat back to original - T(n,r)= O(n+r)
	let idx=0;
	for(let i=0; i<buckets.length; i++){
		for(let j=0; j<buckets[i].length; j++){
			nums[idx++]=buckets[i][j]
		}
	}

	return nums;

}

console.log(bucketSort([-5, -10, 0, -3, 8, 5, -1, 10]))