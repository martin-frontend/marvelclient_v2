/**
 * 直属用户状态查询和修改
 */
module net {
    export class cmd_api_user_var_agent_direct_user_update extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_agent_direct_user_update, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_agent_direct_user_update, result.data, result.extend.request_unique);
            }
        }
    }
}
