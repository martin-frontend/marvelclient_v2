import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import DialogRechargeProxy from "@/views/dialog_recharge/proxy/DialogRechargeProxy";
import { Component, Watch } from "vue-property-decorator";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";

@Component
export default class TabRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    onChange1(value: any) {
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
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();
    }
    onChange2(value: any) {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();
    }

    onCopy() {
        CopyUtil(this.pageData.address);
    }

    onLink(url: string) {
        OpenLink(url);
    }

    destroyed() {
        super.destroyed();
        this.pageData.address = "";
    }

    async showPreview() {
        if (this.pageData.qrcode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.address, 16, 16, 256, 256);
            dialog_preview.show(myCanvas.getData());
        }
    }

    transformExplain(str: string) {
        if (str) {
            return str.split("\n");
        }
        return [];
    }
}
