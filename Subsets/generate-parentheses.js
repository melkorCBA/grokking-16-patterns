/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:

Input: n = 1
Output: ["()"]

 

Constraints:

    1 <= n <= 8



*/

/**
 * @param {number} n
 * @return {string[]}
 */

/*
total numbser of open and close parantesis = 2n

for each postion for a cobination we have two decesions
1.place a open paranthese
2. place a close one

for any given time if close parnathsis count is large than open count the cureent path/combination can'tbe valid



           /             \
          (               ) 
   /             \         x
  (               )
 / \            /  \
(   )          (    )    
|  / \        / \    x
( (   )      (   ) 
| |  /\      |   /\   
( ) (  )     )  ( )
| | \  x    |   | x
( ) )       )   )
1 2 3       4   5

[((())), (()()), (())(), ()(()), ()()()]

complexcity
T(n) = O(2^n) alomst O(1) for string concat // more accurtly T(n) = O(4^n /sqrt(n)) but we can say less than O(2^n)
S(n) = O(2n + 2n) ~ O(n) // more accurtly S(n) = O(4^n /sqrt(n) + n)



 

*/


/*
test case : 1
n=3
c=['((()))', '(()())', (())()', '()(())', '()()()']
dfs(0.0,'')
dfs(1,0,'(') dfs(0,1,')')<=return

      dfs(1,0,'(')
dfs(2,0,'(('), dfs(1,1, '()')

     dfs(1,1, '()')
dfs(2,1, '()('),dfs(1,2, '())')<=return

     dfs(2,1, '()(')
dfs(3,1, '()(('), dfs(2,2, '()()')


     dfs(2,2, '()()')
dfs(3,2, '()()('), dfs(2,3, '()())')<=return

     dfs(3,2, '()()(')
     dfs(3,3, '()()()')







   


*/

var generateParenthesis = function(n) {
    const combinations = [];
    const dfs = function (open, close, p){
        
        if(close>open) return; // vailation path
        if(open === n && close === n){
            combinations.push(p);
            return;
        }
        if(open<n) dfs(open+1, close, p+'('); // concatnantion T(n) could be n but with js it;s amost O(1) because of string ropes
        if(close<n) dfs(open, close+1, p+')');
        
    }
    dfs(0,0,'');
    return combinations;
};