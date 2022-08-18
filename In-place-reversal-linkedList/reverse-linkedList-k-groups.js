/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */


/*
itrative soloution

need to find the number of nodes first - T-O(n), S-O(1)
i=0, j=1
while(j<n/k +1){
    // sub list reverse
    while(i<k*j){
    
    }
}

will use a dummy node to handle the same problem for all ittrations

overall complexcity - T-O(2n), S-O(1)
we can do this from one pass without counting nodes. but still it will O(2n)
*/


/*
tets case :1
[0][1,2,3,4,5], k=2
          ^
n=5
i=4
j=3

j<3
    i<4

current=5
previous=1
leftPre=1



0 -> 2 -> 1 -> 3
4 -> 3 ->  1
1 -> 3 -> 5
1 -> 4
0 -> 2 -> 1 -> 4 -> 3 -> 5

test vase 2:
[1,2,3,4,5], k=3
 ^
n=5
i=0
j=1

j<2
    i<3

current=1
previous=0
leftPre=0


*/

var reverseKGroup1 = function(head, k) {
    // find the number of elements
    let n=0;
    let cNode = head;
    while(cNode){
        n+=1;
        cNode=cNode.next;
    }
 
    let i=0, j=1;
    
    const dummy = new ListNode(0,head);
    let current=head, previous=dummy;
    
    while(j<Math.floor(n/k)+1){
        let leftPre = previous;
        while(i<k*j){
            const next = current.next;
            current.next =previous;
            previous = current;
            current = next;
            i++;
        }
        leftPre.next.next= current;
        const tail = leftPre.next;
        leftPre.next = previous;
        previous = tail;
        j++;
    }
    
    return dummy.next;
};



/*
recursive soltion 

need a extra parameter

this solution currently doen't handle remaning nodes more than one for ruecurrion way

*/
const reverse = function (head, i, k) {
    if(i>1 && (!head || !head.next)){
        return head;
    }
    
    if(i===1){
        head.next = reverse(head.next, k, k);
        return head;
    }
    
    
    const newHead = reverse(head.next, --i, k);
    const rightEnd = head.next.next;
    head.next.next = head;
    head.next = rightEnd;
    return newHead;
    
    
}

var reverseKGroup  = function(head, k) {
    return reverse(head, k, k);
}



