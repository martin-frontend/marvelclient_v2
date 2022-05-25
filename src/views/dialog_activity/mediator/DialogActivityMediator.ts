import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogActivityProxy from "../proxy/DialogActivityProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogActivityMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_activity];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogActivityProxy = getProxy(DialogActivityProxy);
        myProxy.pageData.loading = false;
        switch(notification.getName()){
            case net.EventType.api_plat_activity:
                myProxy.setData(body);
                break;
        }
    }
}