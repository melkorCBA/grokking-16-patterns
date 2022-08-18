/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */


/*
Only needed to know wether we can finsh all the courses or not

we can't finsh all the cources if
1.there are two courses like A -> B,  B->A (Grpah has a cycle)
    eg: [[1,0],[0,1]] - False 
2. that's it. Having a disconted graph, still posible to finsh all the courses
    eg: A->B, C->D so If we do A then Can do B, there is no prereq to do C, after do C we can do D. so can do all the courses.
    eg: [[1,0],[3,2]] - true


senario 1
----------

let's say for 3 course, 0,1,2,3
   0
  / ^
 v   \
1 -> 2
     ^
      \
       3

[1,0],[2,1],[0,2],[2,3]
the second index is coverd all the coures
0,1,2,3
in other word every course is a prerequisites, so imposible to complete


senario 2
----------------
let's say for 3 course, 0,1,2,3
   0
  / ^
 v   \
1 -> 2
     \
      v
       3

[1,0],[2,1],[0,2],[3,2]
the first index is coverd all the coures
in other word there is a prerequisit for every course, so can't start any course, so imposible to complete


so if we find, prerequisits, such that at one index is covering all the course
course completion is imposible

if we take sum
0+1+2+3 = 6 = n(n+1)/2, n=4-1

since 0 it there if there


*/

var canFinish = function(numCourses, prerequisites) {
    
};