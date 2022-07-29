/**
 * 获取平台最大挖矿效率
 */
module net {
    export class cmd_api_plat_var_backwater_setting_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_backwater_setting_info, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_backwater_setting_info, result.data);
            }
        }
    }
}
