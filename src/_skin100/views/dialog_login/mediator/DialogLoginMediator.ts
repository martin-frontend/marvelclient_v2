import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogLoginProxy from "../proxy/DialogLoginProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/_skin100/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";
import LangUtil from "@/core/global/LangUtil";

export default class DialogLoginMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_login, net.EventType.api_user_reset_password, net.EventType.api_public_area_code];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogLoginProxy = getProxy(DialogLoginProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_login:
                dialog_message.success(LangUtil("登录成功"));
                myProxy.hide();
                this.loginSuccess(body);
                break;
            case net.EventType.api_user_reset_password:
                dialog_message.success(LangUtil("密码找回成功"));
                myProxy.show();
                break;
            case net.EventType.api_public_area_code:
                myProxy.forgetData.areaCode = body;
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
    }
}
