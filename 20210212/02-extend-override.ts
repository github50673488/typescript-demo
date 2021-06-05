//父类
class Gege{
    public name:string;
    public age:number;
    public sex:string;
    public constructor(sex:string,name:string,age:number){
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    public say(){
        console.log("father-123456");
    }
    public sayHello(){
        console.log("father-123456");
    }
}

let ge:Gege = new Gege('youchen','boy',16); //和 constructor 保持一致

//子类
class Child extends Gege{
    public look:string = 'handsome';
    public play(){
        console.log("child-子类的一个方法!");
    }
    public sayHello(){
        super.sayHello();
        console.log("child-重写父类的方法，添加新的东西！");
    }
}

let child = new Child('xiaoxiao','boy',2);

child.play();
child.sayHello();
