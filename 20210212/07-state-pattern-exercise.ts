class Context {//上下文定义了用户的关注接口，还维护一个指向状态的子类的指针，这个状态子类代表者当前上下文的状态

    private state: State;//指向状态的子类的指针

    constructor(state: State) {
        this.transitionTo(state);
    }

    public transitionTo(state: State): void {//上下文允许在运行期间更改状态对象
        console.log(`上下文: 转换到 ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }

    /*
     * 上下文代理了一部分状态对象的行为
     */
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }
}


abstract class State {//状态基类定义了各个状态类应该实现的行为框架和指向上下文的指针，这个指针可以用于状态类们转换上下文的状态到另外的状态
    protected context: Context;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
}


class ConcreteStateA extends State {//具体的状态类实现了和上下文的状态关联的多种行为
    public handle1(): void {
        console.log('具体状态A处理要求1.');
        console.log('具体状态A要更改上下文的状态.');
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log('具体状态A处理要求2.');
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('具体状态B处理要求1');
    }

    public handle2(): void {
        console.log('具体状态B处理要求2.');
        console.log('具体状态A要更改上下文的状态.');
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * The client code.
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
