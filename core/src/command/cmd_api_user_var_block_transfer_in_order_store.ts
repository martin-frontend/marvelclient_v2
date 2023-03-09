/**
 * 代币转入订单提交
 */
module net {
    export class cmd_api_user_var_block_transfer_in_order_store extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_block_transfer_in_order_store, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_block_transfer_in_order_store, result.data, result.unique);
            }
        }
    }
}
