/**
 * 按日期查询直属代理流水详情
 */
module net {
    export class cmd_api_user_var_commission_directswater extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_commission_directswater, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_commission_directswater, result.data, result.unique);
            }
        }
    }
}
