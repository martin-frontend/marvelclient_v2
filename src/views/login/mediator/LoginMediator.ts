import AbstractMediator from "@/core/abstract/AbstractMediator";
import SelfProxy from "@/proxy/SelfProxy";
import Message from "@/views/common/proxy/MessageProxy";
import LoginProxy from "../proxy/LoginProxy";

export default class LoginMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_login,
            net.EventType.api_user_register,
            net.EventType.api_user_reset_password,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const loginProxy: LoginProxy = this.getProxy(LoginProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_login:
                Message.show("登录成功");
                loginProxy.hideLogin();
                this.loginScuess(body);
                break;
            case net.EventType.api_user_register:
                Message.show("注册成功");
                loginProxy.hideRegister();
                this.loginScuess(body);
                break;
            case net.EventType.api_user_reset_password:
                Message.show("密码找回成功");
                loginProxy.forgetData.bShow = false;
                loginProxy.hideLogin();
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
