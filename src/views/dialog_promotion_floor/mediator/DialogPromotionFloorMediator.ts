import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPromotionFloorProxy from "../proxy/DialogPromotionFloorProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogPromotionFloorMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
        // switch(notification.getName()){}
    }
}