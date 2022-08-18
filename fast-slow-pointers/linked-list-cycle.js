/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

/*

two pointer,
slow=head
fast=head

move slow by one
move fast by two nodes

if there is a cycle slow and fast will eventually be equle
if there is no cycle fast wil be null

Complexcities - T-O(n-1)~O(n), S-O(1)
we can also do this with T-O(n), S-O(n) using a hash map
*/

var hasCycle = function(head) {
    // no node or one node
    if(!head||!head.next){
        return false;
    }
    
    let slow=head;
    let fast=head;
    while(fast && fast.next){
        slow=slow.next;
        fast=fast.next.next;
        if(slow===fast){
            return true;
        }
    }
    return false;
    
    
    
};