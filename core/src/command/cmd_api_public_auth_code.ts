/**
 * 获取验证码图片
 */
module net {
    export class cmd_api_public_auth_code extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_public_auth_code, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_public_auth_code, result.data, result.unique);
            }
        }
    }
}
