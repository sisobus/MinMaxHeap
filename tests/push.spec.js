import { assert } from "chai";

import { MinMaxHeap } from "../index";

describe ("push", () => {
  it ('should return result of push', () => {
    const mmheap = new MinMaxHeap();

    const input = [4,6,1,2,7,3,5,9,8,10];
    for (let i = 0; i < input.length; i++) {
        mmheap.push(input[i]);
    }
    console.log(mmheap.keys().toString());
    console.log(mmheap.max());
    console.log(mmheap.min());
  });
});