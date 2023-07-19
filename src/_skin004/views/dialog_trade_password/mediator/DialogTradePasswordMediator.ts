import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogTradePasswordMediator extends AbstractMediator {
    private selfProxy: SelfProxy = getProxy(SelfProxy);
    LangUtil = LangUtil;

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_change_password_gold_var,
            net.EventType.api_public_auth_code,
            net.EventType.REQUEST_ERROR,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogTradePasswordProxy = getProxy(DialogTradePasswordProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_change_password_gold_var:
                myProxy.pageData.loading = false;
                myProxy.hide();
                this.selfProxy.api_user_show_var([2]);
                dialog_message.success(LangUtil("操作成功"));
                break;
            case net.EventType.api_public_auth_code:
                myProxy.pageData.loading = false;
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.REQUEST_ERROR:
                myProxy.pageData.loading = false;
                if (body.url == net.getUrl(net.HttpType.api_user_change_password_gold_var, body.data)) {
                    myProxy.api_public_auth_code();
                }
                break;
        }
    }
}