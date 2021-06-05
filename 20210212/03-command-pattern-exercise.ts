interface Command {
    execute(): void;
}


class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute(): void {//简单命令，直接在命令类中实现
        console.log(`简单命令: 看, 像打印  (${this.payload})这些简单的事情，我可以搞定`);
    }
}

/**
 * 一些复杂的工作可以被命令类委派给其他的对象，那些对象叫做receivers
 *
 */
class ComplexCommand implements Command {
    private receiver: Receiver;

    /**
     * 上下文数据，这些是receiver需要的
     */
    private a: string;

    private b: string;


    constructor(receiver: Receiver, a: string, b: string) {
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    public execute(): void {
        console.log('复杂命令处理: 复杂 工作我交给receiver对象搞定.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

/**
 *  Receiver 类包含着一些重要的商业逻辑. 他们负责具体处理请求
 *
 */
class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: 在弄 (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: 也在弄 (${b}.)`);
    }
}

/**
 *  Invoker也就是触发器负责把请求发送个命令类
 *
 */
class Invoker {
    private onStart: Command;

    private onFinish: Command;

    /**
     * 初始化 commands.
     */
    public setOnStart(command: Command): void {
        this.onStart = command;
    }

    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    /**
     *  Invoker的代码是不关心具体的命令类和reciever的，它只管丢请求给命令，并部直接把请求发给实际含着商业逻辑的reciever

     */
    public doSomethingImportant(): void {
        console.log('Invoker: 我开始了哦?');
        if (this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('Invoker: ...做一些重要的...');

        console.log('Invoker: 我要收尾了哦?');
        if (this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object): object is Command {
        return object.execute !== undefined;
    }
}

/**
 * 客户端代码预置好invoker和 commands的关系，比如说这里定义好了开始时候的命令和结束时候的命令
 */
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('打招呼!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, '送邮件', '保存工作报告'));

invoker.doSomethingImportant();
