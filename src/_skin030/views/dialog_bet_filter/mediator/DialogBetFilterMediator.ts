import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBetFilterProxy from "../proxy/DialogBetFilterProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBetFilterMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_direct_list, net.EventType.api_user_var_fetch_direct_user_info];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBetFilterProxy = getProxy(DialogBetFilterProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_list:
                myProxy.setTeamData(body);
                break;
            case net.EventType.api_user_var_fetch_direct_user_info:
                myProxy.setData(body);
                break;
        }
    }
}
