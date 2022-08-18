"""
one way of solving this is to record the counts of elements in a hash map - T(n,k) = O(n), S(n,k)=O(n)
then insert all elemnts to a min heap of k seiz - T(n,k)=O(nlogk), S(n,k)=O(k)
pop k re;emnts = T(klogk)

overall T(n,k)=O(n + nlogk + klogk) = O(nlogk), S(n,k)=O(n+k)

"""


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        hm = {}
        for num in nums:
            hm[num]=  hm[num]+1 if hm.get(num)  else 1;
        minHeap = [];
        for key in hm:
            if len(minHeap) < k:
                heapq.heappush(minHeap, (hm[key], key));
                continue;
            if(hm[key] > minHeap[0][0]):
                heapq.heappop(minHeap);
                heapq.heappush(minHeap, (hm[key], key));
        results = []
        for i in minHeap:
            results.append(i[1])
        return results;
  

"""