/**
 * 获取热门彩票数据
 */
module net {
    export class cmd_api_vendor_267_products extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_vendor_267_products, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_vendor_267_products, result.data, result.extend.request_unique);
            }
        }
    }
}
