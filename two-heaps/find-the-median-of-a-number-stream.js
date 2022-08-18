/*
Heap with log n insert and pop

*/

const trickleUp = function (heapType, heap) {
  return function (val) {
    // trickle up
    heap.push(val);
    if (heap.length < 2) {
      return heap.length;
    }

    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      // change the condtion beased on heap type
      if (heapType === "max" && heap[i] <= heap[parent]) {
        break;
      }
      if (heapType === "min" && heap[i] >= heap[parent]) {
        break;
      }
      const temp = heap[i];
      heap[i] = heap[parent];
      heap[parent] = temp;
      i = parent;
    }
    return heap.length;
  };
};

const trickleDown = function (heapType, heap) {
  return function () {
    // trickle up
    if (heap.length < 2) {
      return heap.pop();
    }
    const top = heap[0];
    heap[0] = heap.pop();
    let i = 0;
    while (i * 2 + 1 < heap.length) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      const parent = i;
      /*
		left should definitely exsist if insed the loop
		why? i+1<heap.length

		but right child might or might not exisits
        */
      const childVal = heap[right]
        ? Math[heapType](heap[left], heap[right])
        : heap[left];
      // check need to perform swap
      if (heapType === "max" && childVal <= heap[parent]) {
        break;
      }
      if (heapType === "min" && childVal >= heap[parent]) {
        break;
      }
      //which child to swap
      const child = heap[left] === childVal ? left : right;
      // swap
      const temp = heap[parent];
      heap[parent] = heap[child];
      heap[child] = temp;
      i = child;
    }

    return top;
  };
};

const Heap = (function () {
  const heapFunc = function (heapType) {
    return function () {
      const heap = [];
      const heapPush = trickleUp(heapType, heap);
      const heapPop = trickleDown(heapType, heap);
      return {
        length: function () {
          return heap.length;
        },
        heapPush,
        heapPop,
        heapPeek: () => heap[0],
        heap,
      };
    };
  };

  return {
    max: heapFunc("max"),
    min: heapFunc("min"),
  };
})();

var MedianFinder = function () {
  this.smallHeap = new Heap.max();
  this.bigHeap = new Heap.min();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.smallHeap.heapPush(num);

  if (this.smallHeap.heapPeek() > this.bigHeap.heapPeek()) {
    this.bigHeap.heapPush(this.smallHeap.heapPop());
  }
  const diff = Math.abs(this.smallHeap.length() - this.bigHeap.length());
  if (diff > 1) {
    const largerLength = Math.max(
      this.smallHeap.length(),
      this.bigHeap.length()
    );
    if (this.smallHeap.length() === largerLength) {
      this.bigHeap.heapPush(this.smallHeap.heapPop());
    } else {
      this.smallHeap.heapPush(this.bigHeap.heapPop());
    }
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const smallLength = this.smallHeap.length();
  const bigLength = this.bigHeap.length();
  if (smallLength === bigLength) {
    return (this.smallHeap.heapPeek() + this.bigHeap.heapPeek()) / 2;
  }
  const maxLength = Math.max(smallLength, bigLength);
  if (smallLength === maxLength) {
    return this.smallHeap.heapPeek();
  }
  return this.bigHeap.heapPeek();
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

