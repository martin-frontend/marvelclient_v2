/**
 * 用户绑定手机
 */
module net {
    export class cmd_api_user_bind_mobile_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_bind_mobile_var, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_bind_mobile_var, result.data, result.extend.request_unique);
            }
        }
    }
}
