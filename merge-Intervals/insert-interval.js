/*
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

 

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:

    0 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti <= endi <= 105
    intervals is sorted by starti in ascending order.
    newInterval.length == 2
    0 <= start <= end <= 105



*/


/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

/*
Step 1 
--------
Find the index to insert using binary search - find a index <= new lower bound
T - O(logn)

Step 2 - check need to merge with lower
----------------------------------
intervals[index[1]] =< new[0]
Merge intervals[index[1]]=Max(intervals[index[1]],new[1])
previous = intervals[index]


If no merge set privios= new


Step 3 check need to merge with upper
------------------------------------
intervals[index+1][0] <= previous[1]
intervals[index]= Max()

Need to insret or delete at the end if needed

** but this way inserting and deleting to a sorted array is T-O(n)

so in the end it endded up up T-O(n) with complex code

*/


/*
better approuch

traverse the array n times 



*/

/*
test case 1 : [[1,3],[6,9]] , newInterval = [2,5]
[[1,3],[6,9]] 
         ^

results= [[1,5], [2,5]]


test case 2 : [[1,3],[6,9]] , newInterval = [4,5]

*/


var insert = function(intervals, newInterval) {
    
   const results = [];
    
    for(let i=0; i< intervals.length; i++){
        if(newInterval[1]<intervals[i][0]){
            results.push(newInterval);
            return results.concat(intervals.slice(i, intervals.length));
        }
        else if(newInterval[0] > intervals[i][1]){
            results.push(intervals[i]);
        }
        else {
            // overlapping
            newInterval = [Math.min(newInterval[0], intervals[i][0]), Math.max(newInterval[1], intervals[i][1])];
        }
    }
    
    results.push(newInterval);
    return results;
    
   
}
       
       
       