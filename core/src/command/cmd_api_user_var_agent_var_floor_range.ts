/**
 * 直属保底范围查询
 */
module net {
    export class cmd_api_user_var_agent_var_floor_range extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_user_var_agent_var_floor_range, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_user_var_agent_var_floor_range, result.data);
            }
        }
    }
}
