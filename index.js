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
  }
}
export class MinMaxHeap {
  constructor (duplicate = true, comparator = (a, b) => a < b ? true : false) {
    this.comparator = comparator;
    this.duplicate = duplicate;
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
    return Utils.parent(idx) >= 0;
  }
  hasGrandParent (idx) {
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
    Utils.swap(this._heap[idx1], this._heap[idx2]);
    Utils.swap(this._data[idx1], this._data[idx2]);
  }
  _bubbleUp (idx, isMaxLevel) {
    if (idx === 0) return;
    if (!this.hasGrandParent(idx)) return;

    const gp = Utils.grandParent(idx);
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
    let [mval, midx] = [this._heap[idx], idx];
    if (!this.hasChild(idx)) return [mval, midx];
    [mval, midx] = [this._heap[Utils.child(idx)], Utils.child(idx)];
    const left = Utils.child(idx);
    for (let i = 0; i < 2 && left + i < this._size; i++) {
      if (this.comparator(this._heap[left + i], this._heap[midx]) ^ isMaxLevel) {
        [mval, midx] = [this._heap[left + i], left + i];
      }
    }
    const grandLeft = Utils.grandChild(idx);
    for (let i = 0; i < 4 && grandLeft + i < this._size; i++) {
      if (this.comparator(this._heap[grandLeft + i], this._heap[midx]) ^ isMaxLevel) {
        [mval, midx] = [this._heap[grandLeft + i], grandLeft + i];
      }
    }
    return [mval, midx];
  }
  _trickleDown (idx, isMaxLevel) {
    if (idx >= this._size) return;
    if (!this.hasChild(idx)) return;

    const child = Utils.child(idx);
    const [mval, midx] = this._getMinChild(idx, isMaxLevel);
    if (midx === idx) return;
    this.swap(midx, idx);

    if (midx - child > 1) {
      if (this.comparator(this._heap[Utils.parent(midx)], this._heap[midx]) ^ isMaxLevel) {
        this.swap(Utils.parent(midx), midx);
      }
      _trickleDown(midx, isMaxLevel);
    }
  }
  trickleDown (idx) {
    if (this.isMinLevel(idx)) {
      _trickleDown(idx, false);
    } else {
      _trickleDown(idx, true);
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
  push (idx, data = null) {
    this.add(idx, data);
    this.bubbleUp(this._size - 1);
  }
  max () {
    if (this.empty()) {
      return null;
    }
    return [this._heap[0], this._data[0]];
  }
  min () {
    if (this.empty()) {
      return null;
    }
    const idx = this.getMinIndex();
    return [this._heap[idx], this._data[idx]];
  }
  keys () {
    return this._heap;
  }
}
