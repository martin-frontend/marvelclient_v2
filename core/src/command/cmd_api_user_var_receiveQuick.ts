/**
 * 一键领取所有邮件对应的奖励
 */
module net {
    export class cmd_api_user_var_receiveQuick extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_receiveQuick, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_receiveQuick, result.data, result.extend.request_unique);
            }
        }
    }
}
