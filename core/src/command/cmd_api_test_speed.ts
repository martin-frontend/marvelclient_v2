/**
 * 检测接口速度
 */
module net {
    export class cmd_api_test_speed extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_test_speed, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_test_speed, result.data, result.extend.request_unique);
            }
        }
    }
}
