import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { amountFormat } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_bankcard_info from "@/_skin004/views/dialog_bankcard_info";

@Component
export default class ExchangeTypeCommon extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    myProxy = PanelUtil.getProxy_recharge;
    addressBooProxy = PanelUtil.getProxy_addressBook;
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    plat_coins = GamePlatConfig.config.plat_coins;

    get gold_info() {
        return this.pageData.methodList;
    }
    public get methodlist_data(): any {
        return this.pageData.methodList[this.form.coin_name_unique];
    }
    public get bank_list(): any {
        if (this.pageData && this.pageData.methodList && this.methodlist_data && this.methodlist_data.bank_list)
            return this.methodlist_data.bank_list;
        return null;
    }
    mounted() {
        this.reSetRequir();
    }
    onItemClick(key: string) {
        //console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;
    }

    onChangeSub(value: any) {
        this.form.block_network_id = value;
        this.form.exchange_channel_method_id =
            this.pageData.methodList[this.form.coin_name_unique].options[value].exchange_channel_method_id;
        // 地址簿
        this.addressBooProxy.pageData.listQuery.block_network_id = value;
        this.form.requires = this.pageData.methodList[this.form.coin_name_unique].options[value].requires;
        this.reSetRequir();
        this.form.password_gold = "";
    }
    get balance() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            return this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        }
        return "0.00";
    }

    onAddressBook() {
        //打开地址薄
        //dialog_address_book.show();
        PanelUtil.openpanel_address_book();
    }

    onPaste() {
        if (window.navigator.clipboard) {
            //@ts-ignore
            window.navigator.clipboard.readText().then((result: any) => {
                this.form.account = result;
            });
        }
    }

    onWallet() {
        //打开平台钱包
        PanelUtil.openpanel_wallet();
    }

    onAll() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            this.form.amount = this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        } else {
            this.form.amount = "0.00";
        }
    }
    onSetPassword() {
        PanelUtil.openpanel_trade_password();
    }
    onSubmit() {
        if (!this.chickRequires()) {
            return;
        }
        PanelUtil.message_confirm({
            message: LangUtil("确认提交"),
            okFun: () => {
                this.myProxy.exchangeProxy.api_user_var_exchange_create_order(this.showRequires);
            },
        });
    }
    transformExplain(str: string) {
        if (str) {
            return str.split("\n");
        }
        return [];
    }
    get isChecked(): boolean {
        const { amount, account, coin_name_unique, password_gold } = this.form;

        if (amount != "" && password_gold != "") {
            const amount_num = parseFloat(amount);
            if (amount_num > 0 && amount_num <= this.myProxy.exchangeProxy.gold_info[coin_name_unique].sum_money) {
                if (this.showRequires.length < 1) {
                    return account != "";
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    bshowAllNameList = false; //是否显示 名字的下拉菜单
    onNameInputInput() {
        this.bshowAllNameList = true;
        //console.log("正在编辑");
    }
    onNameInputBlur() {
        //console.log("失去焦点");
        setTimeout(() => {
            this.bshowAllNameList = false;
        }, 100);
    }

    public get allNames(): any {
        if (!this.form.account_name || this.form.account_name == "") {
            return [];
            //return this.myProxy.exchangeProxy.bankCard_nameArr;
        }
        const newArr = [];
        for (let index = 0; index < this.myProxy.exchangeProxy.bankCard_nameArr.length; index++) {
            const element = this.myProxy.exchangeProxy.bankCard_nameArr[index];
            if (element.indexOf(this.form.account_name) > -1) {
                newArr.push(element);
            }
        }
        return newArr;
    }
    onClickNameSelect(item: any) {
        console.log("收到点击", item);
        this.form.account_name = item;
    }
    bshowNumberList = false; //是否显示 名字的下拉菜单
    onNumberInputInput() {
        this.bshowNumberList = true;
    }
    onNumberInputBlur() {
        setTimeout(() => {
            this.bshowNumberList = false;
        }, 100);
    }
    onClickNumberSelect(item: any) {
        //console.log("收到点击", item);
        this.form.account = item;
    }
    onBankcardInfo() {
        console.log(" 点击银行卡 信息");
        dialog_bankcard_info.show(this.myProxy.exchangeProxy.bankCardInfo);
    }

    showRequires = <any>[];
    reSetRequir() {
        this.showRequires = <any>[];
        if (!this.form.requires) return;

        const keys = Object.keys(this.form.requires);
        if (keys.length < 1) return;

        for (let index = 0; index < keys.length; index++) {
            const element = this.form.requires[keys[index]];

            const obj = {
                title: element.name, //显示的标题名字
                tips: element.tips,
                key: keys[index],
                //placeholder: LangUtil("请输入{0}", "pay_" +  element),// 没有值的时候 显示的
                inputValue: "", //用户的输入值
                errinfo: "", //错误信息
                timeHeadle: null, //错误提示的句柄
            };
            this.showRequires.push(obj);
        }
    }
    chickRequires() {
        if (this.showRequires.length < 1) {
            return true;
        }
        if (this.showRequires && this.showRequires.length > 0) {
            //console.log(" 必须的数据" ,this.showRequires);
            let isChick = true;
            for (let index = 0; index < this.showRequires.length; index++) {
                const element = this.showRequires[index];

                if (!this.onBlurInput(element)) {
                    isChick = false;
                }
            }
            return isChick;
        }
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

    public get allCardNub(): any {
        if (!this.form.account || this.form.account == "") {
            return [];
            //return this.myProxy.exchangeProxy.bankCard_numberArr;
        }
        const newArr = [];
        for (let index = 0; index < this.myProxy.exchangeProxy.bankCard_numberArr.length; index++) {
            const element = this.myProxy.exchangeProxy.bankCard_numberArr[index];
            if (element.indexOf(this.form.account) > -1) {
                newArr.push(element);
            }
        }
        return newArr;
    }
    public get isShowChannel(): boolean {
        // if (
        //     this.pageData.methodList[this.form.coin_name_unique] &&
        //     (this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].payemthod_id == 6 ||
        //         this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].payemthod_id == 8)
        // ) {
        const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].channel);
        if (keys && keys.length > 1) {
            return true;
        }
        // }
        return false;
    }
    public get isShowOptions(): boolean {
        if (this.pageData.methodList[this.form.coin_name_unique] && this.pageData.methodList[this.form.coin_name_unique].options) {
            const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options);
            if (keys && keys.length > 1) {
                return true;
            }
        }
        return false;
    }
}
