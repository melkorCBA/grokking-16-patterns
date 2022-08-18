"""
can use two max heaps to solve this probelm

k1's heap
size is k1

1.insert untill k1's size is k1
2. if ith element < top of k1
		the pop top to k2's heap
		add ith element to k1's heap
	else
		check if k2's size < k2-k1 -1 add it
		if k2's size is k2-k1-1
			if top of k2's > ith incmoing element pop top add incmoing
			else ignore
3. pop all from k2's heap and get the sum


"""

"""
overall complexcities:
T(n,k1,k2) = O(n*(logk1 + log(k2-k1-1)) ~ O(nlog max(k1, k2-k2-1)) -- worst case O(nlogn)
S(n,k1,k2) = O(k2)
"""

import heapq;

def push_k2shp(hp, v, k1, k2):
	if len(hp) < (k2-k1)-1:
		heapq.heappush(hp,-1*v); # T(n,k1,k2) = O(log(k2-k1-1))
		return;
	if v >= -1*hp[0]:
		return;
	heapq.heappop(hp); # T(n,k1,k2) = O(log(k2-k1-1))
	heapq.heappush(hp,-1*v) # T(n,k1,k2) = O(log(k2-k1-1))

def find_sum_of_elements1(nums, k1, k2):
	k1shp=[];
	k2shp=[];
	for n in nums: # T(n,k1,k2) = O(n)
		if len(k1shp)<k1:
			heapq.heappush(k1shp, -1*n); # T(n,k1,k2) = O(logk1)
			continue;
		if n<-1*k1shp[0]:
			v = -1*heapq.heappop(k1shp); # T(n,k1,k2) = O(logk1)
			heapq.heappush(k1shp,-1*n); # T(n,k1,k2) = O(logk1)
			push_k2shp(k2shp,v,k1,k2);
			continue;
		push_k2shp(k2shp,n,k1,k2);
	k1k2sum = 0;
	for s in k2shp: # T(n,k1,k2) = O(n)
		k1k2sum+=-1*s;
	return k1k2sum;




"""
can also be done with one heap
1. insert all to a min heap - T(n,k1,k2) = O(nlogn), S(n,k1,k2) = O(n)
2.remove k1 elements - T(n,k1,k2) = O(k1logn), S(n,k1,k2) = O(1)
3. pop k2-k2-1 elemnts and sum it - T(n,k1,k2) = O((k2-k1-1)log(n-k1)), S(n,k1,k2) = O(1)

overall complexcity
T(n,k1,k2) = O(nlogn), S(n,k1,k2) = O(n)
"""
def find_sum_of_elements2(nums, k1, k2):
	minh = [];
	# insert all to a min heap
	for n in nums:
		heapq.heappush(minh, n);
	# pop k1
	for _ in range(k1):
		heapq.heappop(minh);
	# pop and sun k2-k2-1
	sum=0;
	for _ in range(k2-k1-1):
		sum+=heapq.heappop(minh);
	return sum;


"""
better soultion is,
1.insert k2-1 elemnts to a max heap - holds smallest k2 elemnts from n elemnts - T(n,k1,k2) = O(nlogk2), S(n,k1,k2) = O(k2)
2.pop top k1-k2-1 elemnts ans sum it - T(n,k1,k2) = O((k1-k1-1)logk2), S(n,k1,k2) = O(1)

overall complexcities:
T(n,k1,k2) = O(nlogk2), S(n,k1,k2) = O(k2)

"""

def find_sum_of_elements(nums, k1, k2):
	maxhp = [];
	# inset smallest k2
	for n in nums:
		if len(maxhp)<k2-1:
			heapq.heappush(maxhp, -1*n);
			continue;
		if n < -1*maxhp[0]:
			heapq.heappop(maxhp);
			heapq.heappush(maxhp, -1*n);
	# pop k2-k1-1
	sum=0;
	for _ in range(k2-k1-1):
		sum+=-1*heapq.heappop(maxhp)
	return sum

print(find_sum_of_elements([1, 3, 12, 5, 15, 11], 3,6))
print(find_sum_of_elements([3, 5, 8, 7], 1,4))
