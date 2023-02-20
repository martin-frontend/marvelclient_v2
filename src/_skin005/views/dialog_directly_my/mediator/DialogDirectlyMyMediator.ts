import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyMyProxy from "../proxy/DialogDirectlyMyProxy";
import getProxy from "@/core/global/getProxy";
import { getTodayGMT } from "@/core/global/Functions";

export default class DialogDirectlyMyMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_short_chain, net.EventType.api_user_var_commission_commissiondetail];
    }
    private isToday(someDate: any) {
        const today = getTodayGMT();
        const [year, month, day] = someDate.split("-");
        return Number(day) == today.getDate() && Number(month) == today.getMonth() + 1 && Number(year) == today.getFullYear();
    }
    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyMyProxy = getProxy(DialogDirectlyMyProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                // this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
                myProxy.api_user_var_short_chain();
                if (this.isToday(body.date)) {
                    myProxy.setData(body);
                }
                break;
            case net.EventType.api_user_var_short_chain:
                myProxy.setLink(body.url);
                break;
        }
    }
}
