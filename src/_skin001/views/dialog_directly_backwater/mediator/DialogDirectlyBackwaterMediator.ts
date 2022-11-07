import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyBackwaterProxy from "../proxy/DialogDirectlyBackwaterProxy";
import getProxy from "@/core/global/getProxy";
import DialogDirectlySettingProxy from "../../dialog_directly_setting/proxy/DialogDirectlySettingProxy";

export default class DialogDirectlyBackwaterMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_direct_user_update ,net.EventType.api_user_var_fetch_direct_user_info];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogDirectlyBackwaterProxy = getProxy(DialogDirectlyBackwaterProxy);

        const setProxy:DialogDirectlySettingProxy = getProxy(DialogDirectlySettingProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_user_update: //刷新 用户信息
                myProxy.pageData.loading = false;
                //console.log(" 收到刷新 下属 信息" ,body);
                setProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;
        }
    }
}