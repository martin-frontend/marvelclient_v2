import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";

export default class DialogGetVerityMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_public_auth_code, net.EventType.api_public_email_send];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogGetVerityProxy = getProxy(DialogGetVerityProxy);
        switch (notification.getName()) {
            case net.EventType.api_public_auth_code:
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.api_public_email_send:
                dialog_message.scuess("发送成功");
                myProxy.pageData.bShow = false;
                break;
        }
    }
}
