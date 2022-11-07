import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyTransferProxy from "../proxy/DialogDirectlyTransferProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDirectlyTransferMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_agent_direct_deduction];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogDirectlyTransferProxy = getProxy(DialogDirectlyTransferProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_agent_direct_deduction: //扣款的回调
                myProxy.agent_direct_deduction_call_back(body);

                break;
        }

    }
}