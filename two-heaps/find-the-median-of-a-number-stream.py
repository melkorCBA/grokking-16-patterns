# The median is the middle value in an ordered integer list. If the size of the list is even, 
#there is no middle value and the median is the mean of the two middle values.
# 
#     For example, for arr = [2,3,4], the median is 3.
#     For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
# 
# Implement the MedianFinder class:
# 
#     MedianFinder() initializes the MedianFinder object.
#     void addNum(int num) adds the integer num from the data stream to the data structure.
#     double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
# 
#  
# 
# Example 1:
# 
# Input
# ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
# [[], [1], [2], [], [3], []]
# Output
# [null, null, null, 1.5, null, 2.0]
# 
# Explanation
# MedianFinder medianFinder = new MedianFinder();
# medianFinder.addNum(1);    // arr = [1]
# medianFinder.addNum(2);    // arr = [1, 2]
# medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
# medianFinder.addNum(3);    // arr[1, 2, 3]
# medianFinder.findMedian(); // return 2.0

# this could be done if we use an orderd array
# but insertion of ordered array in T-O(n)
# if we use one odered array for this problem we don't need deletion (which is also T-O(n))
# finding medain will be T-O(1)

# if we use one heap insertion will be T-O(log n)
# finding the medium will not be posisble without n or n/2 pops

# if we use two heaps,
# one max heap for smaller numbers
# 2nd heap, min heap for larger number
# any given time,
# if number of elements is even
# median will be (top of small-max heap+top of large-min heap)/2
# if even the large heap top will be the median
# hence finding median will be T-O(l)
# overall complexcity will be T-O(log n) S-O(n)




class MedianFinder(object):

    def __init__(self):
        # max heap
        self.small = [];
        # min heap
        self.large = [];

    def addNum(self, num):
        """
        :type num: int
        :rtype: None
        """
        
        heapq.heappush(self.small, -1*num);
        # check the max of small is larger than min of large
        if self.small and self.large and (-1*self.small[0]) > self.large[0]:
            el = -1*heapq.heappop(self.small);
            heapq.heappush(self.large,el);
        
        # check the lengths are aprox equal
        if abs(len(self.small) - len(self.large)) > 1:
            mx = max(len(self.small), len(self.large));
            if len(self.small) == mx:
                val=-1*heapq.heappop(self.small);
                heapq.heappush(self.large,val);
            else:
                val=heapq.heappop(self.large);
                heapq.heappush(self.small, -1*val);
        
        

    def findMedian(self):
        """
        :rtype: float
        """
        # if lengths are equal
        if len(self.small) == len(self.large):
            return (-1*self.small[0] + self.large[0])/2.0;
        elif(len(self.small) > len(self.large)):
            return -1*self.small[0];
        else:
            return self.large[0];
                
        


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()

# Follow up: (Reference: Solutions to follow-ups)

    # If all integer numbers from the stream are between 0 and 100, how would you optimize it?

    # We can maintain an integer array of length 100 to store the count of each number along with a total count. 
    # Then, we can iterate over the array to find the middle value to get our median. Time and space complexity would be O(100) = O(1).


    # If 99% of all integer numbers from the stream are between 0 and 100, how would you optimize it?

    # In this case, we can keep a counter for lessThanHundred and greaterThanHundred. 
    # As we know the solution will be definitely in 0-100 we don’t need to know those number 
    # which are >100 or <0, only count of them will be enough.
