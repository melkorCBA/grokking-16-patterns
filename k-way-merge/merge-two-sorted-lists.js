/*
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:

Input: list1 = [], list2 = []
Output: []

Example 3:

Input: list1 = [], list2 = [0]
Output: [0]

 

Constraints:

    The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order.


*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */


/*
in-place approuch two heads as poniters

go untill h1 is null => h1.next

if h1<=h2 => h1=h1.next
else
    tmp=h1.next
    h1=h2
    h2=tmp
    h1=h1.next

if h1 null but h2 not null
h1=h2

** nee to track the sorted head in a varible


complexcity
T(n1,n2) = O(n1+n2), T(n1+n2)=O(1)


*/


/*
test case 1: list1 = [1,2,4], list2 = [1,3,4]
h=1->

h= 1->1->2->3->4

h1= 
h2= 4
prev= 4

temp= 4

2->4



*/

var mergeTwoLists = function(list1, list2) {
    // edge cases
    if (!list1) return list2;
    if (!list2)  return list1;
    
    let h1=list1, h2=list2;
    let h = h1.val <= h2.val ? h1 : h2;   
    let prev;
    while(h1){
        // swap heads
        if(h1.val > h2.val) {
            if(!prev){
              // starting node swap
              [h1,h2]=[h2,h1]
            }
            else{
                prev.next=h2;
                h2=h1;
                h1=prev.next;   
            }
                 
        };
        prev=h1;
        h1=h1.next;
    }
    // any remaining nodes will be appended (can guarantee h1 will run out first)
    if(h2){
        prev.next=h2;
    }
    
    return h;
};















