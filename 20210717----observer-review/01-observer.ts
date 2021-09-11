// https://refactoringguru.cn/design-patterns/observer

// 当对象间存在一对多关系时，
// 则使用观察者模式（Observer Pattern）。
// 比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。

// 真实世界类比，报纸,杂志的订阅，电子邮件订阅

// 需求：一个对象状态改变给其他对象通知的问题 ，
// 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新

// 系统使用场景A ---需要在系统中创建一个触发链，
// A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制

// 系统使用场景B ---当你使用图形用户界面类时通常会遇到一个问题。
// 比如， 你创建了自定义按钮类并允许客户端在按钮中注入自定义代码， 这样当用户按下按钮时就会触发这些代码

//注意 如果顺序执行，某一观察者错误会导致系统卡壳，一般采用异步方式


// 我们也将其称为发布者 （publisher）。
// 所有希望关注发布者状态变化的其他对象被称为订阅者 （subscribers）

// 为发布者类添加订阅机制， 让每个对象都能订阅或取消订阅发布者事件流
// 该机制包括 1）
// 一个用于存储订阅者对象引用的列表成员变量；
// 2） 几个用于添加或删除该列表中订阅者的公有方法
// 无论何时发生了重要的发布者事件， 它都要遍历订阅者并调用其对象的特定通知方法


// 所有订阅者都必须实现同样的接口，
// 发布者仅通过该接口与订阅者交互。
// 接口中必须声明通知方法及其参数，
// 这样发布者在发出通知时还能传递一些上下文数据

/* 以下是伪代码 ↓

// 发布者基类包含订阅管理代码和通知方法。
class EventManager is
private field listeners: hash map of event types and listeners

method subscribe(eventType, listener) is
listeners.add(eventType, listener)

method unsubscribe(eventType, listener) is
listeners.remove(eventType, listener)

method notify(eventType, data) is
foreach (listener in listeners.of(eventType)) do
    listener.update(data)

// 具体发布者包含一些订阅者感兴趣的实际业务逻辑。我们可以从发布者基类中扩
// 展出该类，但在实际情况下并不总能做到，因为具体发布者可能已经是子类了。
// 在这种情况下，你可用组合来修补订阅逻辑，就像我们在这里做的一样。
    class Editor is
public field events: EventManager
private field file: File

constructor Editor() is
events = new EventManager()

// 业务逻辑的方法可将变化通知给订阅者。
method openFile(path) is
this.file = new File(path)
events.notify("open", file.name)

method saveFile() is
file.write()
events.notify("save", file.name)

// ...


// 这里是订阅者接口。如果你的编程语言支持函数类型，则可用一组函数来代替整
// 个订阅者的层次结构。
interface EventListener is
method update(filename)

// 具体订阅者会对其注册的发布者所发出的更新消息做出响应。
class LoggingListener implements EventListener is
private field log: File
private field message

constructor LoggingListener(log_filename, message) is
this.log = new File(log_filename)
this.message = message

method update(filename) is
log.write(replace('%s',filename,message))

class EmailAlertsListener implements EventListener is
private field email: string

constructor EmailAlertsListener(email, message) is
this.email = email
this.message = message

method update(filename) is
system.email(email, replace('%s',filename,message))


// 应用程序可在运行时配置发布者和订阅者。
class Application is
method config() is
editor = new Editor()

logger = new LoggingListener(
    "/path/to/log.txt",
    "有人打开了文件：%s");
editor.events.subscribe("open", logger)

emailAlerts = new EmailAlertsListener(
    "admin@example.com",
    "有人更改了文件：%s")
editor.events.subscribe("save", emailAlerts)

*/

//20210717  以下是 ts 能实际跑起来的 例子


interface IPublisher {
    addSubscriber(observer: IObserver): void;

    removeSubscriber(observer: IObserver): void;

    notify(): void;
}

// 发布者（Publisher）会向其他对象发送值得关注的事件。事件会在发布者自身状态改变或执行特定行为后发生
class PublisherA implements IPublisher {
    public state: number;

    private observerLst: IObserver[] = [];

    addSubscriber(observer: IObserver): void {
        if (this.observerLst.includes(observer)) {
            return console.log(' already existing subscriber ');
        }
        this.observerLst.push(observer);
    }

    notify(): void {
        for (const observer of this.observerLst) {
            observer.update(this);
        }
    }

    removeSubscriber(observer: IObserver): void {
        const idx = this.observerLst.indexOf(observer);
        if (idx < 0) {
            return console.log(' no existing subscriber');
        }
        this.observerLst.splice(idx, 1); // del
    }

    public someBusinessLogic(): void {
        this.state = Math.floor(Math.random() * (10 + 1));
        console.log(`Subject: My state has just changed to: ${this.state}`);

        this.notify();
    }
}

// 订阅者（Subscriber）接口声明了通知接口。 在绝大多数情况下，该接口仅包含一个update更新方法。
interface IObserver {
    update(publisher: IPublisher): void;
}

// 可以执行一些操作来回应发布者的通知。 所有具体订阅者类都实现了同样的接口

class ObserverA implements IObserver {
    public update(publisher: IPublisher) {
        if (publisher instanceof PublisherA && publisher.state < 9) { // Observer can free add rule of receive
            console.log(`ObserverA reciever ${publisher.state}`);
        }
    }
}

class ObserverB implements IObserver {
    public update(publisher: IPublisher) {
        if (publisher instanceof PublisherA && publisher.state >= 3) { // Observer can free add rule of receive
            console.log(`ObserverB reciever ${publisher.state}`);
        }
    }
}


// 客户端（Client）会分别创建发布者和订阅者对象，然后为订阅者注册发布者更
// 以下是客户端代码

const publisherA = new PublisherA();

const observerA = new ObserverA();
publisherA.addSubscriber(observerA);

const observerB = new ObserverB();
publisherA.addSubscriber(observerB);

publisherA.someBusinessLogic();
publisherA.someBusinessLogic();

console.log(' -----------  observerB deled ',)

publisherA.removeSubscriber(observerB);
publisherA.someBusinessLogic();


