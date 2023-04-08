import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogAgentManagerProxy from "../proxy/DialogAgentManagerProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogAgentManagerMediator extends AbstractMediator {
    private myProxy: DialogAgentManagerProxy = getProxy(DialogAgentManagerProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    initViewData() {}

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_direct_list, net.EventType.api_user_var_agent_var_floor_range];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_list:
                this.myProxy.setData(body);
                break;
            case net.EventType.api_user_var_agent_var_floor_range:
                // this.myProxy.setFloorRangeData(body);
                break;
        }
    }
}
