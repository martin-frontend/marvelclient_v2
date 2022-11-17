import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyEasybetsetProxy from "../proxy/DialogDirectlyEasybetsetProxy";
import getProxy from "@/core/global/getProxy";


export default class DialogDirectlyEasybetsetMediator extends AbstractMediator{

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_agent_direct_user_update ,
            net.EventType.api_user_var_fetch_direct_user_info,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogDirectlyEasybetsetProxy = getProxy(DialogDirectlyEasybetsetProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_user_update: //刷新 用户信息
                myProxy.pageData.loading = false;
                myProxy.agent_direct_user_update_callback();
                myProxy.api_user_var_fetch_direct_user_info();
                break;
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;
        }
    }
}