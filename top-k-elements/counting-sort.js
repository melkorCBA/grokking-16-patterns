/*
consting sort suitable when 
1.The range of numbes (r) are know 
2.And r<=n

steps
1.find the range - T(n,r)= O(n) S(n,r)=O(1)
2.build a mapper function
3.record counts in r+1 array - T(n,r)= O(n) S(n,r)=O(r+1)
4.get cumalative count - T(n,r)= O(r+1) S(n,r)=O(1)
5.shift right by one postion - (to get starting indexs) - T(n,r)= O(r+1) S(n,r)=O(1)
6.set final sort based on origina and count array - T(n,r)= O(n) S(n,r)=O(n)

overall Complexcicty:
T(n,r)= O(n+r) S(n,r)=O(n+r)

*/

const countSort = (nums) => {
	// find the range
	let min = nums[0], max = nums[0];
	nums.forEach(num => {
		if(num > max) max=num;
		if(num < min) min=num;
	})
	const r = max - min +1;
	
	const counts = [...Array(r+1)].map(e=>0);

	// set the mapper function
	const f = (el) => el - min;
	// record counts
	nums.forEach(num => counts[f(num)]+=1)
	// get cumulative counts
	let cuml = counts[0];
	for(let i=1; i<counts.length; i++){
		counts[i]=cuml+=counts[i];
	}
	// right shift by one
	counts.pop();
	counts.unshift(0);S
	// get the final sorrted list
	const results = [...Array(nums.length)].map(el=>0);
	nums.forEach(num => {
		let i = f(num);
		let j = counts[i]; // starting postion
		results[j]=num;
		counts[i]+=1;

	});
	return results;
}

console.log(countSort([-5, -10, 0, -3, 8, 5, -1, 10]))