import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabExchange extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    myProxy = PanelUtil.getProxy_recharge;
    addressBooProxy = PanelUtil.getProxy_addressBook;
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {
        const aLink = document.getElementById("aLink");
        if (aLink) {
            aLink.addEventListener("click", () => {
                PanelUtil.openpanel_safety_center();
            });
        }
    }

    get bindHtml() {
        return LangUtil(
            "为保证您的资金安全，请先在 {0} 绑定谷歌两步验证。",
            `<a id="aLink" class="text-decoration-underline textYellow--text">${LangUtil("安全中心")}</a>`
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
        const { methodList } = this.pageData;
        const { coin_name_unique } = this.form;
        const keys = Object.keys(methodList[coin_name_unique].options);

        // 默认选择trc20
        let block_network_id = keys[0];
        for (const key of keys) {
            if (methodList[coin_name_unique].options[key].name.toLowerCase() == "trc20") {
                block_network_id = key;
            }
        }

        this.form.block_network_id = block_network_id;
        this.form.exchange_channel_method_id = methodList[coin_name_unique].options[block_network_id].exchange_channel_method_id;
        // 地址簿
        this.addressBooProxy.pageData.listQuery.coin_name_unique = value;
    }

    onChangeSub(value: any) {
        this.form.block_network_id = value;
        this.form.exchange_channel_method_id =
            this.pageData.methodList[this.form.coin_name_unique].options[value].exchange_channel_method_id;
        // 地址簿
        this.addressBooProxy.pageData.listQuery.block_network_id = value;
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
        // const { phone, email } = this.selfProxy.userInfo;
        // if (phone || email) {

        PanelUtil.openpanel_trade_password();
        // } else {
        //     //dialog_message_box.alert(LangUtil("请先绑定邮箱或者手机"));
        //     PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
        // }
    }

    onSubmit() {
        PanelUtil.message_confirm({
            message: LangUtil("确认提交"),
            okFun: () => {
                this.myProxy.exchangeProxy.api_user_var_exchange_create_order();
            },
        });
    }

    transformExplain(str: string) {
        if (str) {
            return str.split("\n");
        }
        return [];
    }
}
