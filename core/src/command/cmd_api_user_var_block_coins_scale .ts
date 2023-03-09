/**
 * 获取币种游戏比率
 */
module net {
    export class cmd_api_user_var_block_coins_scale  extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_block_coins_scale , body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_block_coins_scale , result.data, result.unique);
            }
        }
    }
}
