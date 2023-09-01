import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDailyTaskProxy from "../proxy/DialogDailyTaskProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogDailyTaskMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity_index_everyday,
            net.EventType.api_plat_activity_var_receive,
            net.HttpType.api_user_var_sign_store,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDailyTaskProxy = getProxy(DialogDailyTaskProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_index_everyday:
                myProxy.setData(body);
                break;
            case net.EventType.api_plat_activity_var_receive:
                myProxy.setReward(body);
                break;
            case net.HttpType.api_user_var_sign_store:
                {
                    PanelUtil.showAppLoading(false);
                    myProxy.api_plat_activity_index_everyday();
                }

                break;
        }
    }
}
