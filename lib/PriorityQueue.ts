type ICompare<T> = (a: T, b: T) => boolean;

class PriorityQueueHeap<T extends { priority: number }> {
  private heap: T[] = [];
  private _size = 0;
  private compare = this.defaultCompare;

  constructor({ compare }: { compare: ICompare<T> }) {
    if (typeof compare === 'function') this.compare = compare;
  }

  private defaultCompare(a: T, b: T) {
    return a.priority < b.priority;
  }

  private _swap(arr: T[], a: number, b: number) {
    let t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
  }

  private _up(heap: T[], i: number) {
    while (i > 0) {
      let pIdx = Math.floor(i / 2);
      if (pIdx < 0 || this.compare(heap[pIdx], heap[i])) {
        break;
      }
      this._swap(heap, i, pIdx);
      i = pIdx;
    }
  }

  private _down(heap: T[], i: number, size: number) {
    while (i < size) {
      let target = i;
      let l = 2 * i;
      let r = 2 * i + 1;

      if (l < size && !this.compare(heap[i], heap[l])) {
        target = l;
      }

      if (r < size && !this.compare(heap[target], heap[r])) {
        target = r;
      }

      if (target == i) break;
      this._swap(heap, target, i);
      i = target;
    }
  }

  public push(val: T) {
    this.heap.push(val);
    this._size++;
    this._up(this.heap, this._size - 1);
  }

  public pop() {
    if (!this._size) return null;
    const result = this.heap[0];
    this.heap[0] = this.heap[this._size - 1];
    this._size--;
    this._down(this.heap, 0, this._size);
    return result;
  }

  public top() {
    if (!this._size) return null;
    return this.heap[0];
  }

  public clear() {
    this.heap = [];
    this._size = 0;
  }

  public empty() {
    return this._size == 0;
  }

  public size() {
    return this._size;
  }
}

export default PriorityQueueHeap;

class PriorityQueueArray<T extends { priority: number }> {
  private queue: T[];
  private compare: ICompare<T>;

  constructor(props?: { compare?: ICompare<T> }) {
    const { compare } = props || {};
    this.queue = [];
    this.compare = compare || this._defaultCompare;
  }

  _defaultCompare(a: T, b: T) {
    return a.priority < b.priority;
  }

  push(n: T) {
    let i = 0;
    while (i < this.queue.length) {
      const cur = this.queue[i];
      if (!this.compare(n, cur)) {
        break;
      }
      i++;
    }
    this.queue.splice(i, 0, n);
  }

  pop() {
    return this.queue.pop();
  }

  top() {
    const top = this.queue[this.queue.length - 1];
    return top;
  }

  clear() {
    this.queue = [];
    return true;
  }

  empty() {
    return !this.queue.length;
  }

  size() {
    return this.queue.length;
  }
}
