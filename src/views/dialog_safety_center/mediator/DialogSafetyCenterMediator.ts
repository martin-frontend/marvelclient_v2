import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogSafetyCenterProxy from "../proxy/DialogSafetyCenterProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";

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
                    dialog_message.scuess("绑定成功");
                    myProxy.pageData.bShow = false;
                    const selfProxy:SelfProxy = getProxy(SelfProxy);
                    selfProxy.api_user_show_var([2]);
                }
                break;
            case net.EventType.api_user_change_password_var:
                dialog_message.scuess("修改成功");
                myProxy.pageData.bShow = false;
                break;
            case net.EventType.api_public_area_code:
                myProxy.pageData.areaCode = body;
                break;
        }
    }
}
