/**
 * 近期爆奖
 */
module net {
    export class cmd_api_plat_var_plat_big_award extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_plat_big_award, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_plat_big_award, result.data, result.extend.request_unique);
            }
        }
    }
}
