
import getProxy from "@/core/global/getProxy";
import { ExchangeProxy, RechargeProxy, TransferProxy } from "@/_skin005/views/dialog_recharge/proxy/DialogRechargeProxy";

export default class PageRechargeProxy extends puremvc.Proxy {
    static NAME = "PageRechargeProxy";

    rechargeProxy: RechargeProxy = getProxy(RechargeProxy);
    exchangeProxy: ExchangeProxy = getProxy(ExchangeProxy);
    transferProxy: TransferProxy = getProxy(TransferProxy);

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        tabIndex: 0, // 0充值 1兑换 2划转
    };

    show() {
        this.pageData.bShow = true;
    }
    init()
    {
        console.log("初始化----");
        this.exchangeProxy.api_user_var_exchange_method_list();
        this.rechargeProxy.api_user_var_recharge_method_list();
    }
}

