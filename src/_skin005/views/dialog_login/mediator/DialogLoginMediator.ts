import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogLoginProxy from "../proxy/DialogLoginProxy";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogLoginMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_login,
            net.EventType.api_user_reset_password,
            net.EventType.api_public_area_code,
            net.EventType.api_user_login_check,
            net.EventType.REQUEST_ERROR,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogLoginProxy = getProxy(DialogLoginProxy);

        switch (notification.getName()) {
            case net.EventType.api_user_login:
                myProxy.pageData.loading = false;
                PanelUtil.message_success(LangUtil("登录成功"));
                if (myProxy.pageData.is_login_need_google == 1) {
                    PanelUtil.openpanel_google_verification(false);
                }
                myProxy.hide();
                this.loginSuccess(body);
                break;
            case net.EventType.api_user_reset_password:
                myProxy.pageData.loading = false;
                PanelUtil.message_success(LangUtil("密码找回成功"));
                myProxy.show();
                break;
            case net.EventType.api_public_area_code:
                myProxy.forgetData.areaCode = body;
                break;
            case net.EventType.api_user_login_check:
                myProxy.pageData.loading = false;
                myProxy.pageData.is_login_need_google = body.is_login_need_google;
                if (body.is_login_need_google == 1) {
                    PanelUtil.openpanel_google_verification();
                } else {
                    myProxy.api_user_login();
                }
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.HttpType.api_user_login) {
                    myProxy.pageData.loading = false;
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

        const selfProxy: SelfProxy = this.getProxy(SelfProxy);
        selfProxy.api_user_show_var([2, 3, 6]);
        //PanelUtil.openpage_home();
        //location.reload();

    }
}
