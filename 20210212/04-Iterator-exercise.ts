/**
 * Iterator Design Pattern
 *
 * 使用迭代器模式，在不知道集合的具体结构（是list？ stack？ tree 。。。）的情况下用同一个接口即可遍历集合的元素
 */

interface Iterator<T> {//迭代器接口

    current(): T;// Return the current element.


    next(): T;// Return the current element and move forward to next element.


    key(): number;// Return the key of the current element.


    valid(): boolean;// Checks if current position is valid.


    rewind(): void; // Rewind the Iterator to the first element. 重置指针
}

interface Aggregator {// 聚合器（集合）接口

    getIterator(): Iterator<string>; // 取外部遍历器
}

class AlphabeticalOrderIterator implements Iterator<string> {//实现各种算法的具体遍历器
    private collection: WordsCollection;


    private position: number = 0;// 存储当前遍历位置

    private reverse: boolean = false;// 遍历方向

    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}


class WordsCollection implements Aggregator {// 具体集合
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

const collection = new WordsCollection();
collection.addItem('第一');
collection.addItem('第二');
collection.addItem('第三');

const iterator = collection.getIterator();

console.log('正向遍历:');//
while (iterator.valid()) {
    console.log(iterator.next());
}

console.log('');
console.log('反向遍历:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
