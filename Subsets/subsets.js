/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/*
can be done by divide and concoure/ backtracking

backtracking
-------------
Algorithm propagates to an end to check if it is a solution or not, if it is then returns the solution 
otherwise backtracks to the point one step behind it to find track to the next point to find solution.

super set (all subsets) of [1,2,3] =
subsets of [1,2] with 3 included or not included

eg: subsets of [1,2] = [], [1], [2], [1,2]]
subsets of 3 =
3 not included = [], [1], [2], [1,2],
3 included = [3], [1,3],[2,3], [1,2,3]
so
all subsets = [ [], [1], [2], [1,2], [3], [1,3],[2,3], [1,2,3]]

*/


/*
test case 1: [1,2,3]

f([1,2,3])
 [[[], [1]], [2], [1,2], [[3], [1,3]], [2,3], [1,2,3]]   <= n=3, f([1,2])
          [[[], [1]], [2], [1,2]] <= mn=2, [[], [1]]<=f([1]) 

*/

var subsets1 = function(nums) {
     
    if(nums.length ===1){
        return [[], [nums[0]]];
    }
    
    const n = nums.pop();
    const subs = subsets(nums);
    const len = subs.length;
    for(let i=0; i<len; i++){
        //subs = subs.concat([subs[i].concat(n)]); // this is T-(n+n)
        
        // here using the push is 2 times faster than using concat because the extra work done by concat
        
        // this is T-(n)
        const sub = [...subs[i], n];
        subs.push(sub);
    }
    return subs; 
};

/*
complexcity T
for a recursion call with szie n array
there wil be size 2^n-1 subsets arrray that we have to trverse

total recusrion calls wil be n - (also the depth of the recusssion tree)
so total Time complexcity,
n
n*Σ 2^(n-i) = n*Σ 2^n / 2^i =n*2^n Σ 2^i
i=0

n
Σ 2^i = Σ (1/2)^i = a(1-r^n)/(1-r) = (1-1/2^n)/(1-1/2) = 2(1 -1/2^n) = 2/2^n(2^n -1)

n*Σ 2^n / 2^i = n*2^n *  2/2^n(2^n -1) = n*(2^n+1 - 2) ~ n2^n+1 ~ n2^n

T-O(n*2^n)
S-O(n + 2^n)  ~ S-O(2^n) - n for stack size  which is the depth of the recusrion tree, and the return array sixe will be 2^n

*/

/*
there is another way of slowing this

2n way
-----------
for each elemnt we there are two paths
1. to include the element in the subset
2. not to include the element in the subset

  [1,2,3]
i=

             []
    []                [1]
 []    [2]        [1]     [1,2]
[][3] [2][2,3]  [1][1,3][1,2][1,2,3]



complexcity:
recusrion tree size is 2^n
then for each recusrsin we have to do copy a array max elemnts n
so T-O(n*2^n)
S-O(2^n) 




*/



var subsets = function(nums) {
    const results = []
     
    const subset =[]
    const dfs = function (i) {
        if(i>=nums.length){
            results.push([...subset]); // O(n)
            return;
        }
        // with the element
        subset.push(nums[i]);
        dfs(i+1);

        // without the element
        subset.pop();
        dfs(i+1);
    }
    dfs(0)
    return results;
};