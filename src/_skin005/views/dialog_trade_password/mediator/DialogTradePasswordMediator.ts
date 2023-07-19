import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";

import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogTradePasswordMediator extends AbstractMediator {
    LangUtil = LangUtil;

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_change_password_gold_var,
            net.EventType.api_public_auth_code,
            net.EventType.REQUEST_ERROR,
            net.EventType.api_public_auth_drag,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_change_password_gold_var:
                myProxy.pageData.loading = false;
                myProxy.hide();
                PanelUtil.getProxy_selfproxy.api_user_show_var([2]);
                PanelUtil.message_success(LangUtil("操作成功"));
                break;
            case net.EventType.api_public_auth_code:
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.api_public_auth_drag:
                myProxy.setAuthDrag(body);
                break;
            case net.EventType.REQUEST_ERROR:
                if (body.url == net.getUrl(net.HttpType.api_user_change_password_gold_var, body.data)) {
                    myProxy.api_public_auth_code();
                }
                break;
        }
    }
}
