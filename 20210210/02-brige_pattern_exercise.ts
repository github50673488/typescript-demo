interface IDevice {
    isEnabled(): boolean;

    enable(): void;

    disable(): void;

    setVolume(percent: number);

    getVolume(): number;

    setChannel(channel: number);

    getChannel(): number;

    printStatus(): void;

}

interface IRemote {
    power(): void;

    volumeUp(): void;

    volumeDown(): void;

    channelUp(): void;

    channelDown(): void;


}


class BaseRemote implements IRemote {

    private device: IDevice = null;

    constructor(device: IDevice) {
        this.device = device;
    }

    channelDown(): void {

        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }

    power(): void {
        if (this.device.isEnabled()) {
            this.device.disable();

        } else {
            this.device.enable();
        }

    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 1);
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 1);
    }

}

class ExternalRemote extends BaseRemote {
    //....
}


class TV implements IDevice {

    private on: boolean;
    private volume: number;
    private channel: number;

    disable(): void {
        this.on = false;
    }

    enable(): void {
        this.on = true;
    }

    isEnabled(): boolean {
        return this.on;

    }

    getChannel(): number {
        return this.channel;
    }

    getVolume(): number {
        return this.volume;
    }


    setChannel(channel: number) {
        this.channel = channel;
    }

    setVolume(percent: number) {
        this.volume = percent;
    }

    printStatus(): void {
        console.log(" no more time ,so i just print printstaus");

    }

}


class Radio implements IDevice {
    disable(): void {
        console.log("no more time ,");
    }

    enable(): void {
        console.log("no more time ,");
    }

    getChannel(): number {
        return 0;
    }

    getVolume(): number {
        return 0;
    }

    isEnabled(): boolean {
        return false;
    }

    printStatus(): void {
        console.log("no more time ,");
    }

    setChannel(channel: number) {
        console.log("no more time ,");
    }

    setVolume(percent: number) {
        console.log("no more time ,");
    }

}

let TVObj: IDevice = new TV();
let baseRemote1: IRemote = new BaseRemote(TVObj);
baseRemote1.power();
baseRemote1.channelDown();
//baseRemote1. other
TVObj.printStatus();

let radio: IDevice = new Radio();
//baseRemote2 ...
// or baseremote1.setDevice(radio);  ...
// .......


let exRemote2: ExternalRemote = new ExternalRemote(TVObj);
//exRemote2. other



