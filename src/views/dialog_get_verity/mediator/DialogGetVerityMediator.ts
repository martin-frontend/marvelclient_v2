import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";

export default class DialogGetVerityMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_public_auth_code,
            net.EventType.api_public_email_send,
            net.EventType.api_public_sms_send,
            core.EventType.REQUEST_ERROR,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogGetVerityProxy = getProxy(DialogGetVerityProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_public_auth_code:
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.api_public_email_send:
            case net.EventType.api_public_sms_send:
                dialog_message.success(LangUtil("发送成功"));
                myProxy.pageData.bShow = false;
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.HttpType.api_public_email_send || body.url == net.HttpType.api_public_sms_send) {
                    myProxy.api_public_auth_code();
                }
                break;
        }
    }
}
