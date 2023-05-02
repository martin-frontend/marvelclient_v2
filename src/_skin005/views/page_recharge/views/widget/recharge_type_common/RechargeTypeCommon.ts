import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { amountFormat } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import OpenLink from "@/core/global/OpenLink";
import MyCanvas from "@/core/ui/MyCanvas";

@Component
export default class RechargeTypeCommon extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    GamePlatConfig = GamePlatConfig;
    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {
        //this.onChange1("");
        this.reSetRequir();
    }
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
    onItemClick(key: string) {
        console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;
        this.changeMoney();
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
        const data = methodList[coin_name_unique].options[block_network_id];
        if (!data) return;
        const payemthod_id = data.payemthod_id;
        if (payemthod_id == 5 || payemthod_id == 8 || payemthod_id == 10) {
            const fixed_gold_list = data.fixed_gold_list;

            if (fixed_gold_list && fixed_gold_list.length > 0) {
                this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
                this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
            }
            this.myProxy.rechargeProxy.pageData.form.requires = data.requires;

            console.log("---data.requires----", this.myProxy.rechargeProxy.pageData.form.requires);
            this.reSetRequir();
        }
        if (data.payemthod_id == 6) {
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
        PanelUtil.message_info(LangUtil("复制成功"));
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
        if (
            options[block_network_id].payemthod_id == 6 ||
            options[block_network_id].payemthod_id == 8 ||
            options[block_network_id].payemthod_id == 10
        ) {
            const fixed_gold_list = options[block_network_id].channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
            this.pageData.form.amount = fixed_gold_list[2] || fixed_gold_list[1] || fixed_gold_list[0] || 0;
            this.pageData.gold_index = fixed_gold_list.indexOf(this.pageData.form.amount);
            this.pageData.form.requires = options[block_network_id].requires;
            console.log("---options[block_network_id]----", options[block_network_id]);
        }
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

    getPaymethod6_fixed_gold_list() {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id, third_id } = this.form;
        const data = methodList[coin_name_unique].options[block_network_id];
        if (!data) return;

        if (data.payemthod_id == 6 || data.payemthod_id == 8) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            return channel.find((item: any) => item.third_id == third_id).fixed_gold_list;
        }

        if (data.payemthod_id == 10) {
            return data.fixed_gold_list;
        }
        return [];
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
    // 创建充值订单
    onSumbit() {
        if (!this.form.amount || !this.form.amount.trim()) {
            PanelUtil.message_alert(LangUtil("充值金额不能为空"));
            return;
        }
        const amount_num = parseFloat(this.form.amount);

        if (amount_num <= 0) {
            PanelUtil.message_alert(LangUtil("充值金额不正确"));
            return;
        }
        if (!this.chickRequires()) {
            return;
        }
        this.myProxy.rechargeProxy.api_user_var_recharge_create(this.showRequires);
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
            //dialog_preview.show(myCanvas.getData());
            PanelUtil.openpanel_preview(myCanvas.getData());
        }
    }
    /**获取说明 */
    getExplain() {
        const { coin_name_unique, block_network_id, third_id } = this.form;
        //console.log("-- this.form", this.form);
        let explain;
        if (this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].options) {
            const option = this.pageData.methodList[coin_name_unique].options[block_network_id];
            if (option) {
                //console.log("----saaaaa----", option);
                explain = option.explain;
                if (!explain) {
                    const channel = option.channel;
                    if (channel) {
                        const item = channel.find((item: any) => item.third_id == third_id);
                        //console.log("----sa1231231aaaa----", item);
                        explain = item.explain;
                    }
                }
            }
        }

        return explain;
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
    transformExplain(str: string) {
        if (str) {
            return str.split("\n");
        }
        return [];
    }
    get gold_info() {
        //this.payChannelList();
        //console.log("-----this.pageData.methodList---- ", this.pageData.methodList);
        return this.pageData.methodList;
    }

    public get isShowChannel(): boolean {
        // if (
        //     this.pageData.methodList[this.form.coin_name_unique] &&
        //     (this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].payemthod_id == 6 ||
        //         this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].payemthod_id == 8)
        // ) {
        if (!this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].channel) return false;
        const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options[this.form.block_network_id].channel);
        if (keys && keys.length > 1) {
            return true;
        }
        // }
        return false;
    }
    public get isShowOptions(): boolean {
        if (this.pageData.methodList[this.form.coin_name_unique] && this.pageData.methodList[this.form.coin_name_unique].options) {
            const options = this.pageData.methodList[this.form.coin_name_unique].options;
            const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options);
            // if (this.form.coin_name_unique == "BRL")
            // {
            this.brlOptions = keys.sort((a, b) => options[a]["sort"] - options[b]["sort"]);
            // }
            if (keys && keys.length > 1) {
                return true;
            }
        }
        return false;
    }

    brlOptions = <any>[];

    /**奖励的金额 */
    public bouns_value(idx: number): string {
        const { coin_name_unique, block_network_id, third_id } = this.form;
        const options = this.pageData.methodList[coin_name_unique].options[block_network_id];

        if (options && options.gift_amount_list && options.gift_amount_list.length > 0) {
            return options.gift_amount_list[idx];
        }
        return "";
    }
}
