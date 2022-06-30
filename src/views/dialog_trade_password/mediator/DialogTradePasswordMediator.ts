import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";

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
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}