/**
 * 充值弹窗列表（无需登入）
 */
module net {
    export class cmd_api_plat_var_notice_popup extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_notice_popup, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_notice_popup, result.data, result.extend.request_unique);
            }
        }
    }
}
