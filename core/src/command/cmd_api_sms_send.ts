/**
 * 发送短信 [验证码和获取注册验证码调用同一方法即可]
 */
module net {
    export class cmd_api_sms_send extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_sms_send, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_sms_send, result.data);
            }
        }
    }
}
