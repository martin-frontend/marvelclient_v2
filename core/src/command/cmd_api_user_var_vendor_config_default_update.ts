/**
 * 更新全局体育投注限制
 */
module net {
    export class cmd_api_user_var_vendor_config_default_update extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_vendor_config_default_update, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_vendor_config_default_update, result.data, result.extend.request_unique);
            }
        }
    }
}
