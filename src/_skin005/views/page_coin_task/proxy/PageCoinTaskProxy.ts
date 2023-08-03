import PanelUtil from "@/_skin005/core/PanelUtil";
import Timezone from "@/core/Timezone";
import GameConfig from "@/core/config/GameConfig";
import { dateFormat } from "@/core/global/Functions";
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
        this.pageData.list.length = 0; 
        this.pageData.loading = false;
        this.pageData.isLoadData = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        const nowTime = new Date(Timezone.Instance.convertTime_to_Locale_utc(<any>dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss"))).getTime();
        // @ts-ignore
        data.list.forEach((item) => {
            if (item.status == 2) {
                const endTime = new Date(Timezone.Instance.convertTime_to_Locale_utc(item.end_time)).getTime();
                if (nowTime >= endTime) {
                    item.status = -1; // 隐藏不显示
                }
            }
            this.pageData.list.push(item);
        });
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
