import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPledgeProxy from "../proxy/DialogPledgeProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message_box from "@/views/dialog_message_box";
import PageBonusProxy from "../../page_bonus/proxy/PageBonusProxy";
import LangUtil from "@/core/global/LangUtil";

export default class DialogPledgeMediator extends AbstractMediator {
    private bonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);

    public listNotificationInterests(): string[] {
        return [net.EventType.api_user_var_deposit_stake];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPledgeProxy = getProxy(DialogPledgeProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_deposit_stake:
                myProxy.pageData.loading = false;
                dialog_message_box.alert(LangUtil("质押锁仓成功"));
                this.bonusProxy.api_user_var_stake_info();
                this.bonusProxy.api_plat_var_stake_info();
                myProxy.pageData.bShow = false;
                break;
        }
    }
}
