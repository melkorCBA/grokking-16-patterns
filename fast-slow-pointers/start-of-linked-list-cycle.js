/*
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously
 following the next pointer. Internally, pos is used to denote the index of the node 
 that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. 

 Note that pos is not passed as a parameter.

Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/*

lenght of the cycle
----------------------
once we detect a cycle by moving the slow pointer untill get them same adress we can find the length of the nodes in the cycle


now if we start two poniters 
1st beging of the list
2nd having a gap lenght of the cycle from 1st poniter

the should meet at the beging of the cycle

|----L-----|
1--x--2
-----------
       --    --
      --   D  --
      --      --
        -- --
D = length of the cycle
x= gap between 1 and 2
L = distance from start to begning of the cycle

since moving in same speed, for same time frame => travled distance should be same

so if the meet at the start of the cycle
1's didtance = L
2's distance = L-x + D

L=L-x+D
x=D
 
steps
-----
1.find if list has a cycle
2.find the lenght of the cycle
3.find the node they meet again from start

complexcity T-O(n) worst case T-O(2n) , S-O(1)

*/

/*
test cases 1
Input: head = [3,2,0,-4], pos = 1

3,2,0,-4
       ^
       ^
currentSlow=3

3,2,0,-4
  ^
  ^
*/

/*
second explanation
-------------------------
|----L-----|
-----------
       --    --
      --   D  --
      --      -- x
        -- --
        
L=from start to begning of the cycle
D=cycle length
x=distance from starting point of the cycle to meeting point

when we have fast and slow pointer

F=distance trabled by fast pointer
S=distance trabled by slow pointer

F=L+x + kf*D, kf= numer of cycles by f
S=L+x + ks*D kf= numer of cycles by s

F=2S
L + x + Dk1 = 2(L + x + Dk2)
L +  x = (2ks-kf)D
L=(2ks-kf)D - x

** D-x = is the distanc left for slow poniter to complete the circle (come to the starting point of the circle)

for L = {D-x, 2D-x, 3D-x, ...}
so we can say
if we have two poniter traveling one node at a time
1.left poniter at the begning point
2. right pinter at the meeting place of slow and fast pointer

they will meet at the begning og the circle 

*/

var detectCycle1 = function(head) {
    
    if(!head || !head.next){
        return null;
    }
    
    let slow=head;
    let fast=head
    let cycleLength = 0;
    while(fast && fast.next){
        slow=slow.next;
        fast=fast.next.next;
        if(slow===fast){
            // find the lenght of the cycle
            const currentSlow=slow;
            while(true){
                slow=slow.next;
                cycleLength++;
                if(currentSlow=== slow){
                    break;
                }
            }
            break;
        }
    }
    
    if(cycleLength===0){
        return null;
    }
        
    // find the cycle start node
    let left=head;
    let right=head;
    while(cycleLength>0){
        right=right.next;
        cycleLength--;
    }
    
    while(left!==right){
        left=left.next;
        right=right.next
    }
    
    return left;
        
     
        
};

// second explanation soloution

var detectCycle = function(head) {
    
    if(!head || !head.next){
        return null;
    }
    
    let slow=head;
    let fast=head
    let cycleLength = 0;
    while(fast && fast.next){
        slow=slow.next;
        fast=fast.next.next;
        if(slow===fast){
            // starting from head find the node, equal to slow
            let start=head;
            while(slow!==start){
                slow=slow.next;
                start=start.next; 
            }
            return start;
        }
    }
    
    
        
    
    return null;
        
     
        
};


