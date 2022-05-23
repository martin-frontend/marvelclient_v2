import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogEmailDetailProxy from "../proxy/DialogEmailDetailProxy";
import getProxy from "@/core/global/getProxy";
import dialog_award from "@/views/dialog_award";

export default class DialogEmailDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_mail_var_receive];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogEmailDetailProxy = getProxy(DialogEmailDetailProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_var_mail_var_receive:
                myProxy.setReceive();
                dialog_award.show(body.attachment_content);
                break;
        }
    }
}
