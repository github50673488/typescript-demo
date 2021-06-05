abstract class NodeType {
    protected parent: NodeType;

    public setParent(parent: NodeType) {
        this.parent = parent;
    }

    public getParent(): NodeType {
        return this.parent;
    }


    public add(component: NodeType): void {
    }

    public remove(component: NodeType): void {
    }


    public isFolder(): boolean {
        return false;
    }


    public abstract operation(): string;
}


class FileType extends NodeType {
    public operation(): string {
        return 'File';
    }
}


class FolderType extends NodeType {
    protected childreNodes: NodeType[] = [];

    public add(node: NodeType): void {
        this.childreNodes.push(node);
        node.setParent(this);
    }

    public remove(node: NodeType): void {
        const componentIndex = this.childreNodes.indexOf(node);
        this.childreNodes.splice(componentIndex, 1);

        node.setParent(null);
    }

    public isFolder(): boolean {
        return true;
    }

    public operation(): string {
        const results = [];
        for (const child of this.childreNodes) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}


function clientCode(node: NodeType) {
    // ...

    console.log(`RESULT: ${node.operation()}`);

    // ...
}

const simple = new FileType();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');


const tree = new FolderType();
const branch1 = new FolderType();
branch1.add(new FileType());
branch1.add(new FileType());
const branch2 = new FolderType();
branch2.add(new FileType());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');


function clientCode2(node1: NodeType, node2: NodeType) {
    // ...

    if (node1.isFolder()) {
        node1.add(node2);
    }
    console.log(`RESULT: ${node1.operation()}`);

    // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);
