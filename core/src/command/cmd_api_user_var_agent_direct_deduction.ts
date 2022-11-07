/**
 * 直属用户直接扣款
 */
module net {
    export class cmd_api_user_var_agent_direct_deduction extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_agent_direct_deduction, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_agent_direct_deduction, result.data);
            }
        }
    }
}
