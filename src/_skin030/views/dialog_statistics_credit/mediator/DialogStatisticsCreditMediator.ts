import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogStatisticsCreditProxy from "../proxy/DialogStatisticsCreditProxy";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";

export default class DialogStatisticsCreditMediator extends AbstractMediator {
    private myProxy: DialogStatisticsCreditProxy = getProxy(DialogStatisticsCreditProxy);
    onRegister() {
        this.myProxy.enter();
    }
    onRemove() {
        this.myProxy.leave();
    }

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_credit_statistic, net.EventType.REQUEST_ERROR];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        //const myProxy:DialogStatisticsCreditProxy = getProxy(DialogStatisticsCreditProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_credit_statistic:
                this.myProxy.setData(body);
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.HttpType.api_user_var_credit_statistic.replace("{user_id}", core.user_id.toString())) {
                    this.myProxy.pageData.loading = false;
                }
                break;
        }
    }
}
