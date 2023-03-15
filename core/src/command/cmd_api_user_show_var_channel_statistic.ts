/**
 * 渠道统计
 */
module net {
    export class cmd_api_user_show_var_channel_statistic extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_show_var_channel_statistic, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_show_var_channel_statistic, result.data, result.extend.request_unique);
            }
        }
    }
}
