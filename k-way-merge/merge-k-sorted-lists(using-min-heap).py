"""
Approuch 1:
------------
can use the same approuch used to merge k sorted arrays

use k size min heap for next posiblevalues

steps:
1. insert the heads to a min heap (value as key head ref as 2nd tuple)
2. pop and append the sorted list
3. if there is a node in poped.next push back it to heap

ittrate utill heap is empty

complexcitiy:
 T(n1,n2,n3,....nk, k) = O((n1+n2+n3+....+nk)*logk) ** if n1=n2=n3...=nk=n, O(n*k*logk)
 S(n1,n2,n3,....nk, k) = O((n1+n2+n3+....+nk)+k) ** if n1=n2=n3...=nk=n, O(n*k + k)
 **actual Space complexcity is S(n1,n2,n3,....nk, k)=O(2*(n1+n2+n3+....+nk)) because heap store whole linked lists
"""


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # dummy node
        dummy = ListNode();
        c=dummy;
        # insert heads to min heap
        minh = []
        # this is used becaue heapq is checking next tuple if there are matching heap keys
        # can't let heapq to compare nodes because the strcture has to be same them to compare
        unq = 0; 
        for l in lists:
            if l!=None:
                unq+=1;
                heapq.heappush(minh, (l.val, (unq,l)))
        while len(minh)>0:
            p = heapq.heappop(minh);
            node = p[1][1]
            c.next=node;
            c=c.next;
            if node.next:
                unq+=1;
                heapq.heappush(minh, (node.next.val, (unq,node.next)))
        return dummy.next;
        