import GlobalVar from "@/core/global/GlobalVar";
import { TrackEventMap, track } from "@/_skin005/core/TrackManager";

export default class RequestEndCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        let json: any;
        try {
            json = JSON.parse(body.result);
            GlobalVar.server_time = json.extend.microtime >> 0;
        } catch (e: any) {
            console.log(body);
        }

        const { url, data } = body;
        if (json) {
            switch (url) {
                // case net.HttpType.api_user_register:
                //     {
                //         const { phone, email, username, user_id } = json.data;
                //         track(TrackEventMap.RegistrationSuccess, { phone, email, username, user_id });
                //     }
                //     break;
                case net.HttpType.api_user_login:
                    {
                        const { phone, email, username, user_id } = json.data;
                        track(TrackEventMap.loginSuccess, { phone, email, username, user_id });
                    }
                    break;
                case net.getUrl(net.HttpType.api_user_update_var, data):
                    if (data.real_name) {
                        track(TrackEventMap.SetAccountName, { user_id: core.user_id, account_name: data.real_name });
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
}
