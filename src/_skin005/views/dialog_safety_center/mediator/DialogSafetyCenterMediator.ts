import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSafetyCenterProxy from "../proxy/DialogSafetyCenterProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogSafetyCenterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_bind_mobile_var,
            net.EventType.api_user_bind_email_var,
            net.EventType.api_user_change_password_var,
            net.EventType.api_public_area_code,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogSafetyCenterProxy = getProxy(DialogSafetyCenterProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_bind_mobile_var:
            case net.EventType.api_user_bind_email_var:
                {
                    PanelUtil.message_success(LangUtil("绑定成功"));
                    myProxy.pageData.bShow = false;
                    MultDialogManager.onClosePanel();
                    PanelUtil.getProxy_selfproxy.api_user_show_var([2]);
                }
                break;
            case net.EventType.api_user_change_password_var:
                PanelUtil.message_success(LangUtil("修改成功！"));
                myProxy.pageData.bShow = false;
                MultDialogManager.onClosePanel();
                break;
            case net.EventType.api_public_area_code:
                myProxy.pageData.areaCode = body;
                myProxy.setAreaCode();
                break;
        }
    }
}
