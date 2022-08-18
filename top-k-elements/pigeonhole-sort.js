/*
consting sort suitable when 
1.The range of numbes (r) are know 
2.And r<=n
3. but compaired to counting sort, we are moving the orginal elements 2 times 
(once to pigonholes, second back to original)
4. more generlized version of "pigeonhole sort" leads to the "bucket sort" where r<=n is not a issue anymore


steps
1.find the range - T(n,r)= O(n) S(n,r)=O(1)
2.build a mapper function
3.put items to holes -  T(n,r)= O(n) S(n,r)=O(r+n)
4. concat them to oroginal array = T(n,r)= O(r+n) S(n,r)=O(1)


overall Complexcicty:
T(n,r)= O(n+r) S(n,r)=O(n+r)

*/

const pigeonholeSort = (nums) => {
	// find the range
	let min = nums[0], max = nums[0];
	nums.forEach(num => {
		if(num > max) max=num;
		if(num < min) min=num;
	})
	const r = max - min +1;
	
	// set the mapper function
	const f = (el) => el - min;

	// put items to holes
	const holes =[...Array(r+1)].map(e=>[]);
	nums.forEach(num => holes[f(num)].push(num));

	// concat back to original - T(n,r)= O(n+r)
	let idx=0;
	for(let i=0; i<holes.length; i++){
		for(let j=0; j<holes[i].length; j++){
			nums[idx++]=holes[i][j]
		}
	}

	return nums;

}

console.log(pigeonholeSort([-5, -10, 0, -3, 8, 5, -1, 10]))