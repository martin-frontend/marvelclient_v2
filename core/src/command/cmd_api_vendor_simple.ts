/**
 * 获取厂商列表
 */
module net {
    export class cmd_api_vendor_simple extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_vendor_simple, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_vendor_simple, result.data, result.unique);
            }
        }
    }
}
