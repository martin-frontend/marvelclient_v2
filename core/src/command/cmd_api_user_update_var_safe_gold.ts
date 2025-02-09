/**
 * 用户保险箱存取款
 */
module net {
    export class cmd_api_user_update_var_safe_gold extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_update_var_safe_gold, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_update_var_safe_gold, result.data, result.extend.request_unique);
            }
        }
    }
}
