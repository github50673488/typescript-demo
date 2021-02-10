interface IBuilder {
    createPartA(): void;

    createPartB(): void;

    createPartC(): void;
}


class Builder1 implements IBuilder {
    private product: Product1 = null;

    constructor() {
        this.reset();
    }

    public reset() {
        this.product = new Product1();
    }

    createPartA(): void {
        this.product.parts.push(" part A---By Builder1 ");

    }

    createPartB(): void {
        this.product.parts.push(" part B---By Builder1 ");

    }

    createPartC(): void {
        this.product.parts.push(" part C---By Builder1 ");

    }

    public getProduct() {
        const result = this.product;
        this.reset();
        return result;
    }

}

class Product1 {
    public parts: string[];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}


// class Builder2 implements IBuilder {
//   ....


// }


class Director {
    private builder: IBuilder;

    private lstOrders: [];

    constructor(builder: IBuilder) {
        this.builder = builder;
    }


    public SetMinOrder(): void {
        this.builder.createPartA();

    }

    public SetMaxOrder(): void {
        this.builder.createPartA();
        this.builder.createPartB();
        this.builder.createPartC();

    }
}

const builder = new Builder1();
const director = new Director(builder);

console.log('Standard basic product:');
director.SetMinOrder();
builder.getProduct().listParts();

console.log('Standard full featured product:');
director.SetMaxOrder();
builder.getProduct().listParts();

// Remember, the Builder pattern can be used without a Director class.
console.log('Custom product:');
builder.createPartA();
builder.createPartC();
builder.getProduct().listParts();
