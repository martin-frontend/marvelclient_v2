/**
 * 重置密码发送短信
 */
module net {
    export class cmd_api_sms_reset_password_sent extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_sms_reset_password_sent, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_sms_reset_password_sent, result.data, result.unique);
            }
        }
    }
}
