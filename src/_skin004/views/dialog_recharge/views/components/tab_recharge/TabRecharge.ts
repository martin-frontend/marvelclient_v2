import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import DialogRechargeProxy from "@/_skin004/views/dialog_recharge/proxy/DialogRechargeProxy";

import { Component, Watch } from "vue-property-decorator";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";
import dialog_message from "@/views/dialog_message";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class TabRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;
    plat_coins = GamePlatConfig.config.plat_coins;
    GameConfig = GameConfig;

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

    public get datalist(): any {
        return this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id];
    }

    onChange2(item: any) {
        if (item) this.form.block_network_id = item.strkey;
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        this.form.recharge_channel_id = methodList[coin_name_unique].options[block_network_id].recharge_channel_id;
        this.form.payemthod_id = <string>methodList[coin_name_unique].options[block_network_id].payemthod_id;
        this.myProxy.rechargeProxy.api_user_var_recharge_address();

        const channel = methodList[coin_name_unique].options[block_network_id].channel;
        if (channel) {
            if (channel.length > 0) {
                this.form.third_id = channel[0].third_id;
                this.form.subtitle = channel[0].subtitle;
                this.paymethodChangeMoney();
            }
        } else {
            this.changeMoney();
        }
    }
    // 如果是现金支付，则选择第三个。
    changeMoney() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;

        const data = methodList[coin_name_unique].options[block_network_id];
        const payemthod_id = methodList[coin_name_unique].options[block_network_id].payemthod_id;
        if (payemthod_id == 5 || payemthod_id == 8) {
            const fixed_gold_list = data.fixed_gold_list;

            if (fixed_gold_list && fixed_gold_list.length > 0) {
                this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
            }
        }

        if (data.payemthod_id == 6) {
            const channel = data.channel;
            if (channel && channel.length > 0) {
                this.pageData.form.third_id = channel[0].third_id;
                this.pageData.form.subtitle = channel[0].subtitle;

                const fixed_gold_list = channel[0].fixed_gold_list;
                if (fixed_gold_list && fixed_gold_list.length > 0) {
                    this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                    this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
                }
            }
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
    paymethodThirdClick(item: any) {
        this.form.third_id = item.third_id;
        this.form.subtitle = item.subtitle;
        this.paymethodChangeMoney();
    }

    paymethodChangeMoney() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id, third_id } = this.form;
        const options = methodList[coin_name_unique].options;
        if (options[block_network_id].payemthod_id == 6) {
            const fixed_gold_list = options[block_network_id].channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
        }
        if (options[block_network_id].payemthod_id == 8) {
            const fixed_gold_list = options[block_network_id].channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
        }
    }

    getPaymethod_fixed_gold_list() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id, third_id } = this.form;
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 6) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            return channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
        }
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 8) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            return channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
        }
        return [];
    }

    // 创建充值订单
    onSumbit() {
        const { recharge_channel_id, payemthod_id } = this.datalist;
        Object.assign(this.pageData.form, { recharge_channel_id, payemthod_id });
        this.myProxy.rechargeProxy.api_user_var_recharge_create(payemthod_id);
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

    get linkUrl() {
        let url = "";
        if (this.datalist && this.datalist.payemthod_id == 5) {
            switch (this.datalist.name.toLowerCase()) {
                case "okpay":
                    url = GameConfig.config.okpayUrl;
                    break;
                case "topay":
                    url = GameConfig.config.topayUrl;
                    break;
            }
        }
        return url;
    }
}
