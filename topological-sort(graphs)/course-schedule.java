/*
can't finish all courses means graph has a cycle

0->1-> 3
|  |  /
v  v v
2   4

0:[1,2],
1:[3,4],
2:[],
3:[4],
4:[]

DFS
    0
   /\
  1 2
 /\
3 4
|
4

mantain a visted course set

base case 1 : if no pre-req return true
base caee 2 : if the cource in the visited set return false

visit every pre-req cource for specfic cource
after exiting each node, remove the node from visted set

T(n,p)=O(n+p), S(n,p)=O(n+p) where n=num of cource, p=number of pre-req
have to check every pre-req
*/


class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // here ArrayList can't be used because we might want to set index 2 value index 1 is set
        // ArrayList<Integer, ArrayList<Integer>> adjMap = new ArrayList<>();
        
        // populating hashmap
        var adjMap = new HashMap<Integer, List<Integer>>();
        for(var p: prerequisites){
            if(adjMap.get(p[0]) == null){
                adjMap.put(p[0],new ArrayList<>());
            }
            List<Integer> ref = adjMap.get(p[0]);
            ref.add(p[1]);
           
        }
        
        // set for tracking cycles
        Set<Integer> vistedSet = new HashSet<>();
       
        
        // for isolated courses - if all the courses are connected, after adjLsit will be empty after first ittration
        for(int i=0; i<numCourses; i++){
            if(!dfs(i,adjMap,vistedSet))
                return false;
           
        } 
        return true;
        
    }
    
    private boolean dfs(int course, Map<Integer, List<Integer>> map, Set<Integer> set){
        // this for the edge case of 0 course is not in the preReqs (isolated)
        if(set.contains(course)){
            return false;
        }
        if(map.get(course) == null || map.get(course).isEmpty()){
            return true;
        }
        // add to set
        set.add(course);
        for(var p:  map.get(course)){
            if(!dfs(p, map, set)){
                return false;
            }
        }
        
        // remove from the set
        set.remove(course);
        // empty preReqs
        map.put(course, null);
        return true;
        
    }
}