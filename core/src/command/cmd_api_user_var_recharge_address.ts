/**
 * 获取数字货币充值地址
 */
module net {
    export class cmd_api_user_var_recharge_address extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_recharge_address, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_recharge_address, result.data, result.unique);
            }
        }
    }
}
