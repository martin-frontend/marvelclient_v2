/**
 * 货币互转取得即時匯率
 */
module net {
    export class cmd_api_user_coin_exchange_scale_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_coin_exchange_scale_var, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_coin_exchange_scale_var, result.data, result.extend.request_unique);
            }
        }
    }
}
