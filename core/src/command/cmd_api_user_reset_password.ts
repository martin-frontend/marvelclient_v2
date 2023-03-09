/**
 * 重置密码
 */
module net {
    export class cmd_api_user_reset_password extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_reset_password, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_reset_password, result.data, result.unique);
            }
        }
    }
}
