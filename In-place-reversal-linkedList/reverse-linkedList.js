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
ittrative - T-O(n), S-O(1)

need 2 pointers and a variable
previous node
currentNode

next node


ittration
nextNode = currentNode.next
currentNode.next = previousNode
previousNode= currentNode
currentNode = nextNode

*/

/*
recursion - T-O(n) S-O(n)

case : 1
list with no nodes =>  return the head
list with one node => return the head

case : 2
list with 2 nodes

1 -> 2

list with no nodes =>  return the head
list with one node => return the head

newHead = head.next
head.next.next = head
head.next = null
return newHead


case : 3
list with more than 2 nodes

ist with no nodes =>  return the head
list with one node => return the head

newHead= reverse(head.next);
head.next.next = head
head.next = null
return newHead


fisrt need to traval to current tale
then revers 1 by 1 from the tail

why T-O(n) ?
number of function calls - max number of nodes in the recurrion tree = n

why S-O(n) ?
maximum stack size needed - depth of the recursison tree = n


*/




/*
test case : 1
[1,2,3,4,5]
   ^
5 -> 4 -> 3 -> 2 -> 1 -> null


pre = 5 
cu = null

next = null


*/

var reverseList1 = function(head) {
    let previousNode = null;
    let currentNode = head;
    
    while(currentNode){
        const nextNode = currentNode.next;
        currentNode.next = previousNode;
        previousNode=currentNode;
        currentNode=nextNode;
    }
    
    return previousNode;
};



var reverseList = function(head) {
    if(!head || !head.next){
        return head
    }
    
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
