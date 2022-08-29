import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyProxy from "../proxy/DialogDirectlyProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyMediator extends AbstractMediator {
    private myProxy: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    initViewData() {}

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_var_statistic_promotion];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_var_statistic_promotion:
                this.myProxy.setData(body);
                break;
            case net.EventType.api_user_var_agent_var_floor_range:
                // this.myProxy.setFloorRangeData(body);
                break;
        }
    }
}
