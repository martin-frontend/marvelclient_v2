import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogOrderMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_vendor_var_bet_log_detail];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogOrderProxy = getProxy(DialogOrderProxy);
        switch (notification.getName()) {
            case net.EventType.api_vendor_var_bet_log_detail:
                {
                    PanelUtil.showAppLoading(false);
                    // myProxy.pageData.url = body;
                    myProxy.pageData.isHaveData = true;
                    if (typeof body == "string") {
                        myProxy.pageData.url = body;
                    } else {
                        myProxy.setData(body);
                    }
                }
                break;
        }
    }
}
