interface IAnimal { };

interface IAction {
    doAction: () => void
};

interface IWalker {
    walk: () => void
};

interface ISwimmer {
    swim: () => void
};

class SwimAction implements IAction {
    doAction = () => console.log("Swimm");    
}

class WalkAction implements IAction {
    doAction = () => console.log("Walk");    
}

class Penguin implements IAnimal, IWalker, ISwimmer {
    walkAction: IAction;
    swimAction: IAction;

    constructor(){
        this.walkAction = new WalkAction();
        this.swimAction = new SwimAction();
    }

    walk = () => this.walkAction.doAction();

    swim = () => this.swimAction.doAction();
}