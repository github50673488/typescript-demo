interface Handler { // 定义处理接口（的功能）
    setNext(handler: Handler): Handler;

    handle(request: string): string;
}

abstract class AbstractHandler implements Handler {// 定义通用接口(只是为了代码重用)
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public abstract handle(request: string): string;//

    public handlenext(request: string): string {
        // if (this.nextHandler) {
        //     return this.nextHandler.handle(request);
        // }
        // return null;
        if (!this.nextHandler) {// 觉得这种写法好理解点 ↓
            return null;
        }
        return this.nextHandler.handle(request);
    }
}

/**
 *  以下是具体的处理类
 */
class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === '香蕉') {
            return `猴子: 我要吃 ${request}.`;
        }
        return super.handlenext(request);

    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === '坚果') {
            return `松鼠: 我要吃 ${request}.`;
        }
        return super.handlenext(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string {
        if (request === '骨头') {
            return `狗: 我要吃 ${request}.`;
        }
        return super.handlenext(request);
    }
}


function clientCode(handler: Handler) {
    const foods = ['坚果', '香蕉', '一杯咖啡'];

    for (const food of foods) {
        console.log(`客户端代码: 谁需要 ${food}?`);

        const result = handler.handle(food);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(`  ${food} 没人要.`);
        }
    }
}


const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);


console.log('链: 猴子 > 松鼠 > 狗\n');
clientCode(monkey);
console.log('');

console.log('子链: 松鼠 > 狗\n');
clientCode(squirrel);
