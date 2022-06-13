import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import getProxy from "@/core/global/getProxy";
import DialogBindInviteProxy from "@/views/dialog_bind_invite/proxy/DialogBindInviteProxy";
import dialog_message from "@/views/dialog_message";
import LangUtil from "@/core/global/LangUtil";
export default class PageExtensionMediator extends AbstractMediator {
    private myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    private bindInviteproxy: DialogBindInviteProxy = getProxy(DialogBindInviteProxy);
    LangUtil = LangUtil;

    protected initViewData(): void {
        this.myProxy.api_user_var_short_chain();
        this.myProxy.api_user_var_commission_commissiondetail();
        this.myProxy.api_user_var_commission_commissionnum();
    }

    /**按日期获取业绩详情 */
    private getDetdail() {
        this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
    }

    private isToday(someDate: any) {
        const today = new Date();
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
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageExtensionProxy = getProxy(PageExtensionProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_commission_commissiondetail:
                this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id });
                if (this.isToday(body.date)) {
                    this.myProxy.setData(body);
                }
                break;
            case net.EventType.api_user_var_commission_commissionnum:
                this.myProxy.setCommissionCommissionnum(body);
                break;
            case net.EventType.api_user_var_short_chain:
                this.myProxy.setLink(body.url);
                break;
            case net.EventType.api_user_update_var:
                this.bindInviteproxy.hide();
                dialog_message.success(LangUtil("操作成功"));
                this.getDetdail();
                break;
            case net.EventType.api_user_var_commission_receive:
                this.myProxy.api_user_var_commission_commissiondetail();
                dialog_message.success(LangUtil("领取成功"));
                break;
        }
    }
}
