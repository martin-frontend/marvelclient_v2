/**
 * 清空直属所有额度
 */
module net {
    export class cmd_api_user_var_agent_direct_deduction_all extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_agent_direct_deduction_all, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_agent_direct_deduction_all, result.data, result.unique);
            }
        }
    }
}
