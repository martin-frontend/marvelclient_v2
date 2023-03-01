import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogEditRemarkProxy from "../proxy/DialogEditRemarkProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogEditRemarkMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_agent_var_update,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogEditRemarkProxy = getProxy(DialogEditRemarkProxy);
        
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_var_update: //查询 用户信息
                myProxy.update_callback(body);
                break;
        }
    }
}
