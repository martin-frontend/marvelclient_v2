import getProxy from "@/core/global/getProxy";
import Utils from "@/core/global/Utils";
import GameProxy from "@/proxy/GameProxy";

export default class DialogRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogRechargeProxy";

    rechargeProxy: RechargeProxy = getProxy(RechargeProxy);
    exchangeProxy: ExchangeProxy = getProxy(ExchangeProxy);
    transferProxy: TransferProxy = getProxy(TransferProxy);

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0, // 0充值 1兑换 2划转
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
        //地址生成qrcode
        qrcode: "",
        //获取充值地址的表单
        form: {
            coin_name_unique: "",
            block_network_id: "",
            recharge_channel_id: "",
            amount: "",
        },
        gold_index: 0,
    };

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        // 默认选中用户当前选择的币种
        const gameProxy: GameProxy = getProxy(GameProxy);
        let coin_name_unique = gameProxy.coin_name_unique;
        if (keys.indexOf(coin_name_unique) == -1) {
            coin_name_unique = keys[0];
        }

        if (coin_name_unique) {
            this.pageData.form.coin_name_unique = coin_name_unique;
            const optionsKeys = Object.keys(data[coin_name_unique].options);
            // 默认选择trc20
            let block_network_id = optionsKeys[0];
            for (const key of optionsKeys) {
                if (data[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                    block_network_id = key;
                }
            }

            if (block_network_id) {
                this.pageData.form.block_network_id = block_network_id;
                this.pageData.form.recharge_channel_id =
                    data[this.pageData.form.coin_name_unique].options[this.pageData.form.block_network_id].recharge_channel_id;
                //如果payemthod_id == 5 则选择输入金额
                if (data[coin_name_unique].payemthod_id == 5) {
                    const fixed_gold_list = data[coin_name_unique].options[block_network_id].fixed_gold_list;
                    this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                    this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                }
            }
        }
        this.api_user_var_recharge_address();
    }

    async setAddress(data: string) {
        this.pageData.loading = false;
        this.pageData.address = data;
        this.pageData.qrcode = await Utils.generateQrcode(data);
    }

    api_user_var_recharge_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_recharge_method_list, { user_id: core.user_id });
    }

    api_user_var_recharge_address() {
        if (this.pageData.methodList[this.pageData.form.coin_name_unique].payemthod_id == 4) {
            this.pageData.loading = true;
            const formCopy = { user_id: core.user_id };
            Object.assign(formCopy, this.pageData.form);
            this.sendNotification(net.HttpType.api_user_var_recharge_address, formCopy);
        }
        this.pageData.address = "";
        this.pageData.qrcode = "";
    }

    api_user_var_recharge_create() {
        this.pageData.loading = true;
        const data = { user_id: core.user_id };
        Object.assign(data, this.pageData.form);
        this.sendNotification(net.HttpType.api_user_var_recharge_create, data);
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
            exchange_channel_method_id: 0,
            password_gold: "",
        },
    };

    resetform() {
        Object.assign(this.pageData.form, {
            amount: "",
            account: "",
            password_gold: "",
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        // 默认选中用户当前选择的币种
        const gameProxy: GameProxy = getProxy(GameProxy);
        let coin_name_unique = gameProxy.coin_name_unique;
        if (keys.indexOf(coin_name_unique) == -1) {
            coin_name_unique = keys[0];
        }

        if (coin_name_unique) {
            this.pageData.form.coin_name_unique = coin_name_unique;
            const optionsKeys = Object.keys(data[coin_name_unique].options);
            // 默认选择trc20
            let block_network_id = optionsKeys[0];
            for (const key of optionsKeys) {
                if (data[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                    block_network_id = key;
                }
            }

            if (block_network_id) {
                this.pageData.form.block_network_id = block_network_id;
                this.pageData.form.exchange_channel_method_id =
                    this.pageData.methodList[this.pageData.form.coin_name_unique].options[
                        this.pageData.form.block_network_id
                    ].exchange_channel_method_id;
            }
        }
    }

    api_user_var_exchange_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }

    api_user_var_exchange_create_order() {
        this.pageData.loading = true;
        const {
            amount,
            exchange_channel_id,
            payment_method_type,
            coin_name_unique,
            block_network_id,
            account,
            exchange_channel_method_id,
            password_gold,
        } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_var_exchange_create_order, {
            amount,
            exchange_channel_id,
            payment_method_type,
            coin_name_unique,
            block_network_id,
            account,
            exchange_channel_method_id,
            user_id: core.user_id,
            password_gold: core.MD5.createInstance().hex_md5(password_gold),
        });
    }
}

export class TransferProxy extends puremvc.Proxy {
    static NAME = "TransferProxy";

    /**钱包信息 */
    gold_info = <any>{};

    pageData = {
        loading: false,
        methodList: <any>{},
        form: {
            to_user_id: "",
            gold: "",
            coin_name_unique: "",
            password_gold: "",
        },
    };

    resetform() {
        Object.assign(this.pageData.form, {
            to_user_id: "",
            gold: "",
            password_gold: "",
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        // 默认选中用户当前选择的币种
        const gameProxy: GameProxy = getProxy(GameProxy);
        let coin_name_unique = gameProxy.coin_name_unique;
        if (keys.indexOf(coin_name_unique) == -1) {
            coin_name_unique = keys[0];
        }

        if (coin_name_unique) {
            this.pageData.form.coin_name_unique = coin_name_unique;
        }
    }

    api_user_var_gold_transfer() {
        this.pageData.loading = true;
        const {
            to_user_id,
            gold,
            coin_name_unique,
            password_gold,
        } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_var_gold_transfer, {
            user_id: core.user_id,
            to_user_id,
            gold,
            coin_name_unique,
            password_gold: core.MD5.createInstance().hex_md5(password_gold),
        });
    }
}
