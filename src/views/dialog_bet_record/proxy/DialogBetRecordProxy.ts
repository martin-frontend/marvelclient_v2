import Constant from "@/core/global/Constant";
import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { vuetify } from "@/plugins/vuetify";
import dialog_message_box from "@/views/dialog_message_box";

export default class DialogBetRecordProxy extends puremvc.Proxy {
    static NAME = "DialogBetRecordProxy";

    public onRegister(): void {
        this.api_vendor_simple();
    }

    pageData = {
        loading: false,
        bShow: false,
        // 列表是否加载完成，手机模式专用
        finished: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            vendor_type: <any>null,
            vendor_id: <any>null,
            settlement_status: <any>null,
            start_date: core.dateFormat(core.getTodayOffset(), "yyyy-MM-dd"),
            end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        total_bet_gold: "",
        total_water: "",
        total_win_gold: "",
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        vendors: <any>[],
        //加载完毕后调用，手机模式专用
        done: <any>null,
    };
    //选择器
    listOptions = {
        typeSelect: 0,
        vendorSelect: 0,
        statusSelect: 0,
        timeSelect: 0,
        typeOptions: () => {
            return {
                0: LangUtil("全部类型"),
                2: LangUtil("棋牌"),
                4: LangUtil("彩票"),
                8: LangUtil("捕鱼"),
                16: LangUtil("电子"),
                32: LangUtil("真人"),
                64: LangUtil("体育"),
                128: LangUtil("电竞"),
            };
        },
        vendorOptions: () => {
            const options: any = { 0: LangUtil("全部厂商") };
            for (const item of this.pageData.vendors) {
                options[item.vendor_id] = item.vendor_name;
            }
            return options;
        },
        statusOptions: () => {
            return {
                0: LangUtil("全部状态"),
                1: LangUtil("未结算"),
                11: LangUtil("已结算"),
                2: LangUtil("已取消"),
            };
        },
        timeOptions: () => {
            return Constant.TIME_TYPE;
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            vendor_type: null,
            vendor_id: null,
            settlement_status: null,
            start_date: core.dateFormat(core.getTodayOffset(), "yyyy-MM-dd"),
            end_date: core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd"),
            page_count: 1,
            page_size: 20,
        });
    }

    setVendors(data: any) {
        this.pageData.vendors = data;
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.total_bet_gold = data.total_bet_gold;
        this.pageData.total_water = data.total_water;
        this.pageData.total_win_gold = data.total_win_gold;
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
    }
    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_show_var_bet();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_show_var_bet();
    }

    api_vendor_simple() {
        this.sendNotification(net.HttpType.api_vendor_simple);
    }

    api_user_show_var_bet() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);

        // dialog_message_box.alert(this.pageData.listQuery.start_date + "~~~~" + this.pageData.listQuery.end_date);

        this.sendNotification(net.HttpType.api_user_show_var_bet, objectRemoveNull(formCopy, [undefined, null, "", 0, "0"]));
    }
}
