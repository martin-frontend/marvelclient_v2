import { objectRemoveNull } from "@/core/global/Functions";
import Vue from "vue";

export default class DialogAddressBookProxy extends puremvc.Proxy {
    static NAME = "DialogAddressBookProxy";

    pageData = {
        loading: false,
        bShow: false,
        methodList: <any>{},
        listQuery: {
            user_id: core.user_id,
            type: 4,
            coin_name_unique: "",
            block_network_id: "",
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
        finished: true,
        //加载完毕后调用，手机模式专用
        done: <any>null,
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        // const keys = Object.keys(data);

        // const gameProxy: GameProxy = getProxy(GameProxy);
        // let coin_name_unique = gameProxy.coin_name_unique;
        // if (keys.indexOf(coin_name_unique) == -1) {
        //     coin_name_unique = keys[0];
        // }

        // if (coin_name_unique) {
        //     this.pageData.listQuery.coin_name_unique = coin_name_unique;
        //     const optionsKeys = Object.keys(data[coin_name_unique].options);
        //     if (optionsKeys[0]) {
        //         this.pageData.listQuery.block_network_id = optionsKeys[0];
        //     }
        // }
        this.api_user_var_payment_method_index();
    }

    setAdressData(data: any) {
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data;
            } else {
                this.pageData.list.push(...data);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data;
        }
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_payment_method_index();
    }

    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_payment_method_index();
    }

    api_user_var_exchange_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }

    api_user_var_payment_method_index() {
        this.pageData.loading = true;
        this.pageData.listQuery.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_payment_method_index, objectRemoveNull(this.pageData.listQuery));
    }
}
