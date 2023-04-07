import GlobalVar from "@/core/global/GlobalVar";
import { GTM } from "../GoogleTagManager";
import SkinVariable from "../SkinVariable";
import { FlayerLog } from "../AppsFlyerLog";

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

        const { url, data } = body;
        const result = JSON.parse(body.result);
        if (SkinVariable.useGTM) {
            switch (url) {
                case net.HttpType.api_user_register:
                    {
                        const { phone, email, username, user_id } = result.data;
                        GTM.RegistrationSuccess(phone || email || username, user_id);
                    }
                    break;
                case net.HttpType.api_user_login:
                    {
                        const { phone, email, username, user_id } = result.data;
                        GTM.loginSuccess(phone || email || username, user_id);
                    }
                    break;
                case net.getUrl(net.HttpType.api_user_update_var, data):
                    if (data.real_name) {
                        GTM.SetAccountName(core.user_id.toString());
                    }
                    break;
                case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                    GTM.withdrawalRequested(core.user_id.toString(), data.amount, data.coin_name_unique);
                    break;
            }
        }

        if (core.app_type == core.EnumAppType.APP && SkinVariable.useFlyerLog) {
            switch (url) {
                case net.HttpType.api_user_register:
                    {
                        const { phone, email, username, user_id } = result.data;
                        FlayerLog.RegistrationSuccess(phone || email || username, user_id);
                    }
                    break;
                case net.HttpType.api_user_login:
                    {
                        const { phone, email, username, user_id } = result.data;
                        FlayerLog.loginSuccess(phone || email || username, user_id);
                    }
                    break;
                case net.getUrl(net.HttpType.api_user_update_var, data):
                    if (data.real_name) {
                        FlayerLog.SetAccountName(core.user_id.toString(), data.real_name);
                    }
                    break;
                case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                    FlayerLog.withdrawalRequested(core.user_id.toString(), data.amount, data.coin_name_unique, 0);
                    break;
            }
        }
    }
}
