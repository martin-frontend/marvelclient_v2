import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_address_book from "@/views/dialog_address_book";
import DialogAddressBookProxy from "@/views/dialog_address_book/proxy/DialogAddressBookProxy";
import dialog_message_box from "@/views/dialog_message_box";
import DialogRechargeProxy from "@/views/dialog_recharge/proxy/DialogRechargeProxy";
import dialog_trade_password from "@/views/dialog_trade_password";
import dialog_wallet from "@/views/dialog_wallet";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabExchange extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    addressBooProxy: DialogAddressBookProxy = this.getProxy(DialogAddressBookProxy);
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    get bindHtml() {
        return LangUtil(
            "为保证您的资金安全，请先在 {0} 绑定谷歌两步验证。",
            `<a class="text-decoration-underline colorBtnBg--text" target="_blank" href="${LangUtil("安全中心链接")}">${LangUtil("安全中心")}</a>`
        );
    }

    @Watch("form.block_network_id")
    onWatchNetwwork() {
        const coinObj = this.pageData.methodList[this.form.coin_name_unique];
        if (coinObj) {
            const obj = coinObj.options[this.form.block_network_id];
            this.form.exchange_channel_id = obj.exchange_channel_id;
            this.form.payment_method_type = obj.payment_method_type;
        }
    }

    onChange(value: any) {
        const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options);
        this.form.block_network_id = keys[0];
        this.form.exchange_channel_method_id = this.pageData.methodList[this.form.coin_name_unique].options[keys[0]].exchange_channel_method_id;
        // 地址簿
        // this.addressBooProxy.pageData.listQuery.coin_name_unique = value;
        // console.log(this.addressBooProxy.pageData.listQuery);

    }

    onChangeSub(value: any) {
        this.form.exchange_channel_method_id = this.pageData.methodList[this.form.coin_name_unique].options[value].exchange_channel_method_id;
        // 地址簿
        // this.addressBooProxy.pageData.listQuery.block_network_id = value;
    }

    get isChecked(): boolean {
        const { amount, account, coin_name_unique, password_gold } = this.form;
        if (amount != "" && password_gold != "") {
            const amount_num = parseFloat(amount);
            if (amount_num > 0 && amount_num <= this.myProxy.exchangeProxy.gold_info[coin_name_unique].sum_money && account != "") {
                return true;
            }
        }
        return false;
    }

    get balance() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            return this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        }
        return "0.00";
    }

    onAddressBook() {
        //打开地址薄
        dialog_address_book.show();
    }

    onPaste() {
        if (navigator.clipboard) {
            //@ts-ignore
            navigator.clipboard.readText().then((result: any) => {
                this.form.account = result;
            });
        }
    }

    onWallet() {
        //打开平台钱包
        dialog_wallet.show();
    }

    onAll() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            this.form.amount = this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        } else {
            this.form.amount = "0.00";
        }
    }

    onSetPassword() {
        dialog_trade_password.show();
    }

    onSubmit() {
        dialog_message_box.confirm({
            message: "确认提交",
            okFun: () => {
                this.myProxy.exchangeProxy.api_user_var_exchange_create_order();
            },
        });
    }
}
