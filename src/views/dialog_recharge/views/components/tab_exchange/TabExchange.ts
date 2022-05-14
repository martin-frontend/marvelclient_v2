import { CoinIcon } from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "@/views/dialog_recharge/proxy/DialogRechargeProxy";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabExchange extends AbstractView {
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;

    CoinIcon = CoinIcon;

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
    }

    get isChecked(): boolean {
        const { amount, account, coin_name_unique } = this.form;
        if (amount != "") {
            const amount_num = parseFloat(amount);
            if (amount_num > 0 && amount_num <= this.myProxy.exchangeProxy.gold_info[coin_name_unique].sum_money && account != "") {
                return true;
            }
        }
        return false;
    }

    get balance() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            return this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].sum_money;
        }
        return "0.00";
    }

    onAll() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            this.form.amount = this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].sum_money;
        } else {
            this.form.amount = "0.00";
        }
    }

    onSubmit() {
        this.myProxy.exchangeProxy.api_user_var_exchange_create_order();
    }
}
