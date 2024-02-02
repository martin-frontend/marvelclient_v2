/**
 * 排行榜-活动列表
 */
module net {
    export class cmd_api_plat_activity_index_rank_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification) {
            const body = notification.getBody() || {};
            const url = getUrl(HttpType.api_plat_activity_index_rank_list, body);
            Http.request(body || {}, url).then(this.response.bind(this));
        }

        private response(result: core.ResponseVO) {
            if (result.status === 0) {
                this.sendNotification(EventType.api_plat_activity_index_rank_list, result.data, result.extend.request_unique);
            }
        }
    }
}
