import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogRegisterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_register,
            net.EventType.api_public_auth_code,
            net.EventType.api_public_area_code,
            net.EventType.REQUEST_ERROR,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRegisterProxy = getProxy(DialogRegisterProxy);
        //const headerProxy: HeaderProxy = this.getProxy(HeaderProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_register:
                PanelUtil.message_success(LangUtil("注册成功"));
                myProxy.pageData.bShow = false;
                MultDialogManager.onClosePanel();
                this.loginSuccess(body);
                //headerProxy.openMenu();
                break;
            case net.EventType.api_public_auth_code:
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.api_public_area_code:
                myProxy.pageData.areaCode = body;
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.HttpType.api_user_register) {
                    myProxy.api_public_auth_code();
                }
                break;
        }
    }

    private loginSuccess(body: any) {
        core.token = body.token;
        core.user_id = body.user_id;

        window.localStorage.setItem("token", core.token);
        window.localStorage.setItem("user_id", core.user_id.toString());
        window.localStorage.setItem("username", body.username);

        const selfProxy = PanelUtil.getProxy_selfproxy;
        selfProxy.api_user_show_var([2, 3, 6]);
    }
}
