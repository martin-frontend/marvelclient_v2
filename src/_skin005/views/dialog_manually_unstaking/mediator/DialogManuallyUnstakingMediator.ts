import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogManuallyUnstakingMediator extends AbstractMediator {
    private bonusProxy = PanelUtil.getProxy_page_bonus;

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_withdraw_stake];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_withdraw_stake:
                myProxy.pageData.loading = false;
                PanelUtil.message_alert("解除质押数量" + body);
                PanelUtil.getProxy_page_bonus;
                this.bonusProxy.api_user_var_stake_info();
                this.bonusProxy.api_plat_var_stake_info();
                myProxy.pageData.bShow = false;
                MultDialogManager.onClosePanel();
                break;
        }
    }
}
