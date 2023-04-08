import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import { Component, Watch } from "vue-property-decorator";
import MyCanvas from "@/core/ui/MyCanvas";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { amountFormat } from "@/core/global/Functions";

@Component
export default class TabRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {}
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
        const data = methodList[coin_name_unique].options[block_network_id];

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
        if (!this.form.amount || !this.form.amount.trim()) {
            PanelUtil.message_alert(LangUtil("充值金额不能为空"));
            return;
        }
        const amount_num = parseFloat(this.form.amount);

        if (amount_num <= 0) {
            PanelUtil.message_alert(LangUtil("充值金额不正确"));
            return;
        }

        //检查 是否 符合要求
        if (this.showRequires && this.showRequires.length > 0) {
            //console.log(" 必须的数据" ,this.showRequires);
            for (let index = 0; index < this.showRequires.length; index++) {
                const element = this.showRequires[index];
                if (!element.inputValue || !element.inputValue.trim()) {
                    PanelUtil.message_alert(LangUtil("{0} 不能为空", "pay_" + element.title));
                    return false;
                }
            }
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
        console.log("-- this.form", this.form);
        let explain;
        if (this.pageData.methodList[coin_name_unique] && this.pageData.methodList[coin_name_unique].options) {
            const option = this.pageData.methodList[coin_name_unique].options[block_network_id];
            if (option) {
                console.log("----saaaaa----", option);
                explain = option.explain;
                if (!explain) {
                    const channel = option.channel;
                    if (channel) {
                        const item = channel.find((item: any) => item.third_id == third_id);
                        console.log("----sa1231231aaaa----", item);
                        explain = item.explain;
                    }
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

    addInputMoney(data: number) {
        console.log("增加  " + data);
        let nub = 0;
        if (this.form.amount) {
            nub = parseFloat(this.form.amount);
        }

        nub += data;
        this.form.amount = nub + "";
    }

    public get showRequires(): any {
        const list = <any>[];
        if (!this.form.requires || this.form.requires.length < 1) {
            return list;
        }
        //根据 当前需要的条件 设置  转为对应的对象数据
        for (let index = 0; index < this.form.requires.length; index++) {
            const element = this.form.requires[index];
            const obj = {
                title: element, //显示的标题名字
                //placeholder: LangUtil("请输入{0}", "pay_" +  element),// 没有值的时候 显示的
                inputValue: "", //用户的输入值
            };
            list.push(obj);
        }

        return list;
    }

    onItemClick(key: string) {
        console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;

        //this.changeMoney();
        //this.payChannelList();
    }

    curSelectItem = null;
    public get curShowChannel(): any {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        if (!methodList[coin_name_unique] || !methodList[coin_name_unique].options) {
            console.log("充值数据  空");
            return [];
        }
        console.log(" from -- 数据", this.form);
        console.log("读取的值", methodList[coin_name_unique].options);
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 9) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            console.log("channel---", channel);
            if (channel && channel.length > 0) {
                this.form.third_id = channel[0].third_id;
                this.form.requires = channel[0].requires;
                this.curSelectItem = channel[0];
            }
            return channel;
        }
        return [];
    }

    onChannelItemClick(item: any) {
        console.log(" 渠道 选择 ---", item);
        if (!item) {
            console.log("item为 空");
            return;
        }
        this.jumpTo("#requiresNode");
        this.form.third_id = item.third_id;
        this.form.requires = item.requires;
        this.form.subtitle = item.subtitle;
        this.curSelectItem = item;
    }
    get gold_info() {
        //this.payChannelList();
        //console.log("-----this.pageData.methodList---- ", this.pageData.methodList);
        return this.pageData.methodList;
    }
    jumpTo(target: string) {
        if (!this.$mobile) return;
        setTimeout(() => {
            const getAwardbtn: HTMLElement = <any>document.getElementById("animbtn");
            getAwardbtn?.addEventListener("animationend", () => {
                getAwardbtn.classList.remove("button-animation");
            });
            getAwardbtn?.classList.add("button-animation");

            const obj = document.querySelector(target);
            if (!obj) {
                window.scrollTo({
                    //@ts-ignore
                    top: 100,
                    behavior: "smooth",
                });
            } else {
                window.scrollTo({
                    //@ts-ignore
                    top: obj.offsetTop,
                    behavior: "smooth",
                });
            }
        }, 200);
    }
}
