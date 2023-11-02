import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyGamesetProxy from "../proxy/DialogDirectlyGamesetProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyGamesetMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyGamesetProxy = getProxy(DialogDirectlyGamesetProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_user_update: //刷新 用户信息
                myProxy.pageData.loading = false;
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;
        }
    }
}
