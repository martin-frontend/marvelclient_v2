import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogPledgeMediator extends AbstractMediator {
    private bonusProxy = PanelUtil.getProxy_page_bonus;
    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_deposit_stake];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPledgeProxy = getProxy(DialogPledgeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_deposit_stake:
                myProxy.pageData.loading = false;
                PanelUtil.message_alert(LangUtil("质押锁仓成功"));
                this.bonusProxy.api_user_var_stake_info();
                this.bonusProxy.api_plat_var_stake_info();
                myProxy.pageData.bShow = false;
                MultDialogManager.onClosePanel();
                break;
        }
    }
}
