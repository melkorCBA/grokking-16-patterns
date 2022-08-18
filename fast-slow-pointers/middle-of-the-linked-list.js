/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */


/*
  [1,2,3,4,5]
cu ^
mi ^
count=1

*/

// vount approuch  T- O(n), S-O(1)
var middleNode1 = function(head) {
    // asuming the list doen't contain loops
    let nodeCount=0;
    let middle=head;
    let currentNode=head;
    
    while(currentNode!==null){
        
        if(++nodeCount%2 === 0){
            middle=middle.next;
        }
        currentNode=currentNode.next;
    }
    return middle;
};

// two pointer approuch -  T- O(n/2), S-O(1)
var middleNode = function(head) {
    
    // any time slow pointer travled ditance is half of fast poniter ditance
    // if list contain no loops, when fast reaches the end, slow will point to the middle
    
    
    let slow=head;
    let fast=head;
    
    while(fast && fast.next){
        slow=slow.next;
        fast=fast.next.next;
    }
    
    return slow;
    
    
}