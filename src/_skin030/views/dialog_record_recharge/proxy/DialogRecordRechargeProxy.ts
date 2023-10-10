import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";

export default class DialogRecordRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogRecordRechargeProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
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
    };

    public get statusOptions(): any {
        return {
            0: LangUtil("待支付"),
            1: LangUtil("成功"),
            2: LangUtil("失败"),
            3: LangUtil("玩家已支付等待确认"),
        };
    }

    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }
    setTestdata() {
        const obj = {
            order_no: "1231235423",
            created_at: "2023-03-10 12:44:49",
            third_order_info: {
                block_name: "12312",
                token_name: "12312",
                from_address: "dfdsfsdfs",
                to_address: "dfdsfsdfs",
                tx_scan_url: "dfdsfsdfs",
            },
            coin_name_unique: "usdt",
            gold: "12423",
            status: 0,
        };
        const list = [];
        for (let index = 0; index < 20; index++) {
            list.push(obj);
        }
        return list;
    }
    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.pageInfo, data.pageInfo);

        if (window.$mobile) {
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
        //this.pageData.list = this.setTestdata();;
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_recharge_list();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_recharge_list();
    }

    api_user_var_recharge_list() {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id };
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_recharge_list, obj);
    }
}
