/**
 * 获取语言列表
 */
module net {
    export class cmd_api_plat_var_language_config extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_language_config, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_language_config, result.data, result.extend.request_unique);
            }
        }
    }
}
