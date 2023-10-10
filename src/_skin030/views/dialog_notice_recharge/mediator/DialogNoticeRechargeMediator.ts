import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogNoticeRechargeProxy from "../proxy/DialogNoticeRechargeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogNoticeRechargeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogNoticeRechargeProxy = getProxy(DialogNoticeRechargeProxy);
        // switch(notification.getName()){}
    }
}
