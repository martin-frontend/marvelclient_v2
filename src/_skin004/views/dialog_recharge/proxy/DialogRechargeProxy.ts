import GamePlatConfig from "@/core/config/GamePlatConfig";
import { convert_vi_to_en } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import Utils from "@/core/global/Utils";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import DialogAddressBookProxy from "@/_skin004/views/dialog_address_book/proxy/DialogAddressBookProxy";
import DialogRechargeBankcharge from "@/_skin004/views/dialog_recharge_bankcharge";
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
            third_id: "",
            payemthod_id:"",
            subtitle: "",
        },
        gold_index: 0,
        //银行卡转账信息
        bankTransInfo:<any>{},
    };
    setTestData()
    {
        const obj={
            explain:"asdasdas",
            fee:"",
            icon:"CNY_13_6_31630.png",
            icon_url:"",
            is_fixed_gold:1,
            max_gold:"1000.00",
            min_gold:"100.00",
            subtitle:"永恒支付-coinfans560-支付宝zfbbc-34",
            third_id:31630,
            fixed_gold_list:["100", "200", "300", "500", "1000"]
        }
        const list = <any>[];
        for (let index = 0; index < 3; index++) {
            obj.third_id = obj.third_id+index;
           list.push(JSON.parse(JSON.stringify(obj)));
           
        }
        return list;
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
            let block_network_id = this.setFirstBtn();
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
                if (data[coin_name_unique].options[block_network_id].payemthod_id == 5) {
                    const fixed_gold_list = data[coin_name_unique].options[block_network_id].fixed_gold_list;
                    this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                    this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                }
                if (data[coin_name_unique].options[block_network_id].payemthod_id == 6 || data[coin_name_unique].options[block_network_id].payemthod_id == 8) {
                    const channel = data[coin_name_unique].options[block_network_id].channel;
                    if (channel.length > 0) {
                        this.pageData.form.third_id = channel[0].third_id;
                        this.pageData.form.subtitle = channel[0].subtitle;

                        const fixed_gold_list = channel[0].fixed_gold_list;
                        this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                        this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                    }
                }
                
            }

            // if (data[coin_name_unique].options[31].payemthod_id == 8) {
            //     const banktran = data[coin_name_unique].options[31];
            //     if (banktran) {
            //         banktran.channel = this.setTestData();
            //     }
            // }
            
        }
        this.api_user_var_recharge_address();
     //   this.setFirstBtn();
    }
    setFirstBtn(){
        const coinObj = this.optionsSort(this.pageData.methodList[this.pageData.form.coin_name_unique].options);
        const sortedOptions:any[] = Object.values(coinObj).sort((a:any, b:any) => a.sort - b.sort);
        return sortedOptions[0].strkey;
    }
    optionsSort(data:any) {
        const tempdata = JSON.parse(JSON.stringify(data))
        for (const iterator of Object.entries(tempdata)) {
            const item1 = <any>iterator[1];
            item1.strkey=iterator[0];
            if (!item1.sort) {
                
                item1.sort = 1000;
            }
        }
        const sortedOptions = Object.values(tempdata).sort((a:any, b:any) => a.sort - b.sort);
        
        return sortedOptions;
    }
    async setAddress(data: string) {
        this.pageData.loading = false;
        this.pageData.address = data;
        this.pageData.qrcode = await Utils.generateQrcode(data);
    }

    api_user_var_recharge_method_list() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_recharge_method_list, { user_id: core.user_id});
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

    api_user_var_recharge_create(payemthod_id:any) {
        this.pageData.loading = true;
        const data = {user_id: core.user_id,request_unique:payemthod_id };
        Object.assign(data, this.pageData.form);
        this.sendNotification(net.HttpType.api_user_var_recharge_create, data);
    }
    set_user_var_recharge_create(data: string){
        Object.assign(this.pageData.bankTransInfo, data);
        this.showbankDialog();
    }
    showbankDialog(){
        Object.assign(this.pageData.bankTransInfo, {amount:this.pageData.form.amount});
        DialogRechargeBankcharge.show(this.pageData.bankTransInfo);

    }
}

