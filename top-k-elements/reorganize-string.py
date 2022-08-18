"""
Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

Return any possible rearrangement of s or return "" if not possible.

 

Example 1:

Input: s = "aab"
Output: "aba"

Example 2:

Input: s = "aaab"
Output: ""

 

Constraints:

    1 <= s.length <= 500
    s consists of lowercase English letters.


"""


"""
can do with max heap and hashmap

idea: pick most frquent charaters first to arragmnet
**but need to avoid picking the same character consecitivley

step 1 : record counts in a hashmap - T(n,d)=O(n) , S(n,d)=O(d)
step 2 : put 'd' counts to a max heap along with their chcracters - T(n,d)=O(dlogd) , S(n,d)=O(d)
step 3 : ittrate 1:n, append the top to string, decrent count and push back to the heap after poping the next top -         T(n,d)=O(nlogd) , S(n,d)=O(1)
** if the heap is empty before reaching n - return ""

overall complexcities:
T(n,d)=O(nlogd) **worst case- O(nlogn) , S(n,d)=O(2d)

"""

class Solution:
    def reorganizeString(self, s: str) -> str:
        # record counts to a hashmap
        hmap = {}
        for c in s:
            hmap[c]= hmap[c]+1 if c in hmap.keys() else 1;
        # put counts to max-heap
        maxhp = [];
        for k in hmap:
            heapq.heappush(maxhp,(-1*hmap[k],k));
        # ittrate 1:n
        a="";
        prev=None;
        for _ in range(len(s)):
            if len(maxhp) < 1:
                return "";
            curr = heapq.heappop(maxhp);
            if prev != None and -1*prev[0]>0:
                heapq.heappush(maxhp,prev);
            a+=curr[1];
            prev=(curr[0]+1,curr[1])
        return a;
            
            
            
        
