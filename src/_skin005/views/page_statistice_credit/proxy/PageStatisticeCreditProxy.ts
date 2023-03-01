
import Utils from "@/core/global/Utils";


export default class PageStatisticeCreditProxy extends puremvc.Proxy {
    static NAME = "PageStatisticeCreditProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        tabIndex: 0,
        search: "",

        statistics_data: <any>{},
        promotionData: <any>{
            pretty_user_id: 0,
        },
        btnBind: false,
        link: "",
        qrCode: "",

    };


    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }

    setCommisiondetailData(data: any) {
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.statistics_data, data.statistics_data);
        Object.assign(this.pageData.promotionData, data);
        this.pageData.btnBind = !data.invite_user_id;
        if (data.commission_info[2].commission_num.USDT != undefined) {
            this.pageData.promotionData.commission_num = data.commission_info[2].commission_num.USDT;
        } else {
            this.pageData.promotionData.commission_num = 0;
        }
    }
    setShowType(type: number) {
        this.pageData.tabIndex = type;
        console.log("设置 开始的值 为 " + this.pageData.tabIndex);
    }



    /**业绩查询--获取推广链接*/
    api_user_var_short_chain(force: number = 0) {
        this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id, host: location.origin, force });
    }
    /**业绩查询--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, { user_id: core.user_id });
        }
    }
}
