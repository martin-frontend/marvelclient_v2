import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyTransferProxy from "../proxy/DialogDirectlyTransferProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyTransferMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_agent_direct_deduction,
            net.EventType.api_user_var_agent_credit_transfer,
            net.EventType.api_user_var_fetch_direct_user_info,
            net.EventType.api_user_show_var
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyTransferProxy = getProxy(DialogDirectlyTransferProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_deduction: //扣款的回调
                myProxy.agent_direct_deduction_call_back(body);
                break;
            case net.EventType.api_user_var_agent_credit_transfer: //加钱的回调
                myProxy.api_user_var_agent_credit_transfer_call_back(body);
                break;
            case net.EventType.api_user_show_var: //增加金币模式才会接受 玩家 信息刷新值
                if (myProxy.pageData.isAddMode) {
                    console.log("接受玩家信息刷新值");

                    myProxy.setUserData(body);
                }
                break;
            case net.EventType.api_user_var_fetch_direct_user_info: //查询 用户信息
                myProxy.setData(body);
                break;

        }

    }
}