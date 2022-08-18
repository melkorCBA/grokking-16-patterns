/*
Problem Statement 
A word's generalized abbreviation can be constructed by taking any number of 
non-overlapping substrings and replacing them with their respective lengths. For example,

"abcde" cab be abbreviated into "a3e" ("bcd" in to "3"),
"1bc1" ("a" an d "e" both into "1") and
"23" ("ab" turned into "2" and "cde" turned into "3")

given a string word, return a lsit of all the possible generalized abbreviations pf word.
Return in any order.



Example 1:
Input: "BAT"
Output: "BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"
Example 2:
Input: "code"
Output: "code", "cod1", "co1e", "co2", "c1de", "c1d1", "c2e", "c3", "1ode", "1od1", "1o1e", "1o2", 
"2de", "2d1", "3e", "4"

*/


/*
here non overlapping means can't select substring that are consective
eg: "code"
we can't pick both "c" and "o" and set them as "1" ("11de") because substrings are overlapping

has to ve brute force approuch - dfs
so time complexcity will be T(n) = O(2^n)

for a csrtain abbrivation
a puticular chatater can be in the abb or not

so we can set,
"<the character>" if it;s in abb
"1" if its counted as  a substring

eg for "code"

         /            \
        c              1
     /     \        /      \
    o       1      o        1
   / \     / \    / \      / \
  d   1   d   1   d   1   d   1
 / \ / \ / \ / \ / \ / \ / \ / \
 e 1 e 1 e 1 e 1 e 1 e 1 e 1 e 1


 there will be 2^n abbs
 {code, cod1, co1em co2, c1de, c1d1, c2e c3, 1ode, 1od1, 1o1e, 1o2, 2de, 2d1, 3e, 4}

 need extra parmanter to hold the countof 1s



*/


/*
test case 1 : "code"

results = ["code", "cod1", "cd2", "cd1e" , "c3", "c2e","c1d1", "c1de"]
           dfs(0,'',0)
     dfs(1,'c',0), dfs(1,'',1)


 

    

*/


/*
complexcity:
T(n) = O(2^n+1 -1)~O(2^n)
if we cosider string concatination complxcity this could be T(n)= O(n*2^n)
S(n + 2^n)
here n is numbe rof chracters in the word
*/

const  abbs = function (word){
	const results =[];
	if(word.length === 0) return [];
	const dfs = function(i, sub, count) {
		if(i===word.length){
			if(count){
				sub+=count;
			}
			results.push(sub);
			return;
		}

		// the end of consective substring
		const newSub = count ? sub+count : sub; 
		// include chracter
		dfs(i+1, newSub+word[i], 0);
		// not include charcter
		dfs(i+1, sub, count+1)
	}

	dfs(0,'',0);
	return results;
}

const test_cases = [
{
	input : 'code',
	output : ["code", "cod1", "co1e", "co2", "c1de", "c1d1", "c2e", "c3", "1ode", "1od1", "1o1e", "1o2", "2de", "2d1", "3e", "4"]
},
{
	input : 'BAT',
	output : ["BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"]
},
{
	input : 'today',
	output : ["1o1a1","1o1ay","1o2y","1o3","1od1y","1od2","1oda1","1oday","2d1y","2d2","2da1","2day","3a1","3ay","4y","5","t1d1y","t1d2","t1da1","t1day","t2a1","t2ay","t3y","t4","to1a1","to1ay","to2y","to3","tod1y","tod2","toda1","today"]
},
{
	input : '',
	output : []
}
]
const compareTwoArrays = (ar1, ar2) => {
	return ar1.length ===ar2.length && ar1.every(el1 => ar2.find(el2 => el2 == el1))
}

test_cases.forEach(({input, output}, i) => {
	console.log('--------------------------------- ----------------------------')
	console.log(`test case ${i+1} : ${input}`);
	const result = abbs(input);
	console.log(`output : ${result}`);
	console.log(`expected : ${output}`);
	console.log(`staus : ${compareTwoArrays(result, output) ? 'PASS' : 'FAIL'}`)
	console.log('-------------------------------------------------------------')
	
});

