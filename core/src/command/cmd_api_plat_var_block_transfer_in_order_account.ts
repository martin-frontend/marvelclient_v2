/**
 * 获取转入账号信息
 */
module net {
    export class cmd_api_plat_var_block_transfer_in_order_account extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_block_transfer_in_order_account, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_block_transfer_in_order_account, result.data, result.extend.request_unique);
            }
        }
    }
}
