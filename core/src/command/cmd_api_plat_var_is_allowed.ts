/**
 * IP限制
 */
module net {
    export class cmd_api_plat_var_is_allowed extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_is_allowed, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_is_allowed, result.data, result.extend.request_unique);
            }
        }
    }
}
