import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { amountFormat, checkMail, checkOnlyEnglishChar } from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { inputErrorObj } from "../../../proxy/PageRechargeProxy";

@Component
export default class RechargeType9 extends AbstractView {
    LangUtil = LangUtil;
    myProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.rechargeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    plat_coins = GamePlatConfig.config.plat_coins;

    mounted() {}

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
                // const element = this.showRequires[index];
                // if (!element.inputValue || !element.inputValue.trim()) {
                //     PanelUtil.message_alert(LangUtil("{0} 不能为空", "pay_" + element.title));
                //     return false;
                // }
                const str = this.onBlurInput(this.showRequires[index]);
                if (str && str.errorinfo) {
                    PanelUtil.message_info(str);
                    return;
                }
            }
        }
        this.myProxy.rechargeProxy.api_user_var_recharge_create(this.showRequires);
    }
    onBlurInput(item: any): inputErrorObj {
        console.log("失去焦点的 输入为", item);
        const errorInfo: inputErrorObj = {
            title: "",
            errorinfo: "",
        };
        if (!this.curSelectItem) {
            return errorInfo;
        }
        item.inputValue = item.inputValue.trim();
        if (!item.inputValue || item.inputValue == "") {
            const curBoxTitle = LangUtil("pay_" + this.curSelectItem.subtitle + "_" + item.title);
            errorInfo.title = curBoxTitle;
            errorInfo.errorinfo = LangUtil("不能为空");
            return errorInfo;
        }
        const errstr: inputErrorObj = {
            title: "",
            errorinfo: "",
        };
        switch (this.curSelectItem.subtitle.toLowerCase()) {
            case "neteller":
            case "skrill":
                Object.assign(errstr, this.checkSkrill(item));
                break;
            default:
                break;
        }
        item.errinfo = errstr.errorinfo;
        return errstr;
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
    @Watch("curSelectItem")
    onChangeCurSelectItem() {
        console.log("---变化了");
        this.reSetRequir();
    }
    showRequires = <any>[];
    reSetRequir() {
        this.showRequires = <any>[];
        if (!this.form.requires || this.form.requires.length < 1) {
            return;
        }
        //根据 当前需要的条件 设置  转为对应的对象数据
        for (let index = 0; index < this.form.requires.length; index++) {
            const element = this.form.requires[index];
            const obj = {
                title: element, //显示的标题名字
                //placeholder: LangUtil("请输入{0}","exc_" +  element),// 没有值的时候 显示的
                inputValue: "", //用户的输入值
                errinfo: "", //错误信息
                timeHeadle: null, //错误提示的句柄
            };
            this.showRequires.push(obj);
        }
    }

    // public get showRequires(): any {
    //     const list = <any>[];
    //     if (!this.form.requires || this.form.requires.length < 1) {
    //         return list;
    //     }
    //     //根据 当前需要的条件 设置  转为对应的对象数据
    //     for (let index = 0; index < this.form.requires.length; index++) {
    //         const element = this.form.requires[index];
    //         const obj = {
    //             title: element, //显示的标题名字
    //             //placeholder: LangUtil("请输入{0}", "pay_" +  element),// 没有值的时候 显示的
    //             inputValue: "", //用户的输入值
    //             errinfo: "", //错误信息
    //             timeHeadle: null, //错误提示的句柄
    //         };
    //         list.push(obj);
    //     }

    //     return list;
    // }
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
    onItemClick(key: string) {
        console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;

        //this.changeMoney();
        //this.payChannelList();
        //this.onChange1("");
    }
    curSelectItem = <any>null;
    public get curShowChannel(): any {
        const { methodList } = this.pageData;
        const { coin_name_unique, block_network_id } = this.form;
        if (!methodList[coin_name_unique] || !methodList[coin_name_unique].options) {
            console.log("充值数据  空");
            return [];
        }
        //console.log(" from -- 数据", this.form);
        //console.log("读取的值", methodList[coin_name_unique].options);
        if (!methodList[coin_name_unique].options[block_network_id]) {
            return [];
        }
        if (methodList[coin_name_unique].options[block_network_id].payemthod_id == 9) {
            const channel = methodList[coin_name_unique].options[block_network_id].channel;
            //console.log("channel---", channel);
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
        //console.log(" 渠道 选择 ---", item);
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

    destroyed() {
        super.destroyed();
    }
    /**新版兑换 skrill 的验证 */
    checkSkrill(item: any): inputErrorObj {
        const element = item;
        const inputValue = element.inputValue;
        const curBoxTitle = LangUtil("pay_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);
        const errorInfo: inputErrorObj = {
            title: curBoxTitle,
            errorinfo: "",
        };
        // 符合正常email格式
        if (element.title == "upiaccount") {
            if (!checkMail(inputValue)) {
                errorInfo.errorinfo = LangUtil("账号格式不正确");
                return errorInfo;
                //return curBoxTitle + LangUtil("账号格式不正确");
            }
        }
        // 1. 只會是全英文字母, 長度不做限制
        // 2. 不會有特殊符號, 不會有數字
        else if (
            element.title == "accountname" ||
            element.title == "accountname" ||
            element.title == "accountname" ||
            element.title == "firstname" ||
            element.title == "lastname"
        ) {
            if (!checkOnlyEnglishChar(inputValue)) {
                errorInfo.errorinfo = LangUtil("只能为全英文字符");
                return errorInfo;
                //return curBoxTitle + LangUtil("只能为全英文字符");
            }
        }
        // 符合正常email格式
        else if (element.title == "email") {
            if (!checkMail(inputValue)) {
                errorInfo.errorinfo = LangUtil("邮箱格式不正确");
                return errorInfo;
                //return curBoxTitle + LangUtil("邮箱格式不正确");
            }
        }
        return errorInfo;
    }
}
