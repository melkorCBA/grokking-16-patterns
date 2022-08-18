/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 *
 * two ways
 * 1st
 * -------
 * having two hash maps and for each substring scanning the hashmap - complexcity - T - O(26n), S - O(26*2)~O(1)
 *
 * 2nd
 * ----
 * other than mantaning the 2 hashmaps, mantain match counts, elemnating the need to scane the map for every substring
 *
 */

/*
test case: s1 = "ab", s2 = "eidbaooo"

"ab"
eidboaoo
   ^
  ^  

s1Map = {
    a:1,
    b:1
}

subStringMap = {
    e:0
    i:1,
    d:1
}

 */

// 1st way
var checkInclusion = function (s1, s2) {
  // poppulate the s1 map
  const s1Map = new Map();
  for (let ch of s1) {
    const currentCount = s1Map.get(ch);
    if (currentCount) {
      s1Map.set(ch, currentCount + 1);
      continue;
    }

    s1Map.set(ch, 1);
  }

  const subStringMap = new Map();

  let wEnd = 0;
  // get LastIndex Character Of The Current Window
  const lastCh = () => s2[s2.length - wEnd - 1];
  const isPermutation = () => {
    const enumarator = s1Map.keys();

    while (true) {
      const { value, done } = enumarator.next();
      if (done) {
        return true;
      }
      if (s1Map.get(value) !== subStringMap.get(value)) {
        return false;
      }
    }
  };

  const insertChToMap = (ch) => {
    const currentCount = subStringMap.get(ch);
    if (currentCount) {
      subStringMap.set(ch, currentCount + 1);
    }

    subStringMap.set(ch, 1);
  };

  for (let ch of s2) {
    while (wEnd < s1.length) {
      insertChToMap(ch);
      wEnd++;
      continue;
    }

    if (isPermutation()) {
      return true;
    }

    // remove the last character fro the map & window
    subStringMap.set(lastCh(), subStringMap.get(lastCh) - 1);

    // expand window
    insertChToMap(ch);

    wEnd++;
  }
  return false;
};

/*

case 1 : ab, eidbaooo => true
case 2 : ab, eidboooo =>  false
case 3 : abc, abc =>  true

eidbaooo
^
^
s1Map: {
    a:1,
    b:1
}

s2Map = {
}

if substring is a permutation of s1,
matching count = 26


*/

/*

*/

// 2nd way
const decrementFromMap = (map, ch) => {
  const currentCount = map.get(ch);
  if (currentCount && currentCount - 1 > 0) {
    map.set(ch, currentCount - 1);
    return;
  }
  map.delete(ch);
};

const incrementFromMap = (map, ch) => {
  const currentCount = map.get(ch);
  if (currentCount) {
    map.set(ch, currentCount + 1);
    return;
  }
  map.set(ch, 1);
};

const updateMatchingCount = (map1, map2, ch, count, operation) => {
  // is already match
  if (map1.get(ch) === map2.get(ch)) {
    // should decrement matchingCount aftrer deletion
    count--;
    // decrement/increment count from s2Map
    operation(map2, ch);
  } else {
    // decrement/increment count from s2Map
    operation(map2, ch);
    // check
    if (map1.get(ch) === map2.get(ch)) {
      // should inecrement matchingCount aftrer deletion
      count++;
    }
  }

  return count;
};

/*
case 1 : ab, eidbaooo => true
case 2 : ab, eidboooo =>  false
case 3 : abc, abc =>  true


case 3 : abc, abc =>  true
abc


s1Map = {
    a:1,
    b:1,
    c:1
}
s1Map = {
    a:1
    
}
matchingCount=23

wEnd=5
*/

const checkInclusion1 = function (s1, s2) {
  const s1Map = new Map();
  const s2Map = new Map();

  // poplulate s1Map
  for (let ch of s1) {
    incrementFromMap(s1Map, ch);
  }

  matchingCount = 26 - s1Map.size;

  // populate s2Map
  for (let i = 0; i < s1.length; i++) {
    let ch = s2[i];
    matchingCount = updateMatchingCount(
      s1Map,
      s2Map,
      ch,
      matchingCount,
      incrementFromMap
    );
  }

  // checking for 1st substring
  if (matchingCount == 26) {
    return true;
  }

  for (let wEnd = s1.length; wEnd < s2.length; wEnd++) {
    // delete
    let deletingCh = s2[wEnd - s1.length];
    matchingCount = updateMatchingCount(
      s1Map,
      s2Map,
      deletingCh,
      matchingCount,
      decrementFromMap
    );

    // insert
    let insertingCh = s2[wEnd];
    matchingCount = updateMatchingCount(
      s1Map,
      s2Map,
      insertingCh,
      matchingCount,
      incrementFromMap
    );

    // check
    if (matchingCount == 26) {
      return true;
    }
  }

  return false;
};

console.log(checkInclusion1("ab", "eidbaooo"));
