import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import CopyUtil from "@/core/global/CopyUtil";
import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "@/views/dialog_recharge/proxy/DialogRechargeProxy";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class TabRecharge extends AbstractView {
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;

    CoinIcon = Assets.CoinIcon;
    QRCode = QRCode;

    @Watch("pageData.address")
    onWatchAddress() {
        if (this.pageData.address != "") {
            const div: any = this.$refs.qrcode;
            div.innerHTML = "";
            new this.QRCode(div, this.pageData.address);
        }
    }
    @Watch("form.block_network_id")
    onWatchNetWork() {
        this.myProxy.rechargeProxy.api_user_var_recharge_address();
    }

    onChange(value: any) {
        const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options);
        this.form.block_network_id = keys[0];
    }

    onCopy() {
        CopyUtil(this.pageData.address);
    }

    destroyed() {
        super.destroyed();
        this.pageData.address = "";
    }
}
