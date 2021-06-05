/**
 * //上下文定义了用户的关注接口
 */
class Context {
    /**
     *上下文保持着一个指向策略对象的指针，上下文并吧知道策略实现类，它可以通过策略通用接口进行工作。
     *
     */
    private strategy: Strategy;

    /**
     * 通常，上下文通过构造器得到策略，但是也提供了setter在运行的时候设置它
     *
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * 通常提供了setter在运行的时候设置策略
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * 上下文代理一些策略实现类的工作而不是 实现自己的不同版本的算法
     */
    public doSomeBusinessLogic(): void {
        // ...

        console.log('上下文: 用策略排序数据 (并不确认它到底做了没有)');
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));

        // ...
    }
}

/**
 *策略接口定义了通用操作
 * 上下文用这个接口去调用策略实现类的算法
 */
interface Strategy {
    doAlgorithm(data: string[]): string[];
}

/**
 * 策略实现类实现了策略通用类定义的接口的算法，这个接口让他们在上下文中可以互换
 */
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

/**
 * 客户端代码取得策略实现类并把它传递给了上下文，客户端应该意识到各个策略的不同以便得到正确的选择
 *
 */
const context = new Context(new ConcreteStrategyA());
console.log('客户端:策略已经被设置到正向排序');
context.doSomeBusinessLogic();

console.log('');

console.log('客户端:策略已经被设置到反向排序.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
