/**
 * 币商充值订单确认转账
 */
module net {
    export class cmd_api_user_var_coin_recharge_confirm extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_coin_recharge_confirm, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_coin_recharge_confirm, result.data, result.extend.request_unique);
            }
        }
    }
}
