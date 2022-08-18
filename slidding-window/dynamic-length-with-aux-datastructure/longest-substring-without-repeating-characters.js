/**
 * @param {string} s
 * @return {number}
 
 Given a string s, find the length of the longest substring without repeating characters.

 abcabcbb
    ^
 ^
 
 abcb
    ^
   ^
   
 
 
 map = {
   a:0,
   b:1,
   c:2
 }
 
 
 mantain a map of current substring distinct charcters
 window, wStart, wEnd
    grow untill duplicate chracter found
    for duplicate character,
        set wStart = current vlaue for duplicate chrater in map + 1
        update the map value to current wEnd
        
 
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let wStart = 0;
  let wEnd = 0;
  const map = new Map();

  let maxSubstringLength = 0;

  const currentLength = () => wEnd - wStart + 1;

  for (let ch of s) {
    // current character is a duplcate ch
    if (map.get(ch) || map.get(ch) === 0) {
      const currentLatestIndex = map.get(ch);
    // remove every element less than & equal to the currentLatestIndex from map
        for(let [key, value] of map.entries()){
            if(value> currentLatestIndex){
                break;
            }
            map.delete(key)
        }
        
      wStart = currentLatestIndex + 1;
    } 
      
    map.set(ch, wEnd);
    maxSubstringLength = Math.max(maxSubstringLength, currentLength());
    wEnd++;
  }

  return maxSubstringLength;
};