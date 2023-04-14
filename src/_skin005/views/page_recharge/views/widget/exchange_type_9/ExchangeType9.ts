import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import {
    amountFormat,
    checkMail,
    checkOnlyEnglishChar,
    checkOnlyNub,
    checkOnlyUpChar,
    checkOnlyUpCharAndNub,
} from "@/core/global/Functions";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class ExchangeType9 extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    myProxy = PanelUtil.getProxy_recharge;
    addressBooProxy = PanelUtil.getProxy_addressBook;
    pageData = this.myProxy.exchangeProxy.pageData;
    form = this.pageData.form;
    amountFormat = amountFormat;
    plat_coins = GamePlatConfig.config.plat_coins;

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

    // @Watch("form.block_network_id")
    // onWatchNetwwork() {
    //     const coinObj = this.pageData.methodList[this.form.coin_name_unique];
    //     if (coinObj) {
    //         const obj = coinObj.options[this.form.block_network_id];
    //         this.form.exchange_channel_id = obj.exchange_channel_id;
    //         this.form.payment_method_type = obj.payment_method_type;
    //     }
    // }

    @Watch("curSelectItem")
    onChangeCurSelectItem() {
        console.log("---变化了");
        this.reSetRequir();
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
            return channel;
        }

        // }
        return [];
    }
    get gold_info() {
        return this.pageData.methodList;
    }
    curSelectItem = <any>null;
    setFormData(item: any) {
        this.curSelectItem = item;
        this.form.subtitle = item.subtitle;
        this.form.third_id = item.third_id;
        this.form.requires = item.requires;
        this.form.exchange_channel_id = item.exchange_channel_id;
        this.form.payment_method_type = item.payment_method_type;
        this.form.exchange_channel_method_id = item.exchange_channel_method_id;
        this.form.password_gold = "";
    }
    onChannelItemClick(item: any) {
        //console.log(" 渠道 选择 ---", item);
        if (!item) {
            // console.log("item为 空");
            return;
        }
        if (this.curSelectItem == item) return;
        this.jumpTo("#requiresNode");
        this.setFormData(item);
    }
    onItemClick(key: string) {
        //console.log("   ----当前  点击----", key);
        this.form.coin_name_unique = key;
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
    onAll() {
        if (this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique]) {
            this.form.amount = this.myProxy.exchangeProxy.gold_info[this.form.coin_name_unique].plat_money;
        } else {
            this.form.amount = "0.00";
        }
    }

    onSetPassword() {
        PanelUtil.openpanel_trade_password();
    }

    /**新版兑换 Netbanking 的验证 */
    checkNetbanking(item: any) {
        const element = item;
        let inputValue = element.inputValue;
        const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);

        //bankifsc 验证
        // 1.長度固定為11碼,均大寫英文+數字
        // 2.前四碼全是英文字母 (銀行代號)
        // 3.第五碼是數字“O” (預備碼)
        // 4.最後六碼是全數字或全英文字母 (分行代號)
        if (element.title == "bankifsc") {
            element.inputValue = element.inputValue.toUpperCase();
            inputValue = element.inputValue;
            if (inputValue.length != 11) {
                return curBoxTitle + LangUtil("长度必须是11位英文与数字");
            }
            if (!checkOnlyUpCharAndNub(inputValue)) {
                return curBoxTitle + LangUtil("必须为大写英文与数字");
            }
            let str = inputValue.substr(0, 4);
            if (!checkOnlyUpChar(str)) {
                return curBoxTitle + LangUtil("前四位必须为大写英文");
            }
            str = inputValue.substr(4, 1);
            if (str != "0" && str != 0) {
                return curBoxTitle + LangUtil("第五位必须为0");
            }
            str = inputValue.substr(5);
            if (!checkOnlyNub(str) && !checkOnlyUpChar(str)) {
                return curBoxTitle + LangUtil("后6位必须为全数字或者全英文");
            }
        }
        // 1.只會是全數字, 長度是9-19位數字
        // 2.不會有特殊符號, 不會有英文字母
        else if (element.title == "accountnumber") {
            if (inputValue.length > 19 || inputValue.length < 9 || !checkOnlyNub(inputValue)) {
                return curBoxTitle + LangUtil("长度必须为9-19位的数字");
            }
        }
        // 1. 只會是全英文字母, 長度不做限制
        // 2. 不會有特殊符號, 不會有數字
        else if (element.title == "accountname") {
            if (!checkOnlyEnglishChar(inputValue)) {
                return curBoxTitle + LangUtil("只能为全英文字符");
            }
        }

        return "";
    }

    /**新版兑换 crypto 的验证 */
    checkCrypto(item: any) {
        const element = item;
        const inputValue = element.inputValue;
        const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);

        // USDT TRC-20  開頭為T開頭
        // BTC  開頭為數字1 或 3開頭或是bc開頭
        if (element.title == "upiaccount") {
            const str = inputValue.substr(0, 1);
            if (!(str == "T" || str == "1" || str == "3" || str == 1 || str == 3)) {
                return curBoxTitle + LangUtil("格式不正确,USDT TRC-20开头为T,BTC开头为1或3");
            }
        }
        return "";
    }
    /**新版兑换 skrill 的验证 */
    checkSkrill(item: any) {
        const element = item;
        const inputValue = element.inputValue;
        const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);

        // 符合正常email格式
        if (element.title == "upiaccount") {
            if (!checkMail(inputValue)) {
                return curBoxTitle + LangUtil("账号格式不正确");
            }
        }
        // 1. 只會是全英文字母, 長度不做限制
        // 2. 不會有特殊符號, 不會有數字
        else if (element.title == "accountname") {
            if (!checkOnlyEnglishChar(inputValue)) {
                return curBoxTitle + LangUtil("只能为全英文字符");
            }
        }

        return "";
    }

    /**新版兑换 ecoPayz 的验证 */
    checkEcoPayz(item: any) {
        const element = item;
        const inputValue = element.inputValue;
        const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);

        // 1. 只會是全數字, 長度為10碼數字
        // 2. 不會有特殊符號, 不會有英文字母
        if (element.title == "upiaccount") {
            if (inputValue.length != 10 || !checkOnlyNub(inputValue)) {
                return curBoxTitle + LangUtil("账号为10位数字");
            }
        }
        // 1. 只會是全英文字母, 長度不做限制
        // 2. 不會有特殊符號, 不會有數字
        else if (element.title == "accountname") {
            if (!checkOnlyEnglishChar(inputValue)) {
                return curBoxTitle + LangUtil("只能为全英文字符");
            }
        }

        return "";
    }

    /**新版兑换 astropay 的验证 */
    checkAstropay(item: any) {
        const element = item;
        let inputValue = element.inputValue;
        const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + element.title);
        console.log("当前标题为" + curBoxTitle + "输入内容为", inputValue);

        // 1. 手機電話號碼, 只會有數字
        // 2. 不會有特殊符號, 不會有英文字母
        // 3. 區碼前面不需要加 +符號, 不須空格
        if (element.title == "upiaccount") {
            element.inputValue = element.inputValue.replace(/\s+|\+/g, "");
            inputValue = element.inputValue;

            if (!checkOnlyNub(inputValue)) {
                return curBoxTitle + LangUtil("手机号码不正确");
            }
        }
        // 1. 只會是全英文字母, 長度不做限制
        // 2. 不會有特殊符號, 不會有數字
        else if (element.title == "accountname") {
            if (!checkOnlyEnglishChar(inputValue)) {
                return curBoxTitle + LangUtil("只能为全英文字符");
            }
        }

        return "";
    }

    onBlurInput(item: any) {
        console.log("失去焦点的 输入为", item);

        if (!this.curSelectItem) {
            return "";
        }
        item.inputValue = item.inputValue.trim();
        if (!item.inputValue || item.inputValue == "") {
            const curBoxTitle = LangUtil("exc_" + this.curSelectItem.subtitle + "_" + item.title);
            return curBoxTitle + LangUtil("不能为空");
        }
        let errstr = "";
        switch (this.curSelectItem.subtitle.toLowerCase()) {
            case "netbanking":
                errstr = this.checkNetbanking(item);
                break;
            case "crypto":
                errstr = this.checkCrypto(item);
                break;
            case "neteller":
            case "skrill":
                errstr = this.checkSkrill(item);
                break;
            case "ecopayz":
                errstr = this.checkEcoPayz(item);
                break;
            case "astropay":
                errstr = this.checkAstropay(item);
                break;
            default:
                break;
        }
        item.errinfo = errstr;
        if (errstr) {
            console.log("错误信息", errstr);
            // if (item.timeHeadle) {
            //     clearTimeout(item.timeHeadle);
            // }
            // item.timeHeadle = setTimeout(() => {
            //     console.log("取消 错误信息");
            //     item.errinfo = "";
            // }, 5000);
            return errstr;
        }

        //console.log("失去焦点的 输入为2222", item);
        return "";
    }

    onSubmit() {
        if (this.showRequires && this.showRequires.length > 0) {
            for (let index = 0; index < this.showRequires.length; index++) {
                const str = this.onBlurInput(this.showRequires[index]);
                if (str) {
                    PanelUtil.message_info(str);
                    return;
                }
            }
        }
        PanelUtil.message_confirm({
            message: LangUtil("确认提交"),
            okFun: () => {
                if (this.showRequires && this.showRequires.length > 0) {
                    this.myProxy.exchangeProxy.api_user_var_exchange_create_order(this.showRequires);
                } else this.myProxy.exchangeProxy.api_user_var_exchange_create_order();
            },
        });
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
