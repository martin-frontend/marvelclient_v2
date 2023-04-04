import GlobalVar from "@/core/global/GlobalVar";
import { GTM } from "../GoogleTagManager";
import SkinVariable from "../SkinVariable";

export default class RequestEndCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        // GlobalVar.net_status.loading = false;
        const body = notification.getBody();
        try {
            const json = JSON.parse(body.result);
            GlobalVar.server_time = json.extend.microtime >> 0;
        } catch (e: any) {
            console.log(body);
        }

        if (SkinVariable.useGTM) {
            const { url, data, result } = body;
            // 5， 6， 9, 19
            if (url == net.HttpType.api_user_register) {
                GTM.RegistrationSuccess(result.phone || result.email || result.username, result.user_id);
            } else if (url == net.HttpType.api_user_login) {
                GTM.loginSuccess(result.phone || result.email || result.username, result.user_id);
            } else if (url == net.getUrl(net.HttpType.api_user_update_var, data)) {
                if (data.real_name) {
                    GTM.SetAccountName(core.user_id.toString());
                }
            } else if (url == net.getUrl(net.HttpType.api_user_var_exchange_create_order, data)) {
                GTM.withdrawalRequested(core.user_id.toString(), data.amount, data.coin_name_unique);
            }
        }
    }
}
