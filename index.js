class Utils {
  static parent (idx) {
    return (idx - 1) / 2 | 0;
  }
  static grandParent (idx) {
    return (idx - 1) / 4 | 0;
  }
  static left (idx) {
    return 2 * idx + 1;
  }
  static right (idx) {
    return 2 * idx + 2;
  }
  static child (idx) {
    return 2 * idx + 1;
  }
  static grandChild (idx) {
    return 4 * idx + 3;
  }
  static swap(a, b) {
    const t = a;
    a = b;
    b = t;
    return [b, a];
  }
}
export class MinMaxHeap {
  constructor (hasData = false, duplicate = true, comparator = (a, b) => a < b ? true : false) {
    this.comparator = comparator;
    this.duplicate = duplicate;
    this.hasData = hasData;
    this._heap = [];
    this._data = [];
    this._size = 0;
  }
  get heap () {
    return this._heap;
  }
  get size () {
    return this._size;
  }
  init () {
    this._heap = [];
    this._size = 0;
  }
  clear () {
    this.init();
  }
  empty() {
    return this._size === 0;
  }
  hasParent (idx) {
    if (idx === 0) return false;
    return Utils.parent(idx) >= 0;
  }
  hasGrandParent (idx) {
    if (!this.hasParent(idx)) return false;
    return Utils.grandParent(idx) >= 0;
  }
  hasChild (idx) {
    return Utils.child(idx) < this._size;
  }
  hasGrandChild (idx) {
    return Utils.grandChild(idx) < this._size;
  }
  hasLeft (idx) {
    return Utils.left(idx) < this._size;
  }
  hasRight (idx) {
    return Utils.right(idx) < this._size;
  }
  isMinLevel (idx) {
    return (Math.log2(idx + 1) | 0) & 1;
  }
  isMaxLevel (idx) {
    return !this.isMinLevel(idx);
  }
  swap (idx1, idx2) {
    [this._heap[idx1], this._heap[idx2]] = [this._heap[idx2], this._heap[idx1]];
    [this._data[idx1], this._data[idx2]] = [this._data[idx2], this._data[idx1]];
  }
  _bubbleUp (idx, isMaxLevel) {
    if (idx === 0) return;
    const p = Utils.parent(idx);
    if (p === 0) return;
    const gp = Utils.parent(p);
    if (this.comparator(this._heap[idx], this._heap[gp]) ^ isMaxLevel) {
      this.swap(idx, gp);
      this._bubbleUp (gp, isMaxLevel);
    }
  }
  bubbleUp (idx) {
    if (idx === 0) return;
    const p = Utils.parent(idx);
    if (this.isMinLevel(idx)) {
      if (!this.comparator(this._heap[idx], this._heap[p])) {
        this.swap(idx, p);
        this._bubbleUp (p, true);
      } else {
        this._bubbleUp (idx, false);
      }
    } else {
      if (this.comparator(this._heap[idx], this._heap[p])) {
        this.swap(idx, p);
        this._bubbleUp (p, false);
      } else {
        this._bubbleUp (idx, true);
      }
    }
  }
  _getMinChild (idx, isMaxLevel) {
    let midx = idx;
    if (!this.hasChild(idx)) return midx;
    const left = Utils.child(idx);
    for (let i = 0; i < 2 && left + i < this._size; i++) {
      if (this.comparator(this._heap[left + i], this._heap[midx]) ^ isMaxLevel) {
        midx = left + i;
      }
    }
    const grandLeft = Utils.child(left);
    for (let i = 0; i < 4 && grandLeft + i < this._size; i++) {
      if (this.comparator(this._heap[grandLeft + i], this._heap[midx]) ^ isMaxLevel) {
        midx = grandLeft + i;
      }
    }
    return midx;
  }
  _trickleDown (idx, isMaxLevel) {
    if (idx >= this._size) return;

    const child = Utils.child(idx);
    const midx = this._getMinChild(idx, isMaxLevel);
    if (midx === idx) return;
    this.swap(midx, idx);

    if (midx - child > 1) {
      if (this.comparator(this._heap[Utils.parent(midx)], this._heap[midx]) ^ isMaxLevel) {
        this.swap(Utils.parent(midx), midx);
      }
      this._trickleDown(midx, isMaxLevel);
    }
  }
  trickleDown (idx) {
    if (this.isMinLevel(idx)) {
      this._trickleDown(idx, false);
    } else {
      this._trickleDown(idx, true);
    }
  }
  getMinIndex() {
    if (this._size === 0) {
      return null;
    } else if (this._size === 1) {
      return 0;
    } else if (this._size === 2) {
      return 1;
    } else {
      return this.comparator(this._heap[1], this._heap[2]) ? 1: 2;
    }
  }
  add (idx, data) {
    this._heap.push(idx);
    this._data.push(data);
    this._size += 1;
  }
  remove (idx) {
    if (idx >= this._size) {
      return null;
    }
    let [ridx, rval] = [null, null];
    if (idx === this._size - 1) {
      [ridx, rval] = [this._heap.pop(), this._data.pop()];
      this._size -= 1;
      if (this.hasData) {
        return [ridx, rval];
      } else {
        return ridx;
      }
    }

    this.swap(idx, this._size - 1);
    [ridx, rval] = [this._heap.pop(), this._data.pop()];
    this._size -= 1;

    this.trickleDown(idx);
  }
  push (idx, data = null) {
    this.add(idx, data);
    this.bubbleUp(this._size - 1);
  }
  max () {
    if (this.empty()) {
      return null;
    }
    return this.hasData ? [this._heap[0], this._data[0]] : this._heap[0];
  }
  min () {
    if (this.empty()) {
      return null;
    }
    const idx = this.getMinIndex();
    return this.hasData ? [this._heap[idx], this._data[idx]] : this._heap[idx];
  }
  popMin () {
    if (this.empty()) {
      return null;
    }
    const idx = this.getMinIndex();
    let [ridx, rval] = [this._heap[idx], this._data[idx]];
    this.remove(idx);

    if (this.hasData) {
      return [ridx, rval];
    } else {
      return ridx;
    }
  }
  popMax () {
    if (this.empty()) {
      return null;
    }
    const idx = 0;
    let [ridx, rval] = [this._heap[idx], this._data[idx]];
    this.remove(idx);

    if (this.hasData) {
      return [ridx, rval];
    } else {
      return ridx;
    }
  }
  pop (isMax = true) {
    if (isMax) {
      return this.popMax();
    } else {
      return this.popMin();
    }
  }
}
