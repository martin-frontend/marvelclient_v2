import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { getTodayGMT } from "@/core/global/Functions";
import PanelUtil from "@/_skin030/core/PanelUtil";
export default class PageExtensionMediator extends AbstractMediator {
    private myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    LangUtil = LangUtil;

    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageExtensionProxy.NAME);
    }

    protected initViewData(): void {
        console.log("-------initViewData---- ");
        //this.myProxy.api_user_var_short_chain();
        this.myProxy.api_user_var_commission_commissiondetail();
        this.myProxy.api_user_var_commission_commissionnum();
    }

    private isToday(someDate: any) {
        const today = getTodayGMT();
        const [year, month, day] = someDate.split("-");
        return Number(day) == today.getDate() && Number(month) == today.getMonth() + 1 && Number(year) == today.getFullYear();
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_commission_commissiondetail,
            net.EventType.api_user_var_commission_commissionnum,
            net.EventType.api_user_var_short_chain,
            net.EventType.api_user_update_var,
            net.EventType.api_user_var_commission_receive,
            net.EventType.api_plat_var_promotion_config,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageExtensionProxy = getProxy(PageExtensionProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                // this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
                this.myProxy.api_user_var_short_chain();
                console.log("-------extension-----send");
                //if (this.isToday(body.date)) {
                this.myProxy.setData(body);
                //}
                break;
            case net.EventType.api_user_var_commission_commissionnum:
                myProxy.setCommissionCommissionnum(body);
                break;
            case net.EventType.api_user_var_short_chain:
                myProxy.setLink(body.url);
                break;
            case net.EventType.api_user_var_commission_receive:
                myProxy.api_user_var_commission_commissiondetail();
                PanelUtil.message_success(LangUtil("领取成功"));

                break;
            case net.EventType.api_plat_var_promotion_config:
                console.log(" 配置信息回复", body);
                myProxy.setPromotionConfig(body);
                break;
        }
    }
}
