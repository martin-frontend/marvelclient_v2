/**
 * 昨日分红排行榜
 */
module net {
    export class cmd_api_plat_var_bonus_rank extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_bonus_rank, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_bonus_rank, result.data, result.unique);
            }
        }
    }
}
