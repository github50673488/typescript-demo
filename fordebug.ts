interface IGUIFactory {
    createButton();

    createCheckbox();
}

interface IButton {
    paint();
}

interface ICheckbox {
    paint();
}

class WindowsGUIFactory implements IGUIFactory {


    createButton(): IButton {
        return new WindowsButton();

    }

    createCheckbox(): ICheckbox {
        return new WindowsCheckbox();

    }
}

class WindowsButton implements IButton {
    paint() {
        console.log("paint WindowsButton");
    }
}

class WindowsCheckbox implements ICheckbox {
    paint() {
        console.log("paint WindowsCheckbox");
    }
}

// if(OS IS windows)
{
    const factory: IGUIFactory = new WindowsGUIFactory();
    factory.createButton().paint();
    factory.createCheckbox().paint();
    factory.createCheckbox().paint();
}


