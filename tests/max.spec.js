import { assert } from "chai";

import { MinMaxHeap } from "../index";

describe ("max", () => {
  it ('should return result of max', () => {
    const mmheap = new MinMaxHeap();

    const input = [4, 6, 1, 2, 7, 3, 5, 9, 8, 10];
    const expected = [4, 6, 6, 6, 7, 7, 7, 9, 9, 10];
    let output = [];
    for (let i = 0; i < input.length; i++) {
        mmheap.push(input[i]);
        output.push(mmheap.max());
    }
    assert.equal(output.toString(), expected.toString());
  });

  it ('should return result of max (100 elements)', () => {
    const mmheap = new MinMaxHeap();

    const input = [7122, 7905, 8775, 3414, 4657, 1492, 6970, 6547, 2441, 1992, 9137, 1599, 4891, 1153, 4029, 4861, 3316, 8045, 835, 3782, 7129, 4321, 8195, 8171, 9479, 7622, 8476, 8170, 5001, 8469, 2811, 1463, 8308, 8221, 1290, 6249, 607, 120, 2061, 7376, 8890, 9965, 3325, 7538, 1790, 593, 5094, 7864, 5031, 6319, 3232, 696, 41, 5682, 8639, 6646, 7813, 1057, 8782, 328, 4646, 6288, 3652, 310, 3836, 5698, 8430, 8603, 2934, 4285, 1270, 4492, 3663, 3702, 1305, 970, 6537, 6609, 8299, 3112, 6133, 1362, 55, 5225, 9339, 1890, 3151, 5376, 1939, 5867, 8573, 268, 9744, 7090, 954, 9986, 7331, 9866, 9129, 4989];
    let mval = -1;
    let expected = [];
    let output = [];
    for (let i = 0; i < input.length; i++) {
      mmheap.push(input[i]);
      mval = Math.max(mval, input[i]);
      expected.push(mval);
      output.push(mmheap.max());
    }
    assert.equal(output.toString(), expected.toString());
  });
});