/*
Problem Statement 
There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. 
Each task can have some prerequisite tasks which need to be completed before it can be scheduled. 
Given the number of tasks and a list of prerequisite pairs, 
write a method to print all possible ordering of tasks meeting all prerequisites.

Example 1:
Input: Tasks=3, Prerequisites=[1, 0], [2, 1]
Output: [0, 1, 2]
Explanation: There is only possible ordering of the tasks.

Example 2:
Input: Tasks=4, Prerequisites=[2, 3], [0, 3], [0, 2], [1, 2]
Output: 
1) [3, 2, 0, 1]
2) [3, 2, 1, 0]
Explanation: There are two possible orderings of the tasks meeting all prerequisites.

Example 3:
Input: Tasks=6, Prerequisites=[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]
Output: 
1) [0, 1, 4, 3, 2, 5]
2) [0, 1, 3, 4, 2, 5]
3) [0, 1, 3, 2, 4, 5]
4) [0, 1, 3, 2, 5, 4]
5) [1, 0, 3, 4, 2, 5]
6) [1, 0, 3, 2, 4, 5]
7) [1, 0, 3, 2, 5, 4]
8) [1, 0, 4, 3, 2, 5]
9) [1, 3, 0, 2, 4, 5]
10) [1, 3, 0, 2, 5, 4]
11) [1, 3, 0, 4, 2, 5]
12) [1, 3, 2, 0, 5, 4]
13) [1, 3, 2, 0, 4, 5]

https://www.youtube.com/watch?v=iN81xT4SX9A
https://www.youtube.com/watch?v=cIBFEhD77b4
*/

class Solution {

	public int[][] findOrders(int numCourses, int[][] prerequisites) {

	}

	private Boolean backTrack(HashMap<Integer, Delement> adj, List<List<Integer>> orderings){
		if(isAllVisited(adj)){
			true;	
		}
		List<Integer> freeVertexes = getAllFreeVertexes(adj);

		if(freeVertexes.size()===0){
			return false;
		}
		int i=freeVertexes.size();
		List<List<Integer>> nworderings = new ArrayList<>();
		while(i>0){
			HashMap<Integer, Delement> tadj = removeVertex(adj, freeVertexes.get(i-1));
			nworderings.add(new ArrayList<>())
			i--;
		}
		

	}
}

class Delement {
	public Set<Integer> dependencies = new HashSet<>();
	public int size=0;
}