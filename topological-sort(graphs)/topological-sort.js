/*
Problem Statement 
Topological Sort of a directed graph (a graph with unidirectional edges) is a linear ordering 
of its vertices such that for every directed edge (U, V) from vertex U to vertex V, U comes before V in the ordering.
Given a directed graph, find the topological ordering of its vertices.

Example 1:
Input: Vertices=4, Edges=[3, 2], [3, 0], [2, 0], [2, 1]
Output: Following are the two valid topological sorts for the given graph:                                                                                                                                                                                                                                           
1) 3, 2, 0, 1
2) 3, 2, 1, 0

Example 2:
Input: Vertices=5, Edges=[4, 2], [4, 3], [2, 0], [2, 1], [3, 1]
Output: Following are all valid topological sorts for the given graph:
1) 4, 2, 3, 0, 1
2) 4, 3, 2, 0, 1
3) 4, 3, 2, 1, 0
4) 4, 2, 3, 1, 0
5) 4, 2, 0, 3, 1

Example 3:
Input: Vertices=7, Edges=[6, 4], [6, 2], [5, 3], [5, 4], [3, 0], [3, 1], [3, 2], [4, 1]
Output: Following are all valid topological sorts for the given graph:
1) 5, 6, 3, 4, 0, 1, 2
2) 6, 5, 3, 4, 0, 1, 2
3) 5, 6, 4, 3, 0, 2, 1
4) 6, 5, 4, 3, 0, 1, 2
5) 5, 6, 3, 4, 0, 2, 1
6) 5, 6, 3, 4, 1, 2, 0
 
There are other valid topological ordering of the graph too.


*/

/*
A topological sort must be carried out on a directed graph with no cycles.

steps:
1.create a adjcent matrix
2.find the vertex with no succerssor
3.delete the vertex from graph (adjMat) and insert to sorted array (bottom to top insert)
4.repeat from 2 untill all the vertex agre gone, adj has not connections


*/

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