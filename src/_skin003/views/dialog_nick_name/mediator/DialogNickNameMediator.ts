import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogNickNameMediator extends AbstractMediator {
    private selfProxy: SelfProxy = getProxy(SelfProxy);
    LangUtil = LangUtil;
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_update_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogNickNameProxy = getProxy(DialogNickNameProxy);
        if (!myProxy.pageData.bShow) {
            return;
        }
        switch (notification.getName()) {
            case net.EventType.api_user_update_var:
                myProxy.pageData.loading = false;
                myProxy.hide();
                this.selfProxy.api_user_show_var([2]);
                dialog_message.success(LangUtil("操作成功"));
                break;
        }
    }
}
