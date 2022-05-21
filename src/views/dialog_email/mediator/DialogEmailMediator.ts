import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogEmailProxy from "../proxy/DialogEmailProxy";
import getProxy from "@/core/global/getProxy";
import dialog_email_detail from "@/views/dialog_email_detail";
import dialog_award from "@/views/dialog_award";

export default class DialogEmailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_mail,
            net.EventType.api_user_var_mail_var,
            net.EventType.api_user_var_mail_var_receive,
            net.EventType.api_user_var_receiveQuick,
            net.EventType.api_user_var_destroy_batch,
            net.EventType.api_user_var_destroy_quick,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogEmailProxy = getProxy(DialogEmailProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_var_mail:
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_mail_var:
                myProxy.setDetail(body);
                dialog_email_detail.show(body);
                break;
            case net.EventType.api_user_var_mail_var_receive:
                myProxy.api_user_var_mail();
                break;
            case net.EventType.api_user_var_receiveQuick:
                dialog_award.show(body.attachment_content);
                myProxy.api_user_var_mail();
                break;
            case net.EventType.api_user_var_destroy_batch:
                break;
            case net.EventType.api_user_var_destroy_quick:
                myProxy.pageData.listQuery.page_count = 1;
                myProxy.api_user_var_mail();
                break;
        }
    }
}
