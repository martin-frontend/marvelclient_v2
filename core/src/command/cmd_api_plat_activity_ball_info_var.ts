/**
 * 彩球信息
 */
module net {
    export class cmd_api_plat_activity_ball_info_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_activity_ball_info_var, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_activity_ball_info_var, result.data, result.extend.request_unique);
            }
        }
    }
}
