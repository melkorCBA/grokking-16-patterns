import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/*
There is a new alien language that uses the English alphabet.
However, the order among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary, 
where the strings in words are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically
increasing order by the new language's rules. If there is no solution, return "". 

If there are multiple solutions, return any of them.

A string s is lexicographically smaller than a string t if at the first letter where they differ, 
the letter in s comes before the letter in t in the alien language. 

If the first min(s.length, t.length) letters are the same, 
then s is smaller if and only if s.length < t.length.

Example 1:
Given the following words in dictionary,

["wrt","wrf","er","ett","rftt"]

The correct order is: "wertf".
Example 2:
Given the following words in dictionary,

["z","x"]

The correct order is: "zx".
Example 3:
Given the following words in dictionary,

["z","x","z"]

The order is invalid, so return "".
Note:

    You may assume all letters are in lowercase.
    You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
    If the order is invalid, return an empty string.
    There may be multiple valid order of letters, return any one of them is fine.

["wrt","wrf","er","ett","rftt"]

wrt, wrf :
first differ chars are t,f
so t comes before f
t->f

wrf, er :
w comes before e
w->e

er, ett
r comes before t
r->t

ett, rftt : 
e comes before r
e->r

e->r->t->f

oder: ertf

invalid cases:
1st case:
 
["wxy", "wx"]
they have save min length takes precedent in this case

2nd case: graph has a cycle:
["z","x","z"]
z->x
x->z

DFS
----
eg:
a->b->c
^     ^
 \___/

this case for DFS order:
cba
or
cab - this is invalid, b should come before a

but if we do DFS, Post order (first decendent, parent last)
bca
or
cba -0 valid

Time complexcity:
T(n)=O(n+m)
S(n)=O(m+n)
where n=number of words, m=number of distinct chars

steps:
1. create a adjecncy lsit based on words
2. applt post order DFS



*/
class alienDictionary {
	public static void main(String[] args) {
		var sol = new Soultion();
		String[] testcase1 = { "wrt", "wrf", "er", "ett", "rftt" };
		String[] testcase2 = { "z", "x" };
		String[] testcase3 = { "z", "x", "z" };
		String[] testcase4 = { "ba", "bc", "ac", "cab" };
		String[] testcase5 = { "ywx", "wz", "xww", "xz", "zyy", "zwz" };
		String[] testcase6 = { "wzx", "wz", };
		System.out.print(sol.alienOrder(testcase6));
	}
}

class Soultion {
	public String alienOrder(String[] words) {
		Map<Character, Set<Character>> adj = initializeAdj(words);
		if (adj == null)
			return "";
		Set<Character> visted = new HashSet<>();
		var order = new StringBuilder();
		for (char ch : adj.keySet()) {
			if (!postOrderDFS(ch, adj, visted, order)) {
				return "";
			}
		}

		return order.reverse().toString();
	}

	// will return run if there is a length mismatch
	public Map<Character, Set<Character>> initializeAdj(String[] words) {
		Map<Character, Set<Character>> adj = getEmptyMap(words);

		for (int i = 0; i < words.length - 1; i++) {
			String w1 = words[i];
			String w2 = words[i + 1];

			int min = Math.min(w1.length(), w2.length());
			int j;
			for (j = 0; j < min; j++) {

				if (w1.charAt(j) != w2.charAt(j))
					break;
			}
			// length check
			if (j == min && w1.charAt(j - 1) == w2.charAt(j - 1))
				return null;
			var set = adj.get(w1.charAt(j));
			set.add(w2.charAt(j));
			adj.put(w1.charAt(j), set);
		}
		return adj;
	}

	public Map<Character, Set<Character>> getEmptyMap(String[] words) {
		Map<Character, Set<Character>> adj = new HashMap<>();
		for (String word : words) {
			for (int i = 0; i < word.length(); i++) {
				if (adj.get(word.charAt(i)) == null)
					adj.put(word.charAt(i), new HashSet<Character>());
			}
		}
		return adj;
	}

	private Boolean postOrderDFS(char ch, Map<Character, Set<Character>> adj, Set<Character> visted,
			StringBuilder order) {
		// base case 1 : check clready visted - cycle
		if (visted.contains(ch))
			return false;
		// base case 2 : already accounted
		if (adj.get(ch) == null) {
			return true;
		}
		if (adj.get(ch).size() == 0) {
			order.append(ch);
			adj.put(ch, null);
			return true;
		}

		// traverse decendents
		Set<Character> decendents = adj.get(ch);
		// add visted
		visted.add(ch);
		for (var c : decendents) {
			if (!postOrderDFS((char) c, adj, visted, order))
				return false;
		}
		// remove visted
		visted.remove(ch);
		// add the current character to the order
		order.append(ch);
		// diable the connection from adjeecency list
		adj.put(ch, null);
		return true;
	}
}
