import { TrackEventMap, track } from "@/_skin005/core/TrackManager";

export default class RequestStartCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const { url, data } = notification.getBody();

        switch (url) {
            case net.getUrl(net.HttpType.api_user_var_recharge_create, data):
                track(TrackEventMap.AddCashClick, {
                    amount: data.amount,
                    coin_name_unique: data.coin_name_unique,
                    recharge_channel_id: data.recharge_channel_id,
                });
                break;
            case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                track(TrackEventMap.withdrawalRequested, {
                    amount: data.amount,
                    coin_name_unique: data.coin_name_unique,
                    exchange_channel_id: data.exchange_channel_id,
                });
                break;
        }
    }
}
