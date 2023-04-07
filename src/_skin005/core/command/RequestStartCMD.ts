import { FlayerLog } from "../AppsFlyerLog";
import { GTM } from "../GoogleTagManager";
import SkinVariable from "../SkinVariable";

export default class RequestStartCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const { url, data } = notification.getBody();
        if (SkinVariable.useGTM) {
            switch (url) {
                case net.getUrl(net.HttpType.api_user_var_recharge_create, data):
                    GTM.AddCashClick();
                    break;
                case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                    GTM.withdrawalRequested(core.user_id.toString(), data.amount, data.coin_name_unique);
                    break;
            }
        }
        if (core.app_type == core.EnumAppType.APP && SkinVariable.useFlyerLog) {
            switch (url) {
                case net.getUrl(net.HttpType.api_user_var_recharge_create, data):
                    FlayerLog.AddCashClick();
                    break;
                case net.getUrl(net.HttpType.api_user_var_exchange_create_order, data):
                    FlayerLog.withdrawalRequested(core.user_id.toString(), data.amount, data.coin_name_unique, data.exchange_channel_id);
                    break;
            }
        }
    }
}
