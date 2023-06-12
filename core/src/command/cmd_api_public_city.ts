/**
 * 获取城市
 */
module net {
    export class cmd_api_public_city extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_public_city, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_public_city, result.data, result.extend.request_unique);
            }
        }
    }
}
