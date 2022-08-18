/**
 * @param {number[]} fruits
 * @return {number}
 */

/*
[0,1,2,2]
       ^
   ^
 
maxNumberOfFruits = 3
currentLength() = (3-1)+1 = 3
 
 hashMap = {
   0:0,
   1:1,
   2:2
 }
 
 
  wStart, wEnd
 loop thriugh utill wEnd is last index
 window,
     increase untill distinct type of trees gratee than 2
     shirink untill istinct type of trees is 2
need to find max length of the window = maximum number of fruits
     
complexcity,

n=numner of trees

T - O(n),S - O(n)

*/

var totalFruit = function (fruits) {
  let wStart = 0;
  let wEnd = 0;
  const currentLength = () => wEnd - wStart + 1;
  let maxNumberOfFruits = 0;

  const hashmap = {};
  const getNumberOfKeys = () =>
    Object.values(hashmap).filter((el) => el).length;

  for (wEnd; wEnd < fruits.length; wEnd++) {
    // shrink window if needed
    while (getNumberOfKeys() > 2) {
      hashmap[fruits[wStart++]] -= 1;
    }

    // grow window
    hashmap[fruits[wEnd]] = hashmap[fruits[wEnd]]
      ? hashmap[fruits[wEnd]] + 1
      : 1;

    if (getNumberOfKeys() <= 2) {
      maxNumberOfFruits = Math.max(maxNumberOfFruits, currentLength());
    }
  }

  return maxNumberOfFruits;
};

// alternative soultion

// [0,1,2,2]

const totalFruit2 = (fruits) => {
  let wStart = 0;
  let wEnd = 0;
  let maxNumberOfFruits = 0;
  const map = new Map();
  const currentLength = () => wEnd - wStart + 1;

  for (wEnd; wEnd < fruits.length; wEnd++) {
    if (map.size > 2) {
      // shrink window if needed
      const enumerator = map.values();
      let oldestIndex = fruits.length - 1;
      while (true) {
        const { value, done } = enumerator.next();
        if (done) {
          break;
        }
        oldestIndex = Math.min(oldestIndex, value);
      }
      map.delete(fruits[oldestIndex]);
      wStart = oldestIndex + 1;
    }

    // grow window
    map.set(fruits[wEnd], wEnd);

    if (map.size <= 2 && currentLength() > maxNumberOfFruits) {
      maxNumberOfFruits = currentLength();
    }
  }

  return maxNumberOfFruits;
};

console.log(totalFruit2([0, 1, 2, 2]));
