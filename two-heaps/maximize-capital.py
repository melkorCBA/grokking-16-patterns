"""
Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital,
LeetCode would like to work on some projects to increase its capital before the IPO.
Since it has limited resources, it can only finish at most k distinct projects before the IPO. 
Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i] and a minimum 
capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project, you will obtain its pure profit and 
the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital, 
and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.

 

Example 1:

Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.

Example 2:

Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6


Constraints:

    1 <= k <= 105
    0 <= w <= 109
    n == profits.length
    n == capital.length
    1 <= n <= 105
    0 <= profits[i] <= 104
    0 <= capital[i] <= 109


"""

"""
here the question is to find the maximum mony leetcode will get by doing not more than k number of projects
with start statring capital w
eg: k=2, w=0
capital = [0,1,1]
profits = [1,2,3]

if we are to do maximum 2 projects with starting capital =0
after the two projects completed we want to find projects <k 
that will get maxmium proft+capital

w=0
pick 1st project
we get at the end of the project= proft + the capital invested
so the new capital becomes = w+p


why this is greedy
--------------------
when we select a project
1. need to see the project is affordable
2. need to see is this the most profitble project amoung all affordable projects

so for any sub problem we pick the best/optimal soultion (in this the case from the max capital which will get  max profit)
hence this is a greedy algotyhem

so for each project pick
we need to know all the afforble projects and their profits

we we have all the project capitals in a max heap
we can pick max affordable projects based on our current w
since we need to track what profits this capital will get we need to store data in the heap as a tuple
along the way to find max affordable project
we need to mantain our max heap with profits
so when we find the max affordable project
we can say the max profit is in the top of max-heap

overall complexcitis:
T-O(nlog n + klog n), S-O(2*n)~O(n)

"""

"""
test case 1:
k=2
capital = [0,1,1]
profits = [1,2,3]

w=4

cap_min =[]
pri_max = [, -2, -1]

"""

class Solution(object):
    def findMaximizedCapital(self, k, w, profits, capital):
        """
        :type k: int
        :type w: int
        :type profits: List[int]
        :type capital: List[int]
        :rtype: int
        """
        
        cap_min, pro_max = [], [];
        
        # insert all the capitals with index to the heap - T-O(nlog n)
        for i in range(len(capital)):
            heapq.heappush(cap_min,(capital[i], i))
        
        for _ in range(k):
             # since at most k is asked we we found project less than k but with max capital it's ok too
            while(len(cap_min) > 0 and cap_min[0][0]<=w):
                index = heapq.heappop(cap_min)[1]
                heapq.heappush(pro_max, -1*profits[index]);
            # pop the top from profit heap -which will be the most prfitable amoung the current affordable projects
            if len(pro_max) == 0:  # if there is no  affordable projects
                return w;
            w+=-1*heapq.heappop(pro_max);
        return w
                
        
