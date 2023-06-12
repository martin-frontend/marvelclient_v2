import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogPlatUsersVerificationProxy from "../proxy/DialogPlatUsersVerificationProxy";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogPlatUsersVerificationMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_var_plat_users_verification_show,
            net.EventType.api_user_var_plat_users_verification_save,
            net.EventType.api_public_country,
            net.EventType.api_public_city,
            // net.EventType.api_public_area_code,
            net.EventType.api_public_all_area_code,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogPlatUsersVerificationProxy = getProxy(DialogPlatUsersVerificationProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_var_plat_users_verification_show:
                myProxy.setData(body);
                break;
            case net.EventType.api_public_country:
                myProxy.setCountryList(body);
                break;
            case net.EventType.api_public_city:
                myProxy.pageData.loading = false;
                myProxy.setCityList(body);
                break;
            case net.EventType.api_public_all_area_code:
                myProxy.setAreaCodeList(body);
                break;
            case net.EventType.api_user_var_plat_users_verification_save:
                myProxy.pageData.loading = false;
                PanelUtil.message_success(LangUtil("提交成功"));
                myProxy.pageData.list.status = 3;
                myProxy.hide();
                myProxy.api_user_var_plat_users_verification_show();
                break;
        }
    }
}
