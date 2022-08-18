"""
You have some sticks with positive integer lengths.

You can connect any two sticks of lengths X and Y into one stick by paying a cost of X + Y.  
You perform this action until there is one stick remaining.

Return the minimum cost of connecting all the given sticks into one stick in this way.

Example 1:

Input: sticks = [2,4,3]
Output: 14
Example 2:

Input: sticks = [1,8,3,5]
Output: 30
"""

"""
can be solved using min heap

any given time the two sticks wil least cost will be 2 shortest sticks in the array

1. insert all the sticks to the min heap - nlogn
2. pop two elemnts and add the sum of thoese back to the heap
3. update cost counter
4. repeat untill heap has only one element


complexcities
insert n items to the heap T(n)=O(nlogn)
pops => T(n)= O(logn + log(n-2) + log(n-4) + ...) = O(log(n*(n-2)*(n-4)* ...)) = O(log n^n/2)=O(n/2logn n)
overall = T(n) = O(nlogn + n/2logn) = O(nlogn), S(n)=O(n)

"""

"""
example 1 : [2,4,3]

h=[14]
c=14

example 2 : [1,8,3,5]
h=[17]
c=30

"""





"""
@param sticks: the length of sticks
@return: Minimum Cost to Connect Sticks
"""
import heapq

def minimum_cost(sticks):
	if len(sticks) < 2:
		return sticks[0] or 0;
	cost = 0;
	heapq.heapify(sticks)
	while len(sticks)>1:
		s1 = heapq.heappop(sticks);
		s2 = heapq.heappop(sticks);
		cost+=s1+s2;
		heapq.heappush(sticks,s1+s2);
	return cost;

# test cases
print(minimum_cost([2,4,3]))
print(minimum_cost([1,8,3,5]))
print(minimum_cost([1]))
print(minimum_cost([1,2]))

