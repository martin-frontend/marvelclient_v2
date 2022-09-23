import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBindGoogleProxy from "../proxy/DialogBindGoogleProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";

export default class DialogBindGoogleMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_bind_google_key_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogBindGoogleProxy = getProxy(DialogBindGoogleProxy);
        switch(notification.getName()){
            case net.EventType.api_user_bind_google_key_var:
                myProxy.pageData.loading = false;
                myProxy.pageData.bShow = false;
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}