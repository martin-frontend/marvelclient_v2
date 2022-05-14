import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRegisterProxy from "../proxy/DialogRegisterProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogRegisterMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_register];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogRegisterProxy = getProxy(DialogRegisterProxy);
        switch(notification.getName()){
            case net.EventType.api_user_register:
                dialog_message.scuess("注册成功");
                this.loginScuess(body);
                break;
        }
    }

    private loginScuess(body: any) {
        core.token = body.token;
        core.user_id = body.user_id;

        window.localStorage.setItem("token", core.token);
        window.localStorage.setItem("user_id", core.user_id.toString());
        window.localStorage.setItem("username", body.username);

        const selfProxy: SelfProxy = this.getProxy(SelfProxy);
        selfProxy.api_user_show_var([2, 3, 6]);
    }
}