import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import getProxy from "@/core/global/getProxy";
import dialog_message_box from "@/views/dialog_message_box";
import LangUtil from "@/core/global/LangUtil";

export default class PageBonusMediator extends AbstractMediator {
    private myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    LangUtil = LangUtil;

    protected initViewData(): void {
        this.myProxy.api_plat_var_stake_info();
        this.myProxy.api_user_var_stake_info();
        this.myProxy.api_plat_var_bonus_recently();
        this.myProxy.api_plat_var_bonus_rank();
        this.myProxy.api_plat_var_bonus_log();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_stake_info,
            net.EventType.api_user_var_stake_info,
            net.EventType.api_plat_var_bonus_rank,
            net.EventType.api_plat_var_bonus_recently,
            net.EventType.api_plat_var_bonus_log,
            net.EventType.api_user_var_bonus_log,
            net.EventType.api_user_var_stake_draw,
            net.EventType.api_user_var_mail_var_receive,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageBonusProxy = getProxy(PageBonusProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_stake_info:
                this.myProxy.setPlatData(body);
                break;
            case net.EventType.api_user_var_stake_info:
                this.myProxy.setUserData(body);
                break;
            case net.EventType.api_plat_var_bonus_rank:
                this.myProxy.setBonusRank(body);
                break;
            case net.EventType.api_plat_var_bonus_recently:
                this.myProxy.setBonusRecently(body);
                break;
            case net.EventType.api_plat_var_bonus_log:
                this.myProxy.setPlatBonus(body);
                break;
            case net.EventType.api_user_var_bonus_log:
                this.myProxy.setUserBonus(body);
                break;
            case net.EventType.api_user_var_stake_draw:
                dialog_message_box.alert(LangUtil("成功领取分红") + body);
                this.myProxy.api_user_var_stake_info();
                break;
            case net.EventType.api_user_var_mail_var_receive:
                this.myProxy.api_user_var_stake_info();
                break;
        }
    }
}
