/*
Given two integer arrays to represent weights and profits of ‘N’ items, 
we need to find a subset of these items which will give us maximum profit 
such that their cumulative weight is not more than a given number ‘C

example 1:
items : [Apple, Orange, Banana, Melon]
Weights: [2, 3, 1, 4 ]
Profits: [4, 5, 3, 7 ]
Knapsack capacity: 5

output : (max profit) = 10

*/

/*
1st way -brute force
-------------------------
in each item we can decide 
1. include
2. not include
the item to our knapsack

we can only add item up to our knapsack capacity
and can't item twise

           A
        /      \
       Y        N
      B          B
     /\         / \
    Y  N       Y   N
   C    C     C     C
  / \  / \   / \   / \
 Y  N  Y  N  Y  N  Y  N
 D  D  D  D  D  D  D  D
 /\ /\ /\ /\ /\ /\ /\ /\
 YN YN YN YN YN YN YN YN

 complexcity: T(n)=O(2^n), S(n)=O(n), where n=number of items


Greedy soultion - Why it doesn't work
-----------
at fisrt glance
-------------------
for every pick for adding item for out knapSack,
we pick most light weight, and profitbale
item that is affordble

so if we use h min heap, key
elements as (weight, -1*profit)

the top element will be 
most light weight, and profitable item



*****but ??????
what abount this
w =[2,3,5]
p= [4,9,32]
c=5

so, according to this, w will pick (2,4) and (3,9) because there are most light weight
but the most priftable is (5,32)

even if we pick the most prfitbale first, this won't work

the reason why greedy methode doen't give us optimal soultion is,
the way of selecting optimal soultion for sub problem in not optimal

***Greedy selction process**
even when we select,
best profit per weight item that is with in the the remaning weight of the knapsack
It doesn't provide with optimal soution

w:  [2,  3,  1,  4 ]
p:  [4,  5,  3,  7 ]
p/w:[2, 1.6, 3, 1.7]

so the (1,3) and (2,4) will be picked where profit = 7 which isn't the optimal soultion (10)

*but this selection process would work for fractional kanpsack problem**

more on this please look at 01-knapsack-greedy.py

*/

// 1 brute force way
const maxProfit = function (items,weights,profits,capacity) {
	const maxProfitRec = function (items,weights,profits,c,w,p,i) {
		if(w>c) return 0;
		if(i>=items.length) return p;

		const withItem = maxProfitRec(items,weights,profits,c,w+(weights[i+1]?? 0),p+(profits[i+1] ?? 0), i+1);
		const withoutItem = maxProfitRec(items,weights,profits,c,w,p,i+1);
		return Math.max(withItem,withoutItem)
	}
	return maxProfitRec(items,weights,profits,capacity,0,0,-1);
}

const maxProfit2 = function (items,weights,profits,capacity) {
	const maxProfitRec = function (items,weights,profits,c,i) {
		if(c===0) return 0;
		if(i===items.length) return 0;

		const withItem = c-weights[i] >= 0 ? profits[i] + maxProfitRec(items,weights,profits,c-weights[i], i+1) : 0;
		const withoutItem = maxProfitRec(items,weights,profits,c,i+1);
		return Math.max(withItem,withoutItem)
	}
	return maxProfitRec(items,weights,profits,capacity,0);
}




// #Top-down Dynamic Programming with Memoization#
//..................................................

/*
if we remember the all the soultions found and the recusrion calls, only i,c changing
 we won't have recusrions calls n*knapSack capacity = n*C, since i = {0,...n},

so the T(n,C)= O(n*C)
S(n,C)= O(n + n*C)= O(n*C) 

*/

const isCalculated = (mem,c,i) =>  {
	return mem[c][i];
}

