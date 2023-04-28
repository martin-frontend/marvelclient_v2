import Timezone from "@/core/Timezone";
import GameConfig from "@/core/config/GameConfig";

export default class DialogOrderProxy extends puremvc.Proxy {
    static NAME = "DialogOrderProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: {},
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        url: "",
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        // Object.assign(this.pageData.pageInfo, data.pageInfo);
        // this.pageData.list = data.list;
    }

    api_vendor_var_bet_log_detail(order_no: any) {
        const formCopy = <any>{
            order_no: order_no,
            vendor_id: GameConfig.config.SportVendorId,
        };
        if (GameConfig.timezoneChange) {
            formCopy.timezone = Timezone.Instance.timezoneOffset;
        }
        this.sendNotification(net.HttpType.api_vendor_var_bet_log_detail, formCopy);
    }
}
