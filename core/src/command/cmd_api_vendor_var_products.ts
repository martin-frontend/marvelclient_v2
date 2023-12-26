/**
 * 获取热门数据,上面两个合成一个
 */
module net {
    export class cmd_api_vendor_var_products extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_vendor_var_products, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_vendor_var_products, result.data, result.extend.request_unique);
            }
        }
    }
}
