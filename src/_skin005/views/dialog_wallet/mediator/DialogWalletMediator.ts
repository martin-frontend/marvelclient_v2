import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogWalletProxy from "../proxy/DialogWalletProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogWalletMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_show_var, net.EventType.api_user_var_vendor_withdraw, net.EventType.api_user_show_var_gold];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
        if (!myProxy.pageData.bShow) return;
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                //  myProxy.pageData.loading = false;
                myProxy.pageData.gold_info = body.gold_info;
                //myProxy.setGoldTestData();
                break;
            case net.EventType.api_user_var_vendor_withdraw:
                PanelUtil.message_success(LangUtil("提取成功"));
                myProxy.api_user_show_var();
                break;
            case net.EventType.api_user_show_var_gold:
                myProxy.pageData.loading = false;
                myProxy.setData(body);
                break;
        }
    }
}
