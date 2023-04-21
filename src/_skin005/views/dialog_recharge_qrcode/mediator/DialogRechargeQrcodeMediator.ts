import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRechargeQrcodeProxy from "../proxy/DialogRechargeQrcodeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRechargeQrcodeMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        // const body = notification.getBody();
        // const myProxy:DialogRechargeQrcodeProxy = getProxy(DialogRechargeQrcodeProxy);
        // switch(notification.getName()){}
    }
}
