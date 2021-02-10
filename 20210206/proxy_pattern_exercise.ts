interface Image {
    display(): void;
}

class RealImage implements Image {
    private readonly fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
        this.loadFile();
    }

    display(): void {
        console.log(this.fileName + 'displayed');
    }

    loadFile() {
        console.log(this.fileName + 'loading....');
    }
}


class ProxyImage implements Image {
    private _fileName: string;
    private realImage: RealImage = null;

    set fileName(value: string) {
        this._fileName = value;
    }

    constructor(fileName: string) {

    }

    private isFileNameOK(): boolean {
        return this.fileName.length > 0;
    }

    private loggerSomething() {
        console.log('loggerSomething!!');
    }

    display(): void {
        if (!this.isFileNameOK()) {
            console.log('fileName is not ok!!');
        }
        if (this.realImage == null) {
            this.realImage = new RealImage(this._fileName);
        }
        this.realImage.loadFile();
        this.loggerSomething()
    }
}

let realImage = new RealImage("");
realImage.display();
// realImage.fileName = "abc.png";
realImage = new RealImage("abc.png");
realImage.display();

const proxyImage = new ProxyImage("");
proxyImage.display();
proxyImage.fileName = "abc.png";
proxyImage.display();
