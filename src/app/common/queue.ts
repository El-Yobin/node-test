export class Queue<T> {
  private storage = {};
  private lowestIndex = 0;
  private highestIndex = 0;

  public add(item: T): void {
    this.storage[this.highestIndex] = item;
    this.highestIndex += 1;
  }

  public get(): T {
    const oldestItem = this.storage[this.lowestIndex];
    delete this.storage[this.lowestIndex];
    this.lowestIndex += 1;

    return oldestItem;
  }

  public length(): number {
   return this.highestIndex - this.lowestIndex;
  }

  public getAllAsArray(): T[] {
   return Object.values(this.storage);
  }
}
