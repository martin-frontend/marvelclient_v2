import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRealNameProxy from "../proxy/DialogRealNameProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogRealNameMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_update_var];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRealNameProxy = getProxy(DialogRealNameProxy);
        if (!myProxy.pageData.bShow) return;
        switch (notification.getName()) {
            case net.EventType.api_user_update_var:
                {
                    myProxy.pageData.loading = false;
                    myProxy.hide();
                    const selfProxy: SelfProxy = getProxy(SelfProxy);
                    selfProxy.api_user_show_var([2]);
                    PanelUtil.message_success(LangUtil("操作成功"));
                }
                break;
        }
    }
}
