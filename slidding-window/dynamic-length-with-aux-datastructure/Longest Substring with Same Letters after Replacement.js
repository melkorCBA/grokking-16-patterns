 /*
 Longest Repeating Character Replacement
 ----------------------------------------
 You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:

Input: s = "ABAB", k = 2
Output: 4

ABABC k=2
    ^
 ^

key= character, vlaue = counts
map : {
	A:1
}

#charsToReplace=lengthOfCurrentString - maxCount <= k - grow window
else = shrink window utill above condtion is met

T-O(26n)~O(n)
S O(n+26)~O(n)

ABAB
   ^
^

maxlength = 2
 */

var characterReplacement = function(s, k) {
    let wEnd=0;
    let wStart=0;
    const map = new Map();
    const currentLength = () => wEnd -wStart +1;
    let maxLength = 0;
    const maxCount = () => {
    	const enumerator = map.values();
    	let max = 0;
    	while(true){
    		const {value, done} = enumerator.next();
    		if(done){
    			break;
    		}
    		max = Math.max(max, value);
    	}
    	return max;
    }
    const numberOfCharsToBeReplaced = () => currentLength() - maxCount();

    for(let ch of s){
    	// adding to map
    	const currentCount = map.get(ch);
    	if(!currentCount){
    		map.set(ch,1)
    	}else{
    		map.set(ch, currentCount+1);
    	}
    	
    	if(numberOfCharsToBeReplaced() <= k){
    		maxLength = Math.max(maxLength, currentLength());
    	}
    	
    	while(numberOfCharsToBeReplaced() > k){
    		// decrement the count
    		map.set(s[wStart], map.get(s[wStart])-1)
    		// decrement wStart
    		wStart++;

    	}

    	wEnd++;
    }

    return maxLength;
};


/*
improving the complexcity from O(26n) to O(n)

if we mantain max counts in hashmap when inserting, 
we can avoid travsel of map to find out max

even if window size is reduce ,
we can update maxLength since we no whnere max replce chrater count excced the max count




*/

var characterReplacement1 = function(s, k) {
    let wEnd=0;
    let wStart=0;
    const map = new Map();
    const currentLength = () => wEnd -wStart +1;
    let maxLength = 0;
    let maxCount = 0
    
    const numberOfCharsToBeReplaced = () => currentLength() - maxCount;

    for(let ch of s){
    	// adding to map
    	const currentCount = map.get(ch);
    	if(!currentCount){
    		map.set(ch,1);
    		maxCount = Math.max(maxCount, 1);
    	}else{
    		map.set(ch, currentCount+1);
    		maxCount = Math.max(maxCount, currentCount+1);
    	}
    	
    	if(numberOfCharsToBeReplaced() <= k){
    		maxLength = Math.max(maxLength, currentLength());
    	}
    	
    	while(numberOfCharsToBeReplaced() > k){
    		// decrement the count
    		map.set(s[wStart], map.get(s[wStart])-1)
    		// decrement wStart
    		wStart++;

    	}

    	wEnd++;
    }

    return maxLength;
};
