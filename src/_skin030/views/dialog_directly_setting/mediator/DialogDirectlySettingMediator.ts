import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlySettingProxy from "../proxy/DialogDirectlySettingProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogDirectlySettingMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_fetch_direct_user_info,
            net.EventType.api_user_var_agent_direct_user_update,
            net.EventType.api_user_var_agent_credit_transfer,
            net.EventType.api_user_var_agent_direct_deduction,
            net.EventType.api_user_var_agent_direct_list,
            net.EventType.api_user_var_agent_var_update,
            net.EventType.api_user_var_agent_direct_deduction_all,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlySettingProxy = getProxy(DialogDirectlySettingProxy);
        const dialog_agent_manager = PanelUtil.getProxy_agentmanager;
        switch (notification.getName()) {
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;
            case net.EventType.api_user_var_agent_direct_user_update: //刷新 用户信息
                myProxy.pageData.loading = false;
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                dialog_agent_manager.pageData.listQuery.page_count = 1;
                dialog_agent_manager.api_user_var_agent_direct_list();
                //console.log(" 收到刷新 下属 信息" ,body);
                break;
            case net.EventType.api_user_var_agent_direct_deduction: //扣款的回调
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
            case net.EventType.api_user_var_agent_credit_transfer: //加钱的回调
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
            case net.EventType.api_user_var_agent_direct_list:
                myProxy.setLimitinfo(body.limit);
                break;
            case net.EventType.api_user_var_agent_var_update: //修改备注回调
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                dialog_agent_manager.api_user_var_agent_direct_list();
                break;
            case net.EventType.api_user_var_agent_direct_deduction_all: //加钱的回调
                myProxy.api_user_var_agent_direct_deduction_all_callback(body);
                myProxy.api_user_var_fetch_direct_user_info(myProxy.playerInfo.user_id);
                break;
        }
    }
}
