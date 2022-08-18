/*
Given an n x n matrix where each of the rows and columns is sorted in ascending order, 
return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

You must find a solution with a memory complexity better than O(n2).

 

Example 1:

Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13

Example 2:

Input: matrix = [[-5]], k = 1
Output: -5

 

Constraints:

    n == matrix.length == matrix[i].length
    1 <= n <= 300
    -109 <= matrix[i][j] <= 109
    All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
    1 <= k <= n2

 

Follow up:

    Could you solve the problem with a constant memory (i.e., O(1) memory complexity)?
    Could you solve the problem in O(n) time complexity? The solution may be too advanced for
     an interview but you may find reading this paper fun.




*/

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

/*
1st approuch - minn Heap soultions
 [1,  5,  9]
[10, 11, 13]
[12, 13, 15]


we can say the smallest element is (0,0) and largest is (3,3)

2nd largest is min of ((0,1)=5, (1,0)=10) = 5
3rd largest = mins of (9,11 and 10) = 5

so for any given value
discrading old values
we can say next largers should be,
to the right,
or down,
or other old value (like 10 in the above example)

so if we use a heap to and push the next largest values this could work
but we have to handle adding same elemnt to the heap (like 11, will added in (0,1) and (1,0))

so need to manain a seperate two hashmaps for x,y visted indexs

the heap size will be n

so Total memory complexcity - S(n,k)= O(n+n+n) = O(3n)= O(n)
T(n,k)=O(klogn)


Binnary Search
There is usally two types of binary searches based on the search space
1. Index space
2. range space

here we have access to min and max values of the matrix. hence know the range
for the 1st example it's 1 and 15
so the matrix has values from 1 to 15

before this let's say without appling binary search;
we know there are 9 (3x3) values in the materix

so since the max is 15 we can say there are 15 elemnts that is equal or less than 15 (9th smallest element)

if we look at a hypothtial value that isn't in the matrix,
14 = 15 -1

still there are 9 values <=14
since we need to find k=8 (8 values less than some value) we keep going

15 - 9
14 - 9
13 - 8
when it's 13 we hit the 8 elements mark
but this might not be the answer we are looking for (13 might not be the the matrix, so the 13 might not be on of 8 elemnts).

so we need to keep going

12 - 6
now it has only 6 elements
that means we need increse again to find our target

13 - 8

so we can garantee that 13 is infact the 8th smallest now

here
we saw
15 grater than or equal to 8 - T
14 grater than or equal to 8 - T
13 grater than or equal to 8 - T
12 less than or equal to 8 - F
11 less than or equal to 8 - F

so we see monotonic function - ....,T,T,T,T,F,F,....F
once it's fliped to other side does't chage the value

so we find the last T elemnt that will be the answer

here the monotonic functon is the count of elemnts less than or equle to K
f(e) = count<= k

but complexcity of this is T(m)=O(m), where m= rnage = max- min
but insted of searching linerly in the range space we apply a binary search

if we apply binary search for the 1st example
 [1,  5,  9]
[10, 11, 13]
[12, 13, 15]

 [1,  5,  9, 10, 11, 12, 13, 13, 15]

left = 1, right=15
mid=8
count = 2

# need to increse mid
but curret can't be the answer
left=mid+1=9, right=15
mid=12
count=6

# need to increse mid
but curret can't be the answer
left=mid+1=13, right=15
count=8

# found a k=8 but don't know mid=13 is the answer
# now try to find the element that will be 8
# incresing mid will not get less than 8 element
# only decesing the mid we will get the fisrt k=8 value of k<8 value
# but curretn mid can also be the answer we are loking for
# so we don't omit the mid this time
left=13, right=mid=13
here we find left, right points to the same elemnt (mid will be the same)
so we have infact reached the monotonic point
so the 8th smallest is 13

this complexcity of bin search is T(m)=O(log m), where m= rnage = max- min
but complexcity of finding out the cout is T(n)=O(n^2)

Sp overall complexcity - T(m,n) = O(n^2 log m), S(m,n)=O(1), where m= rnage = max- min , n= matix col/row length


usefull links: 
1. https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/discuss/85225/Quick-Select-and-Binary-Search-(detailed-notes)
2. https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/discuss/1685550/Here's-why-Binary-Search-works.-(Explain-it-to-me-like-I'm-5)
*/

const countElements = function (el, matrix) {
    const n= matrix.length;
    let cnt=0;
    for(let r = 0; r<n; r++){
        if(matrix[r][0]>el){
            break;
        }
        for(let c=0; c<n; c++){
            if(matrix[r][c] <= el) cnt++;
        }
    }
    return cnt;
}

const countElementsUnsorted = function (el, matrix) {
	let cnt=0;
	const n = matrix.length;
	for(let r=0; r<n; r++){
		for( let c=0; c<n; c++){
			if(matrix[r][c]<=el) cnt++;
		}
	}
	return cnt;
}

var kthSmallest = function(matrix, k) {
    const n = matrix.length;
    let left=matrix[0][0], right = matrix[n-1][n-1];
    
    while(left<right){
        const mid = Math.floor((left+right)/2);
        const cnt = countElements(mid, matrix) 
        if(cnt >= k){
            right=mid;
        }
        if(cnt < k) {
            left=mid+1;
        }
        
        // why not adding,
        /*
        if(cnt>k) right=mid+1
        */
        
        // reason is our curret mid is the kth elemnts, but due to duplcate of kth elemnt the count might be count >k
        // then if we do right=mid+1 we the soultion is removed from search space
    }
    
    return left;

};

const findMax = (matrix) => {
	let mx = matrix[0][0];
	const n = matrix.length;
	for(let r=0; r<n; r++){
		for( let c=0; c<n; c++){
			if(matrix[r][c]>mx) mx=matrix[r][c];
		}
	}
	return mx;
}

const findMin = (matrix) => {
	let mn = matrix[0][0];
	const n = matrix.length;
	for(let r=0; r<n; r++){
		for( let c=0; c<n; c++){
			if(matrix[r][c]<mn) mn=matrix[r][c];
		}
	}
	return mn;
}

var kthSmallest2 = function(matrix, k) {
    const n = matrix.length;
    let left=findMin(matrix), right = findMax(matrix);
    console.log(`min:${left}, max: ${right}`);
    while(left<right){
        const mid = Math.floor((left+right)/2);
        console.log(`mid: ${mid}`)
        const cnt = countElementsUnsorted(mid, matrix);
        console.log(`count: ${cnt}`)
        if(cnt >= k){
            right=mid;
        }
        if(cnt < k) {
            left=mid+1;
        }
        
        // why not adding,
        /*
        if(cnt>k) right=mid+1
        */
        
        // reason is our curret mid is the kth elemnts, but due to duplcate of kth elemnt the count might be count >k
        // then if we do right=mid+1 we the soultion is removed from search space
    }
    
    return left;

};


const a =  [[9,  1,  5],[13, 11, 10],[13, 12, 15]]
console.log(kthSmallest2(a,8));