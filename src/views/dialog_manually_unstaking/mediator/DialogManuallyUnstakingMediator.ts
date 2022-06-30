import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogManuallyUnstakingProxy from "../proxy/DialogManuallyUnstakingProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message_box from "@/views/dialog_message_box";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";

export default class DialogManuallyUnstakingMediator extends AbstractMediator {
    private bonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_withdraw_stake];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_withdraw_stake:
                myProxy.pageData.loading = false;
                dialog_message_box.alert("解除质押数量" + body);
                this.bonusProxy.api_user_var_stake_info();
                this.bonusProxy.api_plat_var_stake_info();
                myProxy.pageData.bShow = false;
                break;
        }
    }
}
