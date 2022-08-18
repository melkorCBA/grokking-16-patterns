/*
Given an array of meeting time intervals consisting 
of start and end times [[s1,e1],[s2,e2],...] (si < ei), 
determine if a person could attend all meetings.

Example 1:
Input: [[0,30],[5,10],[15,20]]
Output: false

Example 2:
Input:
Input:[[7,10],[2,4]]
Output: true

need to sort - T-O(nlogn)
loop thriugh intervals - T-O(n)
 have to record the previos start and end time
 if either
 priviosEnd <= currentStart or previosStart >= currentEnd => no confilct
 other wise conflic = > return false

 overall complexcicty - T-O(nlogn)

*/

/*
[[2,4], [6,8], [7,10]]
                ^

[6,8]
*/

const canAttendMeetings = (intervals) => {
	intervals = intervals.sort((el1, el2) => el1[0]-el2[0]);
	let previousInterval;
	for(let i=0; i<intervals.length; i++){
		if(i>0 && previousInterval[0] < intervals[i][1] &&  previousInterval[1] > intervals[i][0]){
			return false;
		}
		previousInterval=intervals[i];
	}
	return true;
}

console.log(`test case 1: [[0,30],[5,10],[15,20]], Expected: false, Actual: ${canAttendMeetings([[0,30],[5,10],[15,20]])}`);
console.log(`[[7,10],[2,4]], Expected: true, Actual: ${canAttendMeetings([[7,10],[2,4]])}`);
console.log(`[[7,10],[2,4], [6,8]], Expected: false, Actual: ${canAttendMeetings([[7,10],[2,4],[6,8]])}`);
