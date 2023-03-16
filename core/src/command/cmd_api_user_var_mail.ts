/**
 * 获取用户邮件列表
 */
module net {
    export class cmd_api_user_var_mail extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_mail, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_mail, result.data, result.extend.request_unique);
            }
        }
    }
}
