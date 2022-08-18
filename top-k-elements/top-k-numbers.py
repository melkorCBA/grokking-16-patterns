"""
Given an unsorted array of numbers, find the ‘K’ largest numbers in it.
Note: For a detailed discussion about different approaches to solve this problem, 
take a look at Kth Smallest Number.

Example 1:
Input: [3, 1, 5, 12, 2, 11], K = 3
Output: [5, 12, 11]

Example 2:
Input: [5, 12, 11, -1, 12], K = 3
Output: [12, 11, 12]

"""

"""
approuch 1
sort the array decending
then return first k elemnts
	Complexcities : T(n,k) = (nlogn + k), S(n,k)=O(1)

 approuch 2
 insert to ha heap
 then pop k lements and return
	Complexcities : T(n,k) = O(nlogn + klogn), S(n,k)=O(n)

approuch 3
------------
get min heap
insert fisrt k elements
remaning n-k elements if a elemnts is greated than the top
pop and insert
return the heap
	Complexcities : T(n,k) = O(klogk + (n-k)logk)=O(nlogk), S(n,k)=O(k)


"""
"""
test case 1 : [3, 1, 5, 12, 2, 11], K = 3

h= [5,11,12]

"""
import heapq

def find_k_largest_numbers(nums, k):
	if len(nums) <= k:
		return nums;
	h = [];
	
	for i in range(len(nums)):
		# insert first k elements
		if i<k:
			heapq.heappush(h,nums[i]);
			continue;
		if nums[i] > h[0]:
			heapq.heappop(h);
			heapq.heappush(h,nums[i])
	return h;

print(find_k_largest_numbers([3, 1, 5, 12, 2, 11],3))
print(find_k_largest_numbers([5, 12, 11, -1, 12],3))
