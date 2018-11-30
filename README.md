# Min-Max Heap [![Build Status](https://travis-ci.org/sisobus/MinMaxHeap.svg?branch=master)](https://travis-ci.org/sisobus/MinMaxHeap)

Lightweight [min-max heap](http://www.cs.otago.ac.nz/staffpriv/mike/Papers/MinMaxHeaps/MinMaxHeaps.pdf) javascript library for node, browser

## Install
```shell
npm i minmaxheaps
```

node
```js
const minmaxheaps = require("minmaxheaps")

let mmheap = new minmaxheaps.MinMaxHeap();

mmheap.push(16);
mmheap.push(-5643);
mmheap.popMin();
mmheap.popMax();
mmheap.popMax();
mmheap.push(123);
mmheap.popMin();
console.log(mmheap.heap);
console.log(mmheap.max());
console.log(mmheap.min());
```

browser
```html
<head>
    <script src="../dist/minmaxheaps.min.js"></script>
    <script>
        const {MinMaxHeap} = minmaxheap;

        let mmheap = new MinMaxHeap();

        mmheap.push(16);
        mmheap.push(-5643);
        mmheap.popMin();
        mmheap.popMax();
        mmheap.popMax();
        mmheap.push(123);
        mmheap.popMin();
        console.log(mmheap.heap);
        console.log(mmheap.max());
        console.log(mmheap.min());
    </script>
</head>
```

## API

* `new MinMaxHeap([duplicate=true, comparator])`, where `comparator` is optional comparison function and `duplicate` is optional allow duplicate key (default is true)
