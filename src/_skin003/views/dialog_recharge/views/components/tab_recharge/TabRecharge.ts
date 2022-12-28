import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import DialogRechargeProxy from "@/_skin003/views/dialog_recharge/proxy/DialogRechargeProxy";
import { Component, Watch } from "vue-property-decorator";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";
import dialog_message from "@/views/dialog_message";

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
        if (value) this.form.block_network_id = value;
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();

        const channel = methodList[coin_name_unique].options[block_network_id].channel;
        if (channel) {
            if (channel.length > 0) {
                this.form.third_id = channel[0].third_id;
                this.form.subtitle = channel[0].subtitle;
                this.paymethod6ChangeMoney();
            }
        } else {
            this.changeMoney();
        }
    }
    // 如果是现金支付，则选择第三个。
    changeMoney() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 5) {
            const fixed_gold_list = methodList[coin_name_unique].options[block_network_id].fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
        }
    }

    onCopy() {
        CopyUtil(this.pageData.address);
        dialog_message.info(LangUtil("复制成功"));
    }

    onLink(url: string) {
        OpenLink(url);
    }
    // 选择快捷金额
    onGoldClick(index: any, item: any) {
        this.form.amount = item;
        this.pageData.gold_index = index;
    }

    // 选择通道
    paymethod6ThirdClick(item: any) {
        this.form.third_id = item.third_id;
        this.form.subtitle = item.subtitle;
        this.paymethod6ChangeMoney();
    }

    paymethod6ChangeMoney() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id, third_id } = this.form;
        const options = methodList[coin_name_unique].options;
        if (options[block_network_id].payemthod_id == 6) {
            const fixed_gold_list = options[block_network_id].channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
        }
    }

    getPaymethod6_fixed_gold_list() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id, third_id } = this.form;
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 6) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            return channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
        }
        return [];
    }

    // 创建充值订单
    onSumbit() {
        this.myProxy.rechargeProxy.api_user_var_recharge_create();
    }

    destroyed() {
        super.destroyed();
        this.pageData.address = "";
    }
    /**显示大图 */
    async showPreview() {
        if (this.pageData.qrcode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.address, 16, 16, 256, 256);
            dialog_preview.show(myCanvas.getData());
        }
    }
    /**获取说明 */
    getExplain() {
        const { coin_name_unique, block_network_id, third_id } = this.form;
        let explain;
        if (this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].options) {
            explain = this.pageData.methodList[coin_name_unique].options[block_network_id].explain;
            if (!explain) {
                const channel = this.pageData.methodList[coin_name_unique].options[block_network_id].channel;
                if (channel) {
                    const item = channel.find((item: any) => item.third_id == third_id);
                    explain = item.explain;
                }
            }
        }

        return explain;
    }

    transformExplain(str: string) {
        if (str) {
            return str.split("\n");
        }
        return [];
    }

    get isInputDisabled(): boolean {
        const { coin_name_unique, block_network_id, third_id } = this.form;
        if (this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].options) {
            const channel = this.pageData.methodList[coin_name_unique].options[block_network_id].channel;
            if (channel) {
                const item = channel.find((item: any) => item.third_id == third_id);
                if (item) {
                    return !!item.is_fixed_gold;
                }
            } else {
                return !!this.pageData.methodList[coin_name_unique].options[block_network_id].is_fixed_gold;
            }
        }
        return false;
    }
}
