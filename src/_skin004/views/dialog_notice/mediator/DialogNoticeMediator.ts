import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogNoticeProxy from "../proxy/DialogNoticeProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogNoticeMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_notice_show_var,];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogNoticeProxy = getProxy(DialogNoticeProxy);
        switch(notification.getName()){
            case net.EventType.api_plat_var_notice_show_var:
                myProxy.addNoticeInfo(body);
                break;


        }
    }
}