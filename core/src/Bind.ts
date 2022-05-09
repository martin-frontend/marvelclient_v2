module ui {
    export function bind(view:any, mediatorClass:any){
        view.mediatorClass = mediatorClass;
        var facade = puremvc.Facade.getInstance();
        view.addEventListener(egret.Event.ADDED_TO_STAGE, e => {
            const mediator = new e.target.mediatorClass();
            e.target.mediatorName = mediator.mediatorName = core.generateUUID();
            facade.registerMediator(mediator);
            mediator.setView(e.target);
        }, this);

        view.addEventListener(egret.Event.REMOVED_FROM_STAGE, e => {
            if(e.target.mediatorName) facade.removeMediator(e.target.mediatorName);
        }, this);
    }
}