import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBindInviteProxy from "../proxy/DialogBindInviteProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogBindInviteMediator extends AbstractMediator {
    LangUtil = LangUtil;

    /**按日期获取业绩详情 */
    private getDetdail() {
        this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
    }
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_update_var,
            net.EventType.api_user_var_invite_user_info,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBindInviteProxy = getProxy(DialogBindInviteProxy);
        myProxy.pageData.loading = false;
        switch (notification.getName()) {
            case net.EventType.api_user_update_var:
                myProxy.hide();
                PanelUtil.message_success(LangUtil("操作成功"));
                this.getDetdail();
                break;
            case net.EventType.api_user_var_invite_user_info:

                myProxy.api_user_var_invite_user_info_callback(body);
                break;
        }
    }
}
