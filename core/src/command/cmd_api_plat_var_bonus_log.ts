/**
 * 分红记录-全站记录
 */
module net {
    export class cmd_api_plat_var_bonus_log extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_bonus_log, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_bonus_log, result.data, result.unique);
            }
        }
    }
}
