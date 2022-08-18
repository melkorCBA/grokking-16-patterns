/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:

Input: lists = []
Output: []

Example 3:

Input: lists = [[]]
Output: []

 

Constraints:

    k == lists.length
    0 <= k <= 104
    0 <= lists[i].length <= 500
    -104 <= lists[i][j] <= 104
    lists[i] is sorted in ascending order.
    The sum of lists[i].length will not exceed 104.


*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */


/*

can use the same approuch that uses in merge sort

eg: 8 lists
         8
      /      \
     4       4
   /  \    /  \
  2   2   2   2
 /\  /\  /\  /\
1 1 1 1 1 1 1 1

then merge 2 at a time
total merges = 2^logn -1 = 8-1 = 7 =  n-1
complexcityies:
T(n,k)=O(n*k*logk), S(n,k) = O(n*k + logk)
* assuming every list has n elemnts and, number of lists are k

steps: Recsrive

base -> if number of lists are 1 return that list

find the middle = (left+right)/2
mergeLeft = merge(arr,left, m);
mergeright = merge(arr,m+1, right)
return merge2Lists(mergeLeft, mergeRight) <= new head


*/


var mergeKLists = function(lists) {
   
    const merge = (arrs, left, right) =>{
        if(right<=left) return arrs[left] ?? null;  // edge case when list is empty (right will be -1 )
        const m = Math.floor((left+right)/2);
        const leftH = merge(arrs,left,m);
        const rightH = merge(arrs,m+1,right);
        return merge2Lists(leftH,rightH);
    } 
    
    return merge(lists,0,lists.length-1);
          
};

function merge2Lists (a,b) {
   const dummy = new ListNode();
    let c = dummy;
    
    let left = a, right=b;
    while(left && right){
        if(left.val <= right.val){
            c.next=left;
            left=left.next;
        }
        else{
            c.next= right;
            right=right.next;
        }
        c=c.next;
    }
    if(left){
        c.next=left;
    }
 
    if(right){
        c.next=right;
    }
    return dummy.next;
}
