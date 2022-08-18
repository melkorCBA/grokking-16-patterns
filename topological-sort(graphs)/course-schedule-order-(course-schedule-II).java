/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates 
that you must take course bi first if you want to take course ai.

    For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, 
return any of them. If it is impossible to finish all courses, return an empty array.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0.
So the correct course order is [0,1].

Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have 
finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]

 

Constraints:

    1 <= numCourses <= 2000
    0 <= prerequisites.length <= numCourses * (numCourses - 1)
    prerequisites[i].length == 2
    0 <= ai, bi < numCourses
    ai != bi
    All the pairs [ai, bi] are distinct.



*/

/*
same as course schedule I
we will mantain extra array to store the order

if adjLsit is empty =>  add to the list
after dfs end for each course, add to lsit
if there is any cycle return empty lsit

T(n,p)=O(n+p), S(n,p)=O((n+p)+(n)+(n))~O(3n+p)

*/


class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<Integer> [] adj = initAdj(prerequisites,numCourses);
        Set<Integer> visited = new HashSet<Integer>();
        List<Integer> order = new ArrayList<Integer>();
       
        for(int i=0; i<numCourses; i++){
            if(!dfs(i,adj,visited,order))
                return new int[0];
        }
        // ArrayList to Array Conversion
        return order.stream().mapToInt(i -> i).toArray();
    }
    
    private List<Integer> [] initAdj(int[][] prerequisites, int numCourses){
    	//List<Intger> [] adj = new ArrayList<Integer>[numCourses];
    	// this type of genric array can't be created
        List [] adj = new ArrayList[numCourses];
        for(int i=0; i<numCourses; i++){
            adj[i]= new ArrayList<>();
        }
        for(var p:prerequisites){
            adj[p[0]].add(p[1]);
        }
        return adj;
    }
    
    private boolean dfs(int course, List<Integer> [] adj, Set<Integer> visited, List<Integer> order){
        if(visited.contains(course))
            return false;
        
        if(adj[course] == null){
            return true;
        }
        
        if(adj[course].isEmpty()){    
            order.add(course);
            adj[course]=null;
            return true;
        }
           
        
        // add to visted
        visited.add(course);
        for(var p: adj[course]){
            if(!dfs(p,adj,visited,order)){
                return false;
            }
        }
        // remove visted
        visited.remove(course);
        // set course pre-reqs null and add to order
        order.add(course);
        adj[course]=null;
        return true;
        
    }
}