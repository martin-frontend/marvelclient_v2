/**
 * 获取厂商配置游戏菜单（大厅厂商二级游戏菜单）
 */
module net {
    export class cmd_api_vendor_var_lobby_simple extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_vendor_var_lobby_simple, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_vendor_var_lobby_simple, result.data, result.unique);
            }
        }
    }
}
