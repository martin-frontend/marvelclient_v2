import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDailySignProxy from "../proxy/DialogDailySignProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogDailySignMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_sign_store,
            net.EventType.api_plat_activity_var_receive,
            net.EventType.api_plat_sign_index,

        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogDailySignProxy = getProxy(DialogDailySignProxy);
        if (!myProxy.pageData.bShow)
        {
            return;
        }
        switch(notification.getName()){
            case net.EventType.api_user_var_sign_store:  /**--活动--每日签到*/
                myProxy.pageData.loading = false;
                myProxy.api_user_var_sign_store_callback(body);
                myProxy.api_plat_sign_index();
                break;
            case net.EventType.api_plat_activity_var_receive: /**--活动--领取用户签到奖励*/
                console.log("  领取签1111到奖励---",body);
                break;
                case net.EventType.api_plat_sign_index: /**--活动--领取用户签到奖励*/
                console.log("  领取签2222到奖励---",body);
                myProxy.setData(body);
                break;
        }
    }
}