import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBindGoogleProxy from "../proxy/DialogBindGoogleProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

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
                MultDialogManager.onClosePanel();
                PanelUtil.message_success(LangUtil("操作成功"));
                break;
        }
    }
}