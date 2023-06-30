import GamePlatConfig from "@/core/config/GamePlatConfig";
import { convert_vi_to_en, objectRemoveNull } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import Utils from "@/core/global/Utils";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LangUtil from "@/core/global/LangUtil";
import GlobalVar from "@/core/global/GlobalVar";

export default class DialogRechargeProxy extends puremvc.Proxy {
    static NAME = "DialogRechargeProxy";

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
            third_id: "",
            subtitle: "",
            requires: <any>{},
        },
        gold_index: 0,
        isLoadData: true, //是否正在加载数据，或者是否正在等待 数据
    };

    public get isHaveData(): boolean {
        return Object.keys(this.pageData.methodList).length > 0;
    }

    setData(data: any) {
        this.pageData.loading = false;
        this.pageData.methodList = data;
        this.pageData.isLoadData = false;
        const keys = Object.keys(data);
        // 默认选中用户当前选择的币种
        const gameProxy = PanelUtil.getProxy_gameproxy;
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

                if (data[coin_name_unique].options[block_network_id]) {
                    //如果payemthod_id == 5 则选择输入金额
                    if (data[coin_name_unique].options[block_network_id].payemthod_id == 5) {
                        const fixed_gold_list = data[coin_name_unique].options[block_network_id].fixed_gold_list;
                        this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                        this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                    }
                    if (
                        data[coin_name_unique].options[block_network_id].payemthod_id == 6 ||
                        data[coin_name_unique].options[block_network_id].payemthod_id == 8 ||
                        data[coin_name_unique].options[block_network_id].payemthod_id == 10
                    ) {
                        const channel = data[coin_name_unique].options[block_network_id].channel;
                        if (channel && channel.length > 0) {
                            this.pageData.form.third_id = channel[0].third_id;
                            this.pageData.form.subtitle = channel[0].subtitle;

                            const fixed_gold_list = channel[0].fixed_gold_list;
                            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                        }
                        this.pageData.form.requires = data[coin_name_unique].options[block_network_id].requires;
                    }
                    if (data[coin_name_unique].options[block_network_id].payemthod_id == 9) {
                        const channel = data[coin_name_unique].options[block_network_id].channel;
                        if (channel.length > 0) {
                            this.pageData.form.third_id = channel[0].third_id;
                            this.pageData.form.subtitle = channel[0].subtitle;

                            const fixed_gold_list = channel[0].fixed_gold_list;
                            //this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                            //this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                        }
                    }
                }
            }
        }
        //this.api_user_var_recharge_address();
    }

    async setAddress(data: string) {
        this.pageData.loading = false;
        this.pageData.address = data;
        PanelUtil.showAppLoading(false);
        this.pageData.qrcode = await Utils.generateQrcode(data);
    }

    api_user_var_recharge_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_recharge_method_list, { user_id: core.user_id });
    }

    api_user_var_recharge_address() {
        if (
            this.pageData.methodList[this.pageData.form.coin_name_unique] &&
            this.pageData.methodList[this.pageData.form.coin_name_unique].payemthod_id == 4
        ) {
            this.pageData.loading = true;
            PanelUtil.showAppLoading(true);
            const formCopy = { user_id: core.user_id };
            Object.assign(formCopy, this.pageData.form);
            this.sendNotification(net.HttpType.api_user_var_recharge_address, objectRemoveNull(formCopy));
        }
        this.pageData.address = "";
        this.pageData.qrcode = "";
    }

    api_user_var_recharge_create(requires: any = null) {
        //this.pageData.loading = true;
        PanelUtil.showAppLoading(true);
        //const data = <any>{ user_id: core.user_id };
        const { coin_name_unique, block_network_id, recharge_channel_id, amount, third_id, subtitle } = this.pageData.form;
        //Object.assign(data, this.pageData.form);

        const data = <any>{
            user_id: core.user_id,
            coin_name_unique: coin_name_unique,
            block_network_id: block_network_id,
            recharge_channel_id: recharge_channel_id,
            amount: amount,
            third_id: third_id,
            subtitle: subtitle,
        };

        if (requires && requires.length > 0) {
            for (let index = 0; index < requires.length; index++) {
                const element = requires[index];
                if (element.key) {
                    data[element.key] = element.inputValue;
                } else {
                    data[element.title] = element.inputValue;
                }
            }
        }
        // if (this.pageData.form.requires && this.pageData.form.requires.length > 0) {
        //     const requires = this.pageData.form.requires;
        //     const keys = Object.keys(requires);
        //     for (let index = 0; index < keys.length; index++) {
        //         const element = keys[index];
        //         data[requires[keys[index]]] = "-";
        //     }
        // }
        console.log("请求 充值 数据", data);
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
            third_id: "",
            subtitle: "",
            requires: <any>{},
            //越南盾 银行卡兑换
            bank_id: "", //银行编号
            bank: "", //银行名称
            account_name: "", //银行开户名
            account_bank: "-", //
        },
        isLoadData: true, //是否正在加载数据，或者是否正在等待 数据
    };
    curBankinfo = <any>{};

    bankCardInfo = <any>{}; //所有银行卡信息
    bankCard_nameArr = <any>{};
    bankCard_numberArr = <any>{};

    exemption_amount = "";

    init() {
        this.api_user_var_exchange_method_list();
        this.api_user_var_exchange_extend_info();
    }
    pix_key_select = 0;
    pix_key_option = [
        {
            name: "brl_CFP/CNPJ", //标题名字
            key: 3, //传给服务器用的类型
            Regular: `/^\d{11}$/`, //检验的正则  11位 纯数字
            //placeholder: LangUtil("请输入{0}", LangUtil("input_brl_CFP/CNPJ")),
            placeholder: "",
            inputValue: "",
            errinfo: "",
        },
        {
            name: "brl_Mobile",
            key: 2,
            Regular: `/^[1-9]\d{10}$/`, // 电话  11位 非0 开头的纯数字
            //placeholder: LangUtil("请输入{0}", LangUtil("input_brl_Mobile")),
            placeholder: "",
            inputValue: "",
            errinfo: "",
        },
    ];

    showRequires = <any>[];

    get pix_key_option_select() {
        const obj = <any>{};
        for (let index = 0; index < this.pix_key_option.length; index++) {
            const element = this.pix_key_option[index];
            obj[index] = element.name;
        }
        return obj;
    }
    get curPixkeyItem() {
        const item = this.pix_key_option[this.pix_key_select];
        if (item.key == 3) {
            if (PanelUtil.getProxy_selfproxy.userInfo.cpf && PanelUtil.getProxy_selfproxy.userInfo.cpf.trim()) {
                item.inputValue = PanelUtil.getProxy_selfproxy.userInfo.cpf;
            }
        }
        return item;
    }

    onBlurInput_option() {
        console.log("111111111-----", this.curPixkeyItem.inputValue);
        this.curPixkeyItem.inputValue = this.curPixkeyItem.inputValue.trim();
        if (!this.curPixkeyItem.inputValue) {
            return false;
        }
        let Regx;
        console.log("this.curPixkeyItem.key: ", this.curPixkeyItem.key);
        switch (this.curPixkeyItem.key) {
            case 1:
                Regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                break;
            case 2:
                Regx = /^[1-9]\d{10}$/;
                break;
            case 3:
                Regx = /^\d{11}$/;
                break;
            default:
                break;
        }
        if (!Regx) {
            console.log("----检测为空----");
            this.curPixkeyItem.errinfo = "";
            return true;
        }
        if (!Regx.test(this.curPixkeyItem.inputValue)) {
            console.log("----检测不正确----");
            this.curPixkeyItem.errinfo = LangUtil("请输入正确的{0}", this.curPixkeyItem.name);
            return false;
        }
        console.log("----正确----");
        this.curPixkeyItem.errinfo = "";
        return true;
    }

    onBlurInput(item: any) {
        item.inputValue = item.inputValue.trim();
        if (!item.inputValue) {
            item.errinfo = LangUtil(item.tips);
            return false;
        }
        item.errinfo = "";
        return true;
    }

    resetform() {
        Object.assign(this.pageData.form, {
            amount: "",
            account: "",
            password_gold: "",
        });
        this.curBankinfo = null;
        this.setRealName();
        this.pix_key_select = 0;
        this.showRequires[0].inputValue = "";
        this.curPixkeyItem.inputValue = "";
    }
    setRealName() {
        const selfProxy = PanelUtil.getProxy_selfproxy;
        if (selfProxy.userInfo.real_name_decrypt) {
            this.pageData.form.account_name = selfProxy.userInfo.real_name_decrypt;
        } else {
            this.pageData.form.account_name = "";
        }
        //console.log("设置真实信命" + this.pageData.form.account_name);
    }
    public get isHaveData(): boolean {
        return Object.keys(this.pageData.methodList).length > 0;
    }
    setData(data: any) {
        this.pageData.isLoadData = false;
        PanelUtil.showAppLoading(false);
        //this.pageData.loading = false;
        this.pageData.methodList = data;
        const keys = Object.keys(data);
        // 默认选中用户当前选择的币种
        const gameProxy = PanelUtil.getProxy_gameproxy;
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
                if (data[coin_name_unique].options[key].name && data[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                    block_network_id = key;
                }
            }

            if (block_network_id) {
                this.pageData.form.block_network_id = block_network_id;
                this.pageData.form.exchange_channel_method_id =
                    this.pageData.methodList[this.pageData.form.coin_name_unique].options[
                        this.pageData.form.block_network_id
                    ].exchange_channel_method_id;
                this.pageData.form.requires =
                    this.pageData.methodList[this.pageData.form.coin_name_unique].options[this.pageData.form.block_network_id].requires;
                console.log("----block_network_id----", block_network_id);
            }
        }
    }

    setCurBankInfo(bank_id: number) {
        console.log("需要搜索的银行id ", bank_id);
        const arr = this.pageData.methodList[this.pageData.form.coin_name_unique].bank_list;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.bank_id == bank_id) {
                this.curBankinfo = element;
                console.log("设置  银行 ", element);
                return;
            }
        }
    }
    get isPasswordExist() {
        return PanelUtil.getProxy_selfproxy.userInfo.password_gold_exists != 1;
    }
    setAddress(data: any) {
        console.log("收到 银行卡 信息 回调");
        this.bankCardInfo = data;
        this.bankCard_nameArr = [];
        this.bankCard_numberArr = [];
        if (!this.bankCardInfo) return;

        for (let index = 0; index < this.bankCardInfo.length; index++) {
            const element = this.bankCardInfo[index];
            if (this.bankCard_nameArr.indexOf(element.payment_method.account_name) == -1) {
                this.bankCard_nameArr.push(element.payment_method.account_name);
            }

            if (this.bankCard_numberArr.indexOf(element.payment_method.account) == -1) {
                this.bankCard_numberArr.push(element.payment_method.account);
            }
        }
    }
    api_user_var_exchange_method_list() {
        PanelUtil.showAppLoading(true);
        //this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_exchange_method_list, { plat_id: core.plat_id });
    }

    api_user_var_exchange_create_order(requires: any = null, brl_info: any = null) {
        //this.pageData.loading = true;
        PanelUtil.showAppLoading(true);
        if (!requires || requires.length < 1) {
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

            const data = <any>{
                amount,
                exchange_channel_id,
                payment_method_type,
                coin_name_unique,
                block_network_id,
                account,
                exchange_channel_method_id,
                user_id: core.user_id,
                password_gold: core.MD5.createInstance().hex_md5(password_gold),
            };

            if (brl_info) {
                data.third_id = this.pageData.form.third_id;
                data.subtitle = this.pageData.form.subtitle;
                data.name = brl_info.name;
                data.pix_key = brl_info.pix_key;
                data.type = brl_info.type;
            }
            console.log("发送信息为", data);
            this.sendNotification(net.HttpType.api_user_var_exchange_create_order, data);
        } else {
            const {
                amount,
                exchange_channel_id,
                payment_method_type,
                coin_name_unique,
                block_network_id,
                account,
                exchange_channel_method_id,
                password_gold,
                third_id,
                subtitle,
            } = this.pageData.form;

            const data = <any>{
                amount,
                exchange_channel_id,
                payment_method_type,
                coin_name_unique,
                block_network_id,
                account,
                third_id,
                subtitle,
                exchange_channel_method_id,
                user_id: core.user_id,
                password_gold: core.MD5.createInstance().hex_md5(password_gold),
            };

            for (let index = 0; index < requires.length; index++) {
                const element = requires[index];
                if (element.key) {
                    data[element.key] = element.inputValue;
                } else {
                    data[element.title] = element.inputValue;
                }
            }
            console.log(" 兑换发送的数据", data);
            this.sendNotification(net.HttpType.api_user_var_exchange_create_order, data);
        }
    }
    api_user_var_exchange_create_order_VND() {
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
            bank_id,
            bank,
            account_name,
            account_bank,
        } = this.pageData.form;

        const sendObj = {
            amount,
            exchange_channel_id,
            payment_method_type,
            coin_name_unique,
            block_network_id,
            account,
            exchange_channel_method_id,
            user_id: core.user_id,
            password_gold: core.MD5.createInstance().hex_md5(password_gold),
            bank_id,
            bank,
            account_name,
            account_bank,
        };
        sendObj.account_name = convert_vi_to_en(sendObj.account_name);
        console.log("发送的数据为", sendObj);
        this.sendNotification(net.HttpType.api_user_var_exchange_create_order, sendObj);
    }

    api_user_var_exchange_extend_info() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_user_var_exchange_extend_info, { user_id: core.user_id });
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
        PanelUtil.showAppLoading(false);
        //this.pageData.loading = false;
        this.pageData.methodList = data;
        // const keys = Object.keys(data);
        const keys = Object.keys(GamePlatConfig.config.plat_coins);
        // 默认选中用户当前选择的币种
        const gameProxy = PanelUtil.getProxy_gameproxy;
        let coin_name_unique = gameProxy.coin_name_unique;
        if (keys.indexOf(coin_name_unique) == -1) {
            coin_name_unique = keys[0];
        }

        if (coin_name_unique) {
            this.pageData.form.coin_name_unique = coin_name_unique;
        }
    }

    api_user_var_gold_transfer() {
        PanelUtil.showAppLoading(true);
        //this.pageData.loading = true;
        const { to_user_id, gold, coin_name_unique, password_gold } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_var_gold_transfer, {
            user_id: core.user_id,
            to_user_id,
            gold,
            coin_name_unique,
            password_gold: core.MD5.createInstance().hex_md5(password_gold),
        });
    }
}
