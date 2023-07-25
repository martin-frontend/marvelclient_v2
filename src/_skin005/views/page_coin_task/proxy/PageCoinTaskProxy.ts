import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import LangUtil from "@/core/global/LangUtil";

export default class PageCoinTaskProxy extends puremvc.Proxy {
    static NAME = "PageCoinTaskProxy";

    public onRegister(): void {
        this.pageData.loading = true;
    }

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false,
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,

        isLoadData: true,
    };
    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.isLoadData = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }
    /**奖励任务列表 */
    api_user_var_coin_task_index() {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_user_var_coin_task_index, { user_id: core.user_id });
    }

    /**放弃奖励任务 */
    api_user_var_coin_task_cancel(coin_task_id: number) {
        if (!core.user_id) return;
        this.pageData.loading = true;
        this.pageData.isLoadData = true;
        this.sendNotification(net.HttpType.api_user_var_coin_task_cancel, { user_id: core.user_id, coin_task_id });
    }
}
