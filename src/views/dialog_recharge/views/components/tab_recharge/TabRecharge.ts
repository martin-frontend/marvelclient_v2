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
        this.changeMoney();
    }
    onChange2(value: any) {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();
        this.changeMoney();
    }
    // 如果是现金支付，则选择第三个。
    changeMoney(){
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        if(methodList[coin_name_unique].payemthod_id == 5){
            const fixed_gold_list = methodList[coin_name_unique].options[block_network_id].fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
        }
    }

    onCopy() {
        CopyUtil(this.pageData.address);
    }

    onLink(url: string) {
        OpenLink(url);
    }
    // 选择快捷金额
    onGoldClick(index:any, item:any){
        this.form.amount = item;
        this.pageData.gold_index = index;
    }
    // 创建充值订单
    onSumbit(){
        this.myProxy.rechargeProxy.api_user_var_recharge_create();
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
