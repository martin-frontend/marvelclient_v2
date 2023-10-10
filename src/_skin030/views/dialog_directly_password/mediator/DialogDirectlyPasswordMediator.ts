import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyPasswordProxy from "../proxy/DialogDirectlyPasswordProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyPasswordMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_direct_user_update];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyPasswordProxy = getProxy(DialogDirectlyPasswordProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_user_update: //查询 用户信息
                myProxy.agent_direct_user_update_callback(body);
                break;
        }
    }
}
