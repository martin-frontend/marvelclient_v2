import AbstractMediator from "@/core/abstract/AbstractMediator";

export default class OverlayMediator extends AbstractMediator {
    
    public listNotificationInterests(): string[] {
        return [core.EventType.IO_ERROR, core.EventType.REQUEST_ERROR];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myView:any = this.viewComponent;
        switch(notification.getName()){
            case core.EventType.IO_ERROR:
            case core.EventType.REQUEST_ERROR:
                myView.hide();
                break;
        }
    }
}
