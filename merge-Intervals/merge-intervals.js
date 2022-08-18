/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

 

Constraints:

    1 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti <= endi <= 104



*/


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */


/*

sort the array based on lowerBounds - T -O(nlogn) S-O(1)


loop thriugh intervals - T-O(n), S-O(1)
i=0
currentIndex=0

previousLower=result[currentIndex][0]
previousUpper=result[currentIndex][1]
currentLower=result[i][0]
currentLower<previousUpper ?
result[currentIndex-1]=[previousLower, max(previousUpper,currentUpper)]
currentIndex++;

overall  T -O(nlogn) S-O(m) m-numbe of merge intervlas


*/

/*
test cases:1
[[1,3],[2,6],[8,10],[15,18]]
                       ^
   
[[1,6], [8,10], [15.18]]
                  ^
test case 2:

[[1,4],[4,5]]
        ^

 [[1,4]]
    ^
*/

var merge = function(intervals) {
    
    intervals = intervals.sort((el1, el2) => el1[0] -el2[0]);
    const results = [];
    
    
    for(let i=0; i<intervals.length; i++){
        if(results.length >0){
            const current = intervals[i];
            const previous = results[results.length-1];
            if(current[0]<=previous[1]){
                results[results.length-1][1]=Math.max(previous[1],current[1])
                continue;
            } 
        }
        
        results.push(intervals[i]);
              
    }
      
    return results;
};