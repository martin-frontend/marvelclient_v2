import getProxy from "@/core/global/getProxy";

export default class DialogRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogRechargeProxy";

    rechargeProxy: RechargeProxy = getProxy(RechargeProxy);
    exchangeProxy: ExchangeProxy = getProxy(ExchangeProxy);

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0, // 0充值 1兑换
    };

    show() {
        this.pageData.bShow = true;
    }
}

export class RechargeProxy extends puremvc.Proxy {
    static NAME = "RechargeProxy";

    pageData = {
        loading: false,
        // 充值渠道列表
        methodList: <any>{},
        //当前选择的充值地址
        address: "",
        //获取充值地址的表单
        form: {
            coin_name_unique: "",
            block_network_id: "",
        },
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        const key = keys[0];
        if (key) {
            this.pageData.form.coin_name_unique = key;
            const optionsKeys = Object.keys(data[key].options);
            if (optionsKeys[0]) {
                this.pageData.form.block_network_id = optionsKeys[0];
            }
        }
        this.api_user_var_recharge_address();
    }

    setAddress(data: string) {
        this.pageData.loading = false;
        this.pageData.address = data;
    }

    api_user_var_recharge_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_recharge_method_list, { user_id: core.user_id });
    }

    api_user_var_recharge_address() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.form);
        this.sendNotification(net.HttpType.api_user_var_recharge_address, formCopy);
    }
}

export class ExchangeProxy extends puremvc.Proxy {
    static NAME = "ExchangeProxy";

    /**钱包信息 */
    gold_info = <any>{};

    pageData = {
        loading: false,
        methodList: <any>{},
        form: {
            amount: "",
            exchange_channel_id: 0,
            payment_method_type: 0,

            coin_name_unique: "",
            block_network_id: "",
            account: "",
        },
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        const key = keys[0];
        if (key) {
            this.pageData.form.coin_name_unique = key;
            const optionsKeys = Object.keys(data[key].options);
            if (optionsKeys[0]) {
                this.pageData.form.block_network_id = optionsKeys[0];
            }
        }
    }

    api_user_var_exchange_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }

    api_user_var_exchange_create_order() {
        this.pageData.loading = true;
        const formCopy = { user_id: core.user_id };
        Object.assign(formCopy, this.pageData.form);
        this.sendNotification(net.HttpType.api_user_var_exchange_create_order, formCopy);
    }
}
