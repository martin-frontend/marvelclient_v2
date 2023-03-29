import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogGoogleSettingsProxy from "../proxy/DialogGoogleSettingsProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";

export default class DialogGoogleSettingsMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_update_var, net.EventType.api_user_var_google_key];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogGoogleSettingsProxy = getProxy(DialogGoogleSettingsProxy);
        if (!myProxy.pageData.bShow) {
            return
        }
        switch (notification.getName()) {
            case net.EventType.api_user_update_var:
                myProxy.pageData.loading = false;
                dialog_message.success(LangUtil("操作成功"));
                break;
            case net.EventType.api_user_var_google_key:
                myProxy.pageData.loading = false;                
                myProxy.setData(body);
        }
    }
}
