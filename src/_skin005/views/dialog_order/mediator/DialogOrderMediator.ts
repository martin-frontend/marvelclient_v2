import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import OpenLink from "@/core/global/OpenLink";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

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
                        OpenLink(body);
                        myProxy.pageData.bShow = false;
                        MultDialogManager.onClosePanel();
                    } else {
                        myProxy.setData(body);
                    }
                }
                break;
        }
    }
}
