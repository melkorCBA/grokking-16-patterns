/*
The median is the middle value in an ordered integer list. 
If the size of the list is even, there is no middle value.
 So the median is the mean of the two middle values.

    For examples, if arr = [2,3,4], the median is 3.
    For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.

You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array. Answers within 10-5 of the actual value will be accepted.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
Explanation: 
Window position                Median
---------------                -----
[1  3  -1] -3  5  3  6  7        1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7        3
 1  3  -1  -3 [5  3  6] 7        5
 1  3  -1  -3  5 [3  6  7]       6

Example 2:

Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]

 

Constraints:

    1 <= k <= nums.length <= 105
    -231 <= nums[i] <= 231 - 1




/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/*
can be done using ordered array with T-O(n^2) and finding median will be T-(n)

can do this using 2 heaps approuch with T-O(n*k) S-O(k) and findind medains will be T-O(1)

S/M - small-max heap  and L/M - large-min heap

two poniters

[1,3,-1,-3,5,3,6,7]
 ^    ^
 
 but how to pop geven element from two heaps

insted of popping if we impement a trickel up insert methode for given index
we can don't need to pop and insert for same k window
so the total T-complexcity for finding medina for a single window will be T-O(log n)
overall T-O((n-k)*log n)~O(nlogn)

**but to do this we need to find the index of wstart elemnt of in the heap
then we need to remove and rebalance the tree


overall complexcities
we need to do
add elment to two heaps - T-O(log k)
pop elemnt from heap - T-O(log k)
remove element from heap - T-(k/2)

so T-O(k*n)
S-O(k)

so in-summary
need to implement heap with push, pop
need to implement a two heap add and pop and remove given element
need to implement poping from given index -  this is for convnince of element removel

*/

const Heap = function () {
  const heap = [];
  const push = function (val, index = heap.length) {
    if (heap.length < 1) {
      heap.push(val);
      return heap.length;
    }
    let isTrickelUp = true;
    if (index < heap.length) {
      heap[index] = val;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (heap[left] === undefined && heap[right] === undefined) {
        // no children - so trickel up in the only way
        isTrickelUp = true;
      } else {
        const max = heap[right]
          ? Math.max(heap[left], heap[right])
          : heap[left];
        if (max > heap[index]) {
          // need to trickel down
          isTrickelUp = false;
        }
      }
    } else {
      heap.push(val);
    }
    if (isTrickelUp) {
      let i = index;
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (heap[parent] === undefined || heap[i] <= heap[parent]) {
          break;
        }
        const temp = heap[i];
        heap[i] = heap[parent];
        heap[parent] = temp;
        i = parent;
      }
    }
    if (!isTrickelUp) {
      let i = index;
      while (2 * i + 1 < heap.length) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const max =
          heap[right] !== undefined
            ? Math.max(heap[left], heap[right])
            : heap[left];
        if (heap[i] >= max) {
          break;
        }
        const child = heap[left] === max ? left : right;
        const temp = heap[i];
        heap[i] = heap[child];
        heap[child] = temp;
        i = child;
      }
    }

    return heap.length;
  };
  const pop = function () {
    if (heap.length === 1) return heap.pop();
    const top = heap[0];
    push(heap.pop(), 0);
    return top;
  };
  return {
    len: () => heap.length,
    peek: () => heap[0],
    push,
    pop,
    heap,
  };
};

const balance = (small, large) => {
  if (small && large && small.peek() > -1 * large.peek()) {
    large.push(-1 * small.pop());
  }
  const lengthDiff = Math.abs(small.len() - large.len());
  if (lengthDiff > 1) {
    if (small.len() > large.len()) {
      large.push(-1 * small.pop());
    } else {
      small.push(-1 * large.pop());
    }
  }
};

const addToHeaps = (small, large, val) => {
  small.push(val);
  balance(small, large);
};

const getMedian = (small, large) => {
  if (small.len() === large.len()) {
    return (small.peek() + -1 * large.peek()) / 2;
  }
  if (small.len() > large.len()) {
    return small.peek();
  }
  return -1 * large.peek();
};

const remove = (heap, val) => {
  // const temps = [];

  // while (heap.len() > 0) {
  //   const tempVal = heap.pop();

  //   if (tempVal === val) {
  //     // re-add the removed elemnts to the heap : expect for nums[wStart]
  //     temps.forEach((el) => heap.push(el));
  //     break;
  //   }
  //   temps.push(tempVal);
  // }

  /*
  since above is also T-O(k)
  we can use Array.findIndex to find the index - T-O(n)
  then to remove it - T-O(logn)

  */

  const last = heap.pop();
  if (last !== val) {
    const i = heap.heap.findIndex(el => el===val);
    heap.push(last, i);
  }
};

/*
tesst case 1:
[1,3,-1,-3,5,3,6,7] k=3
                   ^
             ^
 
 meadins = [1,-1,-1, 3, 5, 6]
 
 small = [3]
 large= [6,7]

*/

var medianSlidingWindow = function (nums, k) {
  const small = new Heap(); // max
  const large = new Heap(); // min - need to handle it manually
  const meadians = [];

  let wStart = 0,
    wEnd = 0;

  for (wEnd; wEnd < nums.length + 1; wEnd++) {
    // push wEnd up to k for two heaps
    if (wEnd < k) {
      addToHeaps(small, large, nums[wEnd]);
      continue;
    }
    // get median for the current window
    meadians.push(getMedian(small, large));
    // since we get the 1st kth meadian value in the i=k or k+1 itteration
    // we will get at WEnd = n or n+1 th iteration
    // so after caculating the median we don't need to prepare the heaps for next median calculation
    if (wEnd === nums.length) break;

    // find the index of wStart value in the heap
    // first need to find out in which heap the vlaue exsists
    if (nums[wStart] <= small.peek()) {
      remove(small, nums[wStart]);
    } else {
      remove(large, -1 * nums[wStart]);
    }
    // need to balance the heaps
    balance(small, large);
    // add the new value/ will also balance the un-balance tree
    addToHeaps(small, large, nums[wEnd]);
    wStart++;
  }

  return meadians;
};