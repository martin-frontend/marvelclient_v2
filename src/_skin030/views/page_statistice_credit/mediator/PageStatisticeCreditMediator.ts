import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageStatisticeCreditProxy from "../proxy/PageStatisticeCreditProxy";
import getProxy from "@/core/global/getProxy";
import { getTodayGMT } from "@/core/global/Functions";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class PageStatisticeCreditMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageStatisticeCreditProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_short_chain,
            net.EventType.api_user_var_commission_commissiondetail,
            net.EventType.api_user_var_credit_dividend_period,
        ];
    }
    private isToday(someDate: any) {
        if (!someDate || !someDate.trim()) return false;
        const today = getTodayGMT();
        const [year, month, day] = someDate.split("-");
        return Number(day) == today.getDate() && Number(month) == today.getMonth() + 1 && Number(year) == today.getFullYear();
    }
    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageStatisticeCreditProxy = getProxy(PageStatisticeCreditProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                // this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
                console.log("----  my  --- send");
                myProxy.api_user_var_short_chain();
                if (this.isToday(body.date)) {
                    myProxy.setCommisiondetailData(body);
                }
                break;
            case net.EventType.api_user_var_short_chain:
                myProxy.setLink(body.url);
                break;
            case net.EventType.api_user_var_credit_dividend_period:
                myProxy.setcredit_dividend_period(body);
                break;
        }
    }
}
