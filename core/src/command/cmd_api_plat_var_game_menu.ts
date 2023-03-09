/**
 * 获取平台首页菜单游戏列表
 */
module net {
    export class cmd_api_plat_var_game_menu extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_var_game_menu, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_var_game_menu, result.data, result.unique);
            }
        }
    }
}
