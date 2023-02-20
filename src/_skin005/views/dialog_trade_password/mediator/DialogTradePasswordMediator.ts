import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";

import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogTradePasswordMediator extends AbstractMediator {
    LangUtil = LangUtil;

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_change_password_gold_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_change_password_gold_var:
                myProxy.pageData.loading = false;
                myProxy.hide();
                PanelUtil.getProxy_selfproxy.api_user_show_var([2]);
                PanelUtil.message_success(LangUtil("操作成功"));
                break;
        }
    }
}