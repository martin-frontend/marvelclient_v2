/**
 * 我的返佣比
 */
module net {
    export class cmd_api_user_var_commission_commissionnum extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_commission_commissionnum, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_commission_commissionnum, result.data, result.unique);
            }
        }
    }
}
