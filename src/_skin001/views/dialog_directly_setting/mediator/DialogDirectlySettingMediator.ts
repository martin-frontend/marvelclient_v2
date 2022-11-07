import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlySettingProxy from "../proxy/DialogDirectlySettingProxy";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyProxy from "@/_skin001/views/dialog_directly/proxy/DialogDirectlyProxy";

export default class DialogDirectlySettingMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_fetch_direct_user_info, net.EventType.api_user_var_agent_direct_user_update, net.EventType.api_user_var_agent_direct_deduction];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlySettingProxy = getProxy(DialogDirectlySettingProxy);
        const dialogDirectly: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);

        switch (notification.getName()) {
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_agent_direct_user_update: //刷新 用户信息
                myProxy.pageData.loading = false;
                dialogDirectly.api_user_var_agent_direct_list();
                //console.log(" 收到刷新 下属 信息" ,body);
                break;
            case net.EventType.api_user_var_agent_direct_deduction: //扣款的回调
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
        }
    }
}