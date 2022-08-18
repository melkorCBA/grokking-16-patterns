"""
Problem Statement 
Given ‘M’ sorted arrays, find the K’th smallest number among all the arrays.

Example 1:
Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
Output: 4
Explanation: The 5th smallest number among all the arrays is 4, this can be verified from the merged 
list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]

Example 2:
Input: L1=[5, 8, 9], L2=[1, 7], K=3
Output: 7
Explanation: The 3rd smallest number among all the arrays is 7.


"""

"""
way we can solve this by using a M size min heap

steps:

1.push first elemnt of each list to heap
	in heap record
		global index - index of the list
		local index - index of the item in the list
2. pop item, push the next elemts of the pop items's list
3. do this k times to find the kth smalest value

idea : the smallest elemt should be one of the fist elements of all lists

complexcity:
T(n,m,k) = O(mlogm + klogm) = O((m+k)logm)
S(n,m,k) = O(m)
where,
m= number of lists
k= kth smallest
n= total # of itemes



"""

"""
test case 1:
Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5

i=4
v=4

minhp = [
	(4,(2,2)),
	(6,(1,2)),
	(6,(0,1))
]


"""



import heapq

def find_Kth_smallest(lists, k):
	minhp = [];
	# push first elemnt of each list to heap
	for i in range(len(lists)):
		minhp.append((lists[i][0],(i,0)));
	# heapify do T(m)=O(m) insted of O(mlogm)
	heapq.heapify(minhp);
	i=0;
	while i<k:
		[v,[g,l]] = heapq.heappop(minhp);
		if i==k-1:
			return v;
		# push the next element from the same list
		if l+1<len(lists[g]): # check next l+1 index exsists in the gth indexed list
			nv = lists[g][l+1];
			heapq.heappush(minhp,(nv,(g,l+1)));
		i+=1;

def main():
  print("Kth smallest number is: " +
        str(find_Kth_smallest([[2, 6, 8], [3, 6, 7], [1, 3, 4]], 5)))
  print("Kth smallest number is: " +
        str(find_Kth_smallest([[5, 8, 9],[1,7]], 3)))


main()


	