const maxProfitWithTopDownDynamicMem = function (items,weights,profits,capacity){
	const n = items.length;
	const c = capacity;
	const mem = [...Array(c+1)].map(e=>[...Array(n+1)].map(e=>null));

	const maxProfitRec = function (items,weights,profits,c,i) {
		if(c===0) return 0;
		if(i===items.length) return 0;

		const withItem = c-weights[i] >= 0 ? profits[i] + (isCalculated(mem,c-weights[i],i+1) ?? maxProfitRec(items,weights,profits,c-weights[i], i+1)) : 0;
		const withoutItem = isCalculated(mem,c,i+1) ?? maxProfitRec(items,weights,profits,c,i+1);
		mem[c][i] = Math.max(withItem,withoutItem);
		return mem[c][i];
	}
	return maxProfitRec(items,weights,profits,capacity,0);
}





// #Bottm-up Dynamic Programming with Memoization#
//..................................................

/*
lets define something called, dp[i][j] where,

dp[i][j] is the maxiumu profit that can make, with size j knapsack and total number of i elements

our goal is to find the dp[i][c] such when i=n and j=c

so we have some how created the matrix dp with ixc
the maximum profit will be in the last row, last column

let's take an example,

Items : [A,B,C,D]
Weights: [2,3,1,4]
Profits: [4,5,3,7]
capacity: 5
               sack capacity
               0 1 2 3 4 5
(0,0) n   i  0|0|0|0|0|0|0|
(2,4) u o t  1|0| | | | | |
(3,5) m f e  2|0| | | | | |
(1,3) b   m  3|0| | | | | |
(4,7) r   s  4|0| | | | | |

since there can't be any profit without zero items in the kanpsack, dp[i][0]=0
also there can't be any profit without a empty sack, so dp[0][j]=0

now let's fill the remaning items

i=1,j=1, dp[1][1] ?

dp[1][1] means the the maximum profit we can have if we have a size 1 kanpsack and only 1 item
since the weight, profit pairs are not sorted to weight acending order, we can't acctually say
dp[1,1] is infact the maximum profit we can have if we have a size 1 kanpsack and only 1 item 
(in this case it would be the (1,3) pair which we are not yet looked at).

because the having one item we are only condsidering the (2,4) elements
but if had this sorted we can garantee that every dp[i][j] is max a profits

but even these are not sorted we can still garantee our answer, maximum profit will be in the last row, last column.
that is because at the end we have considered all the elements that are availble.

now, since 
dp[1][1] means the the maximum profit we can have if we have a size 1 kanpsack and only 1 item
dp[1][1] = max(max profit inclueding the element (2,4), max profit excluding the element)

max profit excluding the element  =  max profit of having i-1 number of elements with a j capacity sack = dp[i-1][j]
(i number of element)

max profit inclueding the element (2,4) = if i elements weight > than the capacity -> max profit excluding the element= dp[i-1][j]
										  else: profit from i'th element + max profit of i-1 elements with remaning 
										  weight as the capacity
										 = if w > j => dp[i-1][j]
										   else => p+dp[i-1][j-w]

so dp[1][1] = max((w > j ?  dp[i-1][j] : p+dp[i-1][j-w]), dp[i-1][j]) = dp[i-1][j] = d[0][1]=0

the complexcity
T(n,c)=O(n*c)
S(n,c) = O(n*c)


steps 1 : initilize matrix with n+1xc+1 all elements initlaized to zero
setp 2 : outer loop from i=1 untill i<=n, inner loop from j=1 untill j<=c
dp[i,j]= max((w[i-1] > j ?  dp[i-1][j] : (p[i-1] + dp[i-1][j-w])), dp[i-1][j])
step 3 : return dp[n][c]

*/


const maxProfitWithBottomUpDynamicMem = function (items,w,p,c){
	// initilize the dp table
	const n= items.length;
	const dp = [...Array(n+1)].map(e=>[...Array(c+1)].map(e=>0));

	for(let i=1; i<=n; i++){
		for(let j=1; j<=c; j++){
			dp[i][j]= Math.max(
				(w[i-1] > j ?  dp[i-1][j] : (p[i-1] + dp[i-1][j-w[i-1]]))
				,dp[i-1][j]
			);
		}
	}
	console.log(dp)
	return dp[n][c];
}



console.log(maxProfitWithBottomUpDynamicMem(['Apple','Orange','Banana','Melon'],[2,3,1,4],[4,5,3,7],5))