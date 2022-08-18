/*
'AAAHHIBC'

find the longest substring with k distinct characters

1. implment the longest substring length with k distinct characters
2. find a way to return  longest substring length with k distinct characters

k=2

'AAAHHIBC'
        ^
     ^ 
T<O(2n) ~ O(n), n - string length 
S O(n+ k+1) ~ O(n)

 k<=n

wStart wEnd
 0		0

currentStringLength = (wEnd - wStart) +1



*/

/*
test cases
-----------
'AAAHHIBC, k=1
     ^
    ^

map : {
	H:3
}

ch=H
maxLength = 3
*/

const longestLength = (str, k) => {
  let wEnd = 0;
  let wStart = 0;
  const map = new Map();
  let maxLength = 0;
  const currentLength = () => wEnd - wStart + 1;

  for (let ch of str) {
  	// distinct ch's > k
    if (map.size > k) {
      // shrink untill distinct ch's = k
      // caclulate the oldest index in the hasmap (smallest)
      let oldestIndex = str.length - 1;
      const inumerator = map.values();
      while (true) {
        const { value, done } = inumerator.next();
        if (done) {
          break;
        }
        oldestIndex = Math.min(oldestIndex, value);
      }

      // remove older index from map
      map.delete(oldestIndex);
      // update wStart
      wStart = oldestIndex + 1;
    }
    

    // grow the window utill distinct ch's > k
    map.set(ch, wEnd);

    // update maxLength if applicable
    if (map.size === k) {
      maxLength = Math.max(maxLength, currentLength());
    }

    wEnd++;
  }

  return maxLength;
};

/*
test cases
-----------
'AAAHHIBC', k=1
        ^

 wEnd = 8
 wStart = 6

hashMap = {
	A:0,
	H:0,
	I:0,
	B:1,
	C:1
}
maxLength =3
*/

const longestSubString = (str, k) => {
  let wEnd = 0;
  let wStart = 0;
  const map = new Map();
  let maxLength = 0;
  let maxSubstringIndexs = [];
  const distinctKeys = () => Object.values(hashMap).filter((el) => el).length;
  const currentLength = () => wEnd - wStart + 1;

 
   for (let ch of str) {
  	// distinct ch's > k
    if (map.size > k) {
      // shrink untill distinct ch's = k
      // caclulate the oldest index in the hasmap (smallest)
      let oldestIndex = str.length - 1;
      const inumerator = map.values();
      while (true) {
        const { value, done } = inumerator.next();
        if (done) {
          break;
        }
        oldestIndex = Math.min(oldestIndex, value);
      }

      // remove older index from map
      map.delete(oldestIndex);
      // update wStart
      wStart = oldestIndex + 1;
    }
    

    // grow the window utill distinct ch's > k
    map.set(ch, wEnd);

    // update maxLength if applicable
    if (map.size === k && currentLength() > maxLength) {
    	
      maxLength = currentLength();
      maxSubstringIndexs = [wStart, wEnd];
    }

    wEnd++;
  }

  return str.substring(maxSubstringIndexs[0], maxSubstringIndexs[1] + 1);
};
