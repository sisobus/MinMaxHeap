import { assert } from "chai";

import { MinMaxHeap } from "../index";

describe ("boj7662", () => {
  it ('should display EMPTY', () => {
    const mmheap = new MinMaxHeap();

    mmheap.push(16);
    mmheap.push(-5643);
    mmheap.popMin();
    mmheap.popMax();
    mmheap.popMax();
    mmheap.push(123);
    mmheap.popMin();
    // console.log(mmheap.max(), mmheap.min());
  });
  
  it ('should display 333 -45', () => {
    const mmheap = new MinMaxHeap();

    mmheap.push(-45);
    mmheap.push(653);
    mmheap.popMax();
    mmheap.push(-642);
    mmheap.push(45);
    mmheap.push(97);
    mmheap.popMax();
    mmheap.popMin();
    mmheap.push(333);
    assert.equal(mmheap.max(), 333);
    assert.equal(mmheap.min(), -45);
    // console.log(mmheap.max(), mmheap.min());
  });
});