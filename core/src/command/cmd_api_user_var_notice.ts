/**
 * 充值弹窗列表（需登入）
 */
module net {
    export class cmd_api_user_var_notice extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_notice, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_notice, result.data, result.extend.request_unique);
            }
        }
    }
}
