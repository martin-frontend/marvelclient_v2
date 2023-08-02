import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyAdduserProxy from "../proxy/DialogDirectlyAdduserProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogDirectlyAdduserMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [net.EventType.api_public_auth_code, net.EventType.REQUEST_ERROR, net.EventType.api_user_var_direct_register];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogDirectlyAdduserProxy = getProxy(DialogDirectlyAdduserProxy);
        myProxy.pageData.loading = false;
        // const dialogDirectly = PanelUtil.getProxy_directly;
        const dialogDirectly = PanelUtil.getProxy_agentmanager;

        switch (notification.getName()) {
            case net.EventType.api_public_auth_code:
                myProxy.pageData.auth_image = body;
                break;
            case net.EventType.REQUEST_ERROR:
                //console.log("验证码 错了", body)
                //if (body.url == net.HttpType.api_user_var_direct_register) {
                myProxy.api_public_auth_code();
                //}
                break;
            case net.EventType.api_user_var_direct_register: //添加用户的 回调
                myProxy.api_user_var_direct_registe_callback(body);
                dialogDirectly.api_user_var_agent_direct_list();
                myProxy.api_user_var_commission_commissiondetail();
                break;
        }
    }
}
