import PanelUtil from "@/_skin005/core/PanelUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";

export default class DialogRecordExchangeProxy extends AbstractProxy {
    static NAME = "DialogRecordExchangeProxy";

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

    show() {
        this.pageData.bShow = true;
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
            gold: "12423",
            coin_name_unique: "usdt",
            status: 0,
        };
        const list = [];
        for (let index = 0; index < 10; index++) {
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
        //  this.pageData.list = this.setTestdata();
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_exchange_order_list();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_exchange_order_list();
    }

    api_user_var_exchange_order_list() {
        this.pageData.loading = true;
        const obj = { user_id: core.user_id };
        Object.assign(obj, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_var_exchange_order_list, obj);
    }
    api_user_var_exchange_manual_refund(item: any) {
        if (!core.user_id) return;

        this.pageData.loading = true;
        const obj = {
            user_id: core.user_id,
            plat_id: core.plat_id,
            order_no: item.order_no,
        };
        this.sendNotification(net.HttpType.api_user_var_exchange_manual_refund, obj);
    }
    api_user_var_exchange_manual_refund_callback(data: any) {
        //this.pageData.loading = false;
        PanelUtil.message_success(LangUtil("操作成功"));
        this.api_user_var_exchange_order_list();
    }
}
