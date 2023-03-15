import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
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
        //console.log( "-1-"+ amount +  "-1-"+ account +"-1-"+ coin_name_unique +"-1-"+ password_gold);
        if (this.showRequires && this.showRequires.length > 0) {
            //console.log(" 必须的数据" ,this.showRequires);
            for (let index = 0; index < this.showRequires.length; index++) {
                const element = this.showRequires[index];
                if (!element.inputValue) {
                    return false;
                }
            }
            if (amount != "" && password_gold != "") {
                const amount_num = parseFloat(amount);
                if (amount_num > 0 && amount_num <= this.myProxy.exchangeProxy.gold_info[coin_name_unique].sum_money) {
                    return true;
                }
            }

        }
        //console.log("---检查----" + amount +  "---" + password_gold );
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

    public get curShowChannel(): any {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        if (!methodList[coin_name_unique] || !methodList[coin_name_unique].options) {
            console.log("兑换数据  空");
            return [];
        }
        const channel = methodList[coin_name_unique].options[block_network_id];
        //console.log("channel-兑换--", channel);
        if (channel && channel.length > 0) {
            this.setFormData(channel[0]);
        }
        return channel;
        // }
        return [];
    }
    get gold_info() {
        return this.pageData.methodList;
    }
    curSelectItem = null;
    setFormData(item:any)
    {
        this.curSelectItem = item;
        this.form.subtitle = item.subtitle;
        this.form.third_id = item.third_id;
        this.form.requires = item.requires;
        this.form.exchange_channel_id = item.exchange_channel_id;
        this.form.payment_method_type = item.payment_method_type;
        this.form.exchange_channel_method_id = item.exchange_channel_method_id;
        this.form.password_gold ="";
    }
    onChannelItemClick(item: any) {
        //console.log(" 渠道 选择 ---", item);
        if (!item) {
           // console.log("item为 空");
            return;
        }
        this.setFormData(item);
    }
    onItemClick(key: string) {
        //console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;

        //this.changeMoney();
        //this.payChannelList();
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
                title: element,   //显示的标题名字
                //placeholder: LangUtil("请输入{0}","exc_" +  element),// 没有值的时候 显示的
                inputValue: "",//用户的输入值
            }
            list.push(obj);
        }

        return list;
    }

    openLink(url: string) {
        OpenLink(url);
    }
    onAll() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            this.form.amount = this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        } else {
            this.form.amount = "0.00";
        }
    }

    onSetPassword() {
        const { phone, email } = this.selfProxy.userInfo;
        // if (phone || email) {

             PanelUtil.openpanel_trade_password();
        // } else {
        //     //PanelUtil.message_alert(LangUtil("请先绑定邮箱或者手机"));
        //     PanelUtil.message_confirm({
        //         message: LangUtil("请先绑定邮箱或者手机"),
        //         okFun: () => {
        //             PanelUtil.openpanel_safety_center();
        //         },
        //     });
        // }
    }

    onSubmit() {
        PanelUtil.message_confirm({
            message: LangUtil("确认提交"),
            okFun: () => {
                if (this.showRequires && this.showRequires.length > 0) {
                    this.myProxy.exchangeProxy.api_user_var_exchange_create_order(this.showRequires);
                }
                else
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
