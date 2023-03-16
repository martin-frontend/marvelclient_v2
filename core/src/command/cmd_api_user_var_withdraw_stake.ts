/**
 * 用户手动解质押
 */
module net {
    export class cmd_api_user_var_withdraw_stake extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_withdraw_stake, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_withdraw_stake, result.data, result.extend.request_unique);
            }
        }
    }
}