export class ExchangeProxy extends puremvc.Proxy {
    static NAME = "ExchangeProxy";
    selfProxy: SelfProxy = getProxy(SelfProxy);
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
            account: "", //  银行卡号
            exchange_channel_method_id: 0,
            password_gold: "",
            //越南盾 银行卡兑换
            bank_id: "", //银行编号
            bank: "", //银行名称
            account_name: "", //银行开户名
            account_bank: "-", //
        },
    };
    curBankinfo=<any>{};

    bankCardInfo=<any>{}; //所有银行卡信息
    bankCard_nameArr=<any>{};
    bankCard_numberArr=<any>{};

    resetform() {
        Object.assign(this.pageData.form, {
            amount: "",
            account: "",
            password_gold: "",
            bank_id:"",
            bank:"",
            //account_name:"",
        });
        this.curBankinfo = null;
        this.setRealName();
    }

    setRealName()
    {
        if (this.selfProxy.userInfo.real_name_decrypt)
        {
            this.pageData.form.account_name = this.selfProxy.userInfo.real_name_decrypt;
        }
        else
        {
            this.pageData.form.account_name = "";
        }
        console.log("设置真实信命" + this.pageData.form.account_name );
    }
    addusdt(){
        const  data:any={};
       
        data.name = "USDT";
        data.payment_method_type = 5;
        data.options={};
        data.options["2"]={};
        data.options["2"].name="BSC";
        data.options["2"].payment_method_type = 4;
        data.options["2"].exchange_channel_id = 2;
        data.options["2"].exchange_channel_method_id = 7;
        data.options["2"].subtitle="";
        data.options["2"].explain="";
        data.options["2"].balance="";
        data.options["2"].free_time=1;
        data.options["2"].fee="2%";
        data.options["2"].min_out="10.0000";
        data.options["2"].max_out="10000.000";
        data.options["2"].index_no = 2;
        data.options["6"]={};
        data.options["6"].name="TRC20";
        data.options["6"].payment_method_type = 4;
        data.options["6"].exchange_channel_id = 2;
        data.options["6"].exchange_channel_method_id = 8;
        data.options["6"].subtitle="";
        data.options["6"].explain="";
        data.options["6"].balance="";
        data.options["6"].free_time=1;
        data.options["6"].fee="2%";
        data.options["6"].min_out="10.0000";
        data.options["6"].max_out="10000.000";
        data.options["6"].index_no = 3;
        return data;

    }
    setData(data: any) {
    //    data["USDT"] = this.addusdt();
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
                const obj = this.pageData.methodList[this.pageData.form.coin_name_unique].options[this.pageData.form.block_network_id];

                this.pageData.form.exchange_channel_method_id = obj.exchange_channel_method_id;
                this.pageData.form.payment_method_type = obj.payment_method_type;

                //设置地址，发送 请求
                this.sendAddressInfo();
            }
            
           
        }
        this.setRealName();
        this.setFirstBtn();
    }
    setFirstBtn(){
        const coinObj = this.optionsSort(this.pageData.methodList[this.pageData.form.coin_name_unique].options);
        const sortedOptions:any = Object.values(coinObj).sort((a:any, b:any) => a.sort - b.sort);
        this.pageData.form.block_network_id=sortedOptions[0]?.strkey;
    }
    optionsSort(data:any) {
        const tempdata = JSON.parse(JSON.stringify(data))
        for (const iterator of Object.entries(tempdata)) {
            const item1 = <any>iterator[1];
            item1.strkey=iterator[0];
            if (!item1.sort) {
                
                item1.sort = 1000;
            }
        }
        const sortedOptions = Object.values(tempdata).sort((a:any, b:any) => a.sort - b.sort);
        
        return sortedOptions;
    }
    //设置地址，发送 请求
    sendAddressInfo()
    {
        console.log("发送  请求地址消息")
        //设置地址，发送 请求
        const addressBookProxy: DialogAddressBookProxy = getProxy(DialogAddressBookProxy);
        addressBookProxy.pageData.listQuery.type=this.pageData.form.payment_method_type;
        addressBookProxy.pageData.listQuery.block_network_id=this.pageData.form.block_network_id;
        addressBookProxy.pageData.listQuery.coin_name_unique=this.pageData.form.coin_name_unique;
        addressBookProxy.setData(this.pageData.methodList);
    }

    setCurBankInfo(bank_id:number)
    {
        console.log("需要搜索的银行id " ,bank_id );
        const arr = this.pageData.methodList[this.pageData.form.coin_name_unique].bank_list;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.bank_id == bank_id)
            {
                this.curBankinfo = element;
                console.log("设置  银行 " ,element);
                return;
            }
        }
    }
    setAddress(data: any) {
        console.log("收到 银行卡 信息 回调" );
        this.bankCardInfo = data;
        this.bankCard_nameArr=[];
        this.bankCard_numberArr=[];
        if (!this.bankCardInfo)
            return;

        for (let index = 0; index < this.bankCardInfo.length; index++) {
            const element = this.bankCardInfo[index];
            if (this.bankCard_nameArr.indexOf(element.payment_method.account_name) ==-1)
            {
                this.bankCard_nameArr.push(element.payment_method.account_name);
            }

            if (this.bankCard_numberArr.indexOf(element.payment_method.account) ==-1)
            {
                this.bankCard_numberArr.push(element.payment_method.account);
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
        sendObj.account_name = convert_vi_to_en(sendObj.account_name);;
        console.log("发送的数据为", sendObj);
        this.sendNotification(net.HttpType.api_user_var_exchange_create_order, sendObj);
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
        // const keys = Object.keys(data);
        const keys = Object.keys(GamePlatConfig.config.plat_coins);
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
