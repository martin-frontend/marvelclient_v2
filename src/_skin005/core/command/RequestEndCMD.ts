import GlobalVar from "@/core/global/GlobalVar";
import { TrackEventMap, track } from "@/_skin005/core/TrackManager";

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
        switch (url) {
            case net.HttpType.api_user_register:
                {
                    const { phone, email, username, user_id } = result.data;
                    track(TrackEventMap.RegistrationSuccess, { phone, email, username, user_id });
                }
                break;
            case net.HttpType.api_user_login:
                {
                    const { phone, email, username, user_id } = result.data;
                    track(TrackEventMap.loginSuccess, { phone, email, username, user_id });
                }
                break;
            case net.getUrl(net.HttpType.api_user_update_var, data):
                if (data.real_name) {
                    track(TrackEventMap.SetAccountName);
                }
                break;
            case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                track(TrackEventMap.withdrawalRequested, {
                    amount: data.amount,
                    coin_name_unique: data.coin_name_unique,
                });
                break;
        }
    }
}
