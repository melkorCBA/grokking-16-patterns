"""
You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].

Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]

 

Constraints:

    nums.length == k
    1 <= k <= 3500
    1 <= nums[i].length <= 50
    -105 <= nums[i][j] <= 105
    nums[i] is sorted in non-decreasing order.

Accepted
71,633
Submissions
120,116

"""

"""
one way to solve this is using min and max heap


as the initial index we can take the minum 0th index element e,
(e-1,e) as the range

since this range is not captureing the all the list we need to get a better answer

if we had 2 lists

gona mantain 2 poniter for 2 lists

[4,10,15,24,26]
         ^
[0,9,12,20]
        ^
 
(-1,0)
max(0,4) = 4
(-1,4)  # now we have a posible soultion 
        # since the list is sorted the final soultion should be the first smallest gap range we will find
        # so we need to record the min gap and it's interval
        # gap=5, range = (-1,4)
        # now we see can we reduce the gap and find a better soultion
        # so will bring lower bound to min(0,4)
min(0,4) = 0
move the correspoding poniter  right
set lower bound to min
(0,4)

repeat the process
max(4,9)=9, 
(1,9), gap=8, range = (1,9)
min(4,9)=4
(4,9)
max(9,10)=10,
(4,10), gap=6, range = (4,10)
min(9,10)=9
(9,10)
max(10,12)=12
(9,12), gap=3, range = (9,12)
min(10,12)=10
(10,12)
max(15,12)=15
(10,15), gap=5, range = (10,15)
min(12,15)=12
(12,15)
max(15,20)=20
(12,20), gap=8, range = (12,20)
min(15,20)=15
(15,20)
max(20,24)=24
(15,24), gap=9, range = (15,24)
min(20,24)=20
(20,24)
max(20,24)=24
(20,24), gap=4, range = (20,24)
here can't move the pointer more to the right
so here is where find ends

so smallest range recoderd was = (20,24)

so when there are k lists insted of mantaing k pointers
we can use min and max heaps to archive the same thing

intially all the zero index elemnt is added in to both the heaps
max elemnt can be found from max heap
when we need to find the min 
    pop min from the heap
    add the next elemnt from coresspoding lsit to min heap

we go untill pop elemnt doesn't have not next index to increase the pointer to
    
so min heap size will be k
max heap size will be n, where n=n1+n2+n3+...+nk ; ni is the length of ith list
so space complexciy will be
S(n1,n2,n3,...nk,k)=O(n + k), where n=n1+n2+n3+....nk

Time complexcity
since for the worst case for same length lsit we may trverse all the elemnts
T(n1,n2,n3,...nk,k)=O(n*(log n + log k)), where n=n1+n2+n3+....nk



"""

"""
test case 1 : 

0 [4,10,15,24,26]
1 [0,9,12,20]
2 [5,18,22,30]

max = [
24,22,20,18,15,12,10,9,5,4,0
]

min = [
20,22,24
]


sm = [5, (5,10)]

(19,24)

"""

class Solution:
    def smallestRange1(self, nums: List[List[int]]) -> List[int]:
        minH = [];
        maxH = [];
        
        # add all zero indexe elemnts 2 heaps
        for i in range(len(nums)):
            minH.append((nums[i][0],(i,0)));
            maxH.append(-1*nums[i][0]);
        
        # heapify
        heapq.heapify(minH);
        heapq.heapify(maxH);
        
        l = minH[0][0]; 
        u = -1*maxH[0];
        
        
        # smallest gap, range
        sm = [math.inf, [l,u]];
        while True:
           
            
            # can we do better : pop from min heap
            mn = heapq.heappop(minH);
            l=mn[0]
            r = mn[1][0];
            c = mn[1][1]
            
            # shift the range to a posible solution
            u = -1*maxH[0];
            # check the range is gap is better
            if u-l < sm[0]:
                sm = [u-l, [l,u]];
            
         
            # if we the list's elements ran out break out
            if c +1 >= len(nums[r]):
                return sm[1];
            # add next elemnts to heaps
            heapq.heappush(minH,(nums[r][c+1],(r,c+1)));
            heapq.heappush(maxH, -1*nums[r][c+1])
            
    def smallestRange(self, nums: List[List[int]]) -> List[int]:
        minH = [];
        maxH = [];
        
        # add all zero indexe elemnts 2 heaps
        for i in range(len(nums)):
            minH.append((nums[i][0],(i,0)));
            maxH.append(-1*nums[i][0]);
        
        # heapify
        heapq.heapify(minH);
        heapq.heapify(maxH);
        
        mx = -1*maxH[0]
        
        l = minH[0][0]; 
        u = -1*maxH[0];
        
        
        # smallest gap, range
        sm = [math.inf, [l,u]];
        while True:
           
            
            # can we do better : pop from min heap
            mn = heapq.heappop(minH);
            l=mn[0]
            r = mn[1][0];
            c = mn[1][1]
            
            # shift the range to a posible solution
            u = mx;
            # check the range is gap is better
            if u-l < sm[0]:
                sm = [u-l, [l,u]];
            
         
            # if we the list's elements ran out break out
            if c +1 >= len(nums[r]):
                return sm[1];
            # add next elemnts to heaps
            heapq.heappush(minH,(nums[r][c+1],(r,c+1)));
            if nums[r][c+1] > mx:
                mx = nums[r][c+1]
                
            
            
"""
imrpoving space complexcity

curretnyl the n size max heap is the party pooper here

but if you think about it if we know the maximum of fisrt k elemnts

and we can trak what values adding to the max heap

we don't need h heap, since we are only intersted in the max value we have seen so far

1. fist using k heap find the max of 1 k elemnts
2.then update it if we meet a greater soultion

new Space complexcity
S(n1,n2,n3,....nk,k)= O(k)

overall:
T(n) = O(n*log k + k) ~ O(nlogk)
S(n,k)= O(k)

""" 
        
        
        
        
        
        
        
