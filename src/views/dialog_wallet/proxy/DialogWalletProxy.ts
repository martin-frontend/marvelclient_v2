export default class DialogWalletProxy extends puremvc.Proxy {
    static NAME = "DialogWalletProxy";

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0,

        gold_info: <any>{},

        //资产明细列表
        listQuery: {
            type: <any>null,
            start_date: <any>null,
            end_date: <any>null,
            coin_name_unique: <any>null,
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            type: null,
            start_date: null,
            end_date: null,
            coin_name_unique: null,
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }

    api_user_show_var_gold() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_show_var_gold, formCopy);
    }

    api_user_var_vendor_withdraw(coin_name_unique: string) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_vendor_withdraw, { coin_name_unique, user_id: core.user_id });
    }

    api_user_show_var() {
        this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify([2]) });
    }
}
