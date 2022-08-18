"""
given a set of N items each having value V with weight W and the total capacity of a knapsack
find the maximal value of fractions of items that can fit into the knapsack.

Examples:
imagin student studying for exam paper week before the exam,
has to prepair for 3 sections 's'.
let the 't' amount of recomended times by the celibus  and 'm' the marks will get for each section.

note he want's to know the maxium marks he can aim if he has only 'c' hours remaing.


Input: s=[A,B,C] t=[20,50,30], m=[60,100,120], c  = 50
Output: 180.00
Explanation: Take the first item and the third item. 
Total value = 60 + 120 = 180 with a total capacity of 20 + 30 = 50

Input: s=[A] t=[30], m=[500] , c = 10
Output: 166.67
Explanation: Since the total capacity of the knapsack is 10, consider one-third of the item.

"""


"""
1st approuch - BruteForce
--------------------------
have to check each subset and pick the maxumum marks

Complexcities
T(n,c) = O((2^n)*n), S(n,c)=O(1), where n=nuber of sections, c=time capacity

2nd approuch - Dynamic-Top/Down or Bottom/Up
--------------------------------------------
same as 1/0, expect, when i<w, add the fraction insted of zero profit.

Complexcities
T(n,c) = O(n*c), S(n,c)=O(n*c)



3rd approuch - Greedy soultion
------------------------------

***Greedy selction process**
even when we select,
best profit per weight item that is with in the the remaning weight of the knapsack
It doesn't provide with optimal soution

*but this selection process would work for fractional kanpsack problem

for 0/1 Knapsack
------------------
**what happens when the ratios are equale
items : [Apple, Orange, Banana, Melon]
Weights: [2, 3, 1, 4 ]
Profits: [4, 5, 3, 8 ]
ratio :   2, 5/3, 3, 2

heap : [(3,(1,3)), (2,(4,8)), (2,(2,4)), (5/3,(3,5))]

pop1 : (3,(1,3)), p=0+3=3 w=5-1=4
pop2 : (2,(4,8)), p=3+8=11 w=4-1=0

since heapq goes to next element once the fisrt keys are equale

Knapsack capacity: 5
ex : 
steps:
1. calculate p/w (profit per weight) and add it to a max heap
2. pop from heap
3. add to the profit if weight of the item can fit in with remaing weight in the sack
4. do this untill knapsack space ran-out or heap is ran out

Complexcity:
T(n,c)=O(n + nlogn)~O(nlogn), S(n,c) = O(n)

"""
import heapq;
def maxProfit(w:list[int], p:list[int], c:int) -> int:
	# initilize the min heap
	n=len(w);
	maxHp = [];
	for i in range(n):
		maxHp.append((-1*p[i]/w[i],(w[i],p[i])));
	heapq.heapify(maxHp);
	mp=0; 
	while c>0 and len(maxHp)>0:
		el = heapq.heappop(maxHp);
		if c >= el[1][0]:
			c-=el[1][0];
			mp+=el[1][1];
		else:
			mp+=-1*el[0]*c;
			c=0;


	return mp;

print(maxProfit([20,50,30],[60,100,120],50));
print(maxProfit([30],[500],10))