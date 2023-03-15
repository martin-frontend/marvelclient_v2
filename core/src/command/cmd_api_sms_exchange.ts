/**
 * 收款方式发送短信
 */
module net {
    export class cmd_api_sms_exchange extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_sms_exchange, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_sms_exchange, result.data, result.extend.request_unique);
            }
        }
    }
}
