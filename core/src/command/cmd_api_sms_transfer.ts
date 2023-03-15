/**
 * 金币划转发送短信
 */
module net {
    export class cmd_api_sms_transfer extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_sms_transfer, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_sms_transfer, result.data, result.extend.request_unique);
            }
        }
    }
}
