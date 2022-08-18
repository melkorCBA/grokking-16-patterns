/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

/*
itteration T-O(n), S-O(1)

need to record 
last left node before the sub list
tail of the reversed list

others are smae as full list reverse

*/


/*
test case : 
[1,2,3,4,5] left = 2, right = 4
         ^
lastPre = 1
reversedLsitTail = 2

4 -> 3 -> 2 -> 1
2 -> 5
1 -> 4
1 -> 4 -> 3 -> 2 -> 5
*/

/*
test case 2:
[1,2] left=1 right= 2
   ^
lastPre = null
reversedLsitTail = 1

2 -> 1 -> null
1 -> null
*/


var reverseBetween1 = function(head, left, right) {
    
    if(!head || !head.next){
        return head;
    }
    
    let i=0;
    const initailHead = head;
    let current = head, previous;
    
    while(i<left-1){
        previous=current;
        current=current.next;
        i++;
    }
    
    const lastPre = previous;
    const newTail = current;
    
    while(i<right){
        const next = current.next;
        current.next = previous;
        previous = current;
        current = next;
         i++;
    }
    
     newTail.next = current;
    
    if(left > 1){
        lastPre.next = previous;
        return initailHead;
        
    }
    return previous;
    
};

/*
recursiive
base conditions
1st reverse start -> left < 1
2nd reverse end right right < 1

the revers lists are retured with non reverse right first node attached to the end
1
v
2 <- 4 -> 3 -> 5
v
3 < 4 -> 5
v
4

so any time 5 (non reverse right first node attached t) can be accses by 
head.next.next

so before assignging head.next.next = head
save it to a avrible ahd set head.next (last node of reversed list) to that value


*/

var reverseBetween = function(head, left, right) {
    if(left > 1 ) {
        head.next = reverseBetween(head.next, --left, --right);
        return head;
    }
    
    if(left <=1 && right > 1){
        const newHead = reverseBetween(head.next, left, --right);
        const rightPost = head.next.next;
        head.next.next = head;
        head.next = rightPost;
        return newHead;
    }
    if(right === 1){
        return head;
    }
}




