/**
 *
 *
 * 抽象类定义了一个模版方法，它包含了算法的框架，是一些抽象的原始操作的组成
 *
 * but leave the template
 * method itself intact.
 *
 * 子实现类要实现这些操作，但是不同于
 */
abstract class AbstractClass {
    /**
     * 算法骨架的模版
     */
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * 以下的操作已经有实现
     */
    protected baseOperation1(): void {
        console.log('抽象类说: 我正在做大量的工作');
    }

    protected baseOperation2(): void {
        console.log('抽象类说: 但我可以让子类重写一些操作');
    }

    protected baseOperation3(): void {
        console.log('抽象类说: 但我还是在做着大批工作');
    }

    /**
     * 以下的工作由子类实现
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * 这些是钩子，子类可以重写他们，但不是强制性的，因为他们已经有了空的实现。钩子提供了附加的扩展点在算法一些至关重要的地方
     */
    protected hook1(): void {
    }

    protected hook2(): void {
    }
}

/**
 * 实现类必须实现基类类的抽象方法。也可以重写一些已经实现的操作
 */
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('实现类1 说: 实现了操作1');
    }

    protected requiredOperation2(): void {
        console.log('实现类1 说: 实现了操作2');
    }
}

/**
 * 通常，实现类只重写一部分基类的操作
 */
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('实现类2 说: 实现了操作1');
    }

    protected requiredOperation2(): void {
        console.log('实现类2 说: 实现了操作2');
    }

    protected hook1(): void {
        console.log('实现类2 说: 重写钩子1');
    }
}

/**
 *  Client
 * code does not have to know the concrete class of an object it works with, as
 * long as it works with objects through the interface of their base class.
 *
 *客户端代码调用模版方法来执行算法，客户端不必知道实现类对象
 *
 */
function clientCode(abstractClass: AbstractClass) {
    // ...
    abstractClass.templateMethod();
    // ...
}

console.log('同样的客户端代码可以和不同的子类工作:');
clientCode(new ConcreteClass1());
console.log('');

console.log('同样的客户端代码可以和不同的子类工作:');
clientCode(new ConcreteClass2());
