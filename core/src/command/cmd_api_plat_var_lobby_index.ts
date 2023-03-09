/**
 * 获取游戏类型,游戏菜单（大厅菜单）
 */
module net {
    export class cmd_api_plat_var_lobby_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_lobby_index, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_lobby_index, result.data, result.unique);
            }
        }
    }
}
