/*
You are given two lists of closed intervals, firstList and secondList, 
where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. 
Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are
 either empty or represented as a closed interval. 
 For example, the intersection of [1, 3] and [2, 4] is [2, 3].

Example 1:
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []

Constraints:

    0 <= firstList.length, secondList.length <= 1000
    firstList.length + secondList.length >= 1
    0 <= starti < endi <= 109
    endi < starti+1
    0 <= startj < endj <= 109
    endj < startj+1

*/

/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */

/*
loop through n times with two pointer for two lists

if there is no intersection move i or j based on to the left or right
if there is intersection insert intersection to result
    there is a remning part of second list, update SecondLsit[j] & move i
     there is no remning part, move j
     
complexcity - T-O(n), S-O(n)
n - number of inteval intersections
*/

/*
test case 2:
 [[0,2],[5,10],[13,23],[24,25]]
i                             ^
 [[2,5],[10,12],[23,24],[26,26]]
j                         ^
[[1,2],[5,5], [8,10],[15,23],[24,24],[25,25]]

*/

var intervalIntersection = function(firstList, secondList) {
    let i=0, j=0;
    const results = [];
    while(i< firstList.length && j<secondList.length){
        // if there is no intersection move j
        if(firstList[i][0]>secondList[j][1]){
            j++;
            continue;
        }
            
        if(firstList[i][1] < secondList[j][0]){
            i++;
             continue;
        }
         // if there is intersection insert intersection to result
        if( firstList[i][0]<=secondList[j][1]  && firstList[i][1]>= secondList[j][0]) {
            results.push(
                [
                    Math.max(firstList[i][0], secondList[j][0]),
                    Math.min(firstList[i][1], secondList[j][1])
                ]
            );
            // there is a remning part of second list, update SecondLsit[j] & move i
            if(results[results.length-1][1]<secondList[j][1]){
                // this is not need as we are only deling with hiher bound
                //secondList[j][0]=results[results.length-1][1]
                i++;
            }
             // there is no remning part, move j
            else{
                j++;
            }
        }
       
                
    }
    return results;

};