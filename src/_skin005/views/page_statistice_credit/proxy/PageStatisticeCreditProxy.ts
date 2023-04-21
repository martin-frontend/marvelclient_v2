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
        credit_dividend_period: <any>{}, //信用分红期 数据
        credit_tab: "",
        isShowCredit: false, //是否显示 信用分红期
        curCreditData: <any>{}, //当前的 分期数据
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
    setcredit_dividend_period(data: any) {
        this.pageData.loading = false;
        console.log("设置分红期限的数据", data);
        if (!data) return;
        this.pageData.credit_dividend_period = data;

        const keys = Object.keys(this.pageData.credit_dividend_period);
        if (keys.length < 1) {
            this.pageData.isShowCredit = false;
            return;
        }
        this.pageData.isShowCredit = true;
        this.pageData.credit_tab = keys[0];
        this.pageData.curCreditData = this.pageData.credit_dividend_period[this.pageData.credit_tab];
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

    /**发送  信用分红期 有关的 */
    api_user_var_credit_dividend_period() {
        if (core.user_id) {
            this.pageData.loading = true;
            this.sendNotification(net.HttpType.api_user_var_credit_dividend_period, { user_id: core.user_id });
        }
    }
}
