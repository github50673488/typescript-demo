class Originator {//原发器保持者一些以后可能会变化的重要状态。还定义了可以保存或恢复这些状态的方法。
    private state: string;//为了简单说明，这里原发器的状态只保存了一个简单的变量

    constructor(state: string) {
        this.state = state;
        console.log(`原发器: 我的初始状态是: ${state}`);
    }

    /**
     * 原发器的商业逻辑会影响他的内部状态，因而，客户端会在运行商业逻辑的代码之前用save（）备份状态。
     */
    public doSomething(): void {
        console.log('原发器: 我正在做重要的事情.');
        this.state = this.generateRandomString(30);
        console.log(`原发器: 我的状态已经转为: ${this.state}`);
    }

    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array
            .apply(null, {length})
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }


    public save(): Memento {//保存当前状态到快照（备忘录）
        return new ConcreteMemento(this.state);
    }


    public restore(memento: Memento): void {//从快照恢复状态
        this.state = memento.getState();
        console.log(`原发器: 我的状态转为: ${this.state}`);
    }
}


interface Memento {//快照接口提供了取回快照元数据的方式，比如说从创建日期，名字。而且并没有暴露原发器的状态。
    getState(): string;

    getName(): string;

    getDate(): string;
}


class ConcreteMemento implements Memento {// 快照实现类包含了存储原发器状态的机制
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }


    public getState(): string {//原发器用这个方法恢复状态
        return this.state;
    }

    /**
     * The rest of the methods are used by the Caretaker to display metadata.
     * 剩下的方法用做给负责人显示元数据
     */
    public getName(): string {
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

/**
 * The Caretaker doesn't depend on the Concrete Memento class. Therefore, it
 * doesn't have access to the originator's state, stored inside the memento. It
 * works with all mementos via the base Memento interface.
 *
 * 负责人类不依赖于快照类，所以，它不必访问存储在快照的原发器的状态，它可以通过快照接口可以在任何快照类上工作。
 */
class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    public backup(): void {
        console.log('\n负责人: 保存原发器状态...');
        this.mementos.push(this.originator.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`负责人: 恢复状态到: ${memento.getName()}`);
        this.originator.restore(memento);
    }

    public showHistory(): void {
        console.log('负责人: 这里是快照列表:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * Client code.
 */
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log('\n客户端: 好，现在回滚!\n');
caretaker.undo();

console.log('\n客户端: 再来一次!\n');
caretaker.undo();
