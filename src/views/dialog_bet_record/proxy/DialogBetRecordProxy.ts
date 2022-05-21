export default class DialogBetRecordProxy extends puremvc.Proxy {
    static NAME = "DialogBetRecordProxy";

    public onRegister(): void {
        this.api_vendor_simple();
    }

    pageData = {
        loading: false,
        bShow: false,
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
        list: [],
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
        this.pageData.list = data.list;
        this.pageData.total_bet_gold = data.total_bet_gold;
        this.pageData.total_water = data.total_water;
        this.pageData.total_win_gold = data.total_win_gold;
    }

    api_vendor_simple() {
        this.sendNotification(net.HttpType.api_vendor_simple);
    }

    api_user_show_var_bet() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.listQuery);
        this.sendNotification(net.HttpType.api_user_show_var_bet, formCopy);
    }
}
