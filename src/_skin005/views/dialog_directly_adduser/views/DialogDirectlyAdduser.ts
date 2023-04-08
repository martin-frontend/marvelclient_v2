import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyAdduserMediator from "../mediator/DialogDirectlyAdduserMediator";
import DialogDirectlyAdduserProxy from "../proxy/DialogDirectlyAdduserProxy";
import LangUtil from "@/core/global/LangUtil";
import Constant from "@/core/global/Constant";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogDirectlyAdduser extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyAdduserProxy = this.getProxy(DialogDirectlyAdduserProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    formData = this.myProxy.formData;
    playerInfo = this.myProxy.playerInfo;

    constructor() {
        super(DialogDirectlyAdduserMediator);
    }

    // radiosInfo = [
    //     {
    //         name: LangUtil("玩家"),
    //         value: 98,
    //     },
    //     {
    //         name: LangUtil("代理"),
    //         value: 1,
    //     },
    // ]
    radiosInfo = <any>[];

    getConfigName(type: any) {
        return Constant.GameTypeText(type);
    }
    get isCheck(): boolean {
        const { username, password, verify_code, register_type } = this.form;

        if (this.isDisable_agent) {
            return false;
        }
        if (!this.isDisable) {
            return false;
        }
        return (
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username))) &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }
    public get isDisable(): boolean {
        const coinKeys = Object.keys(this.myProxy.inputWaterData);

        for (let index = 0; index < coinKeys.length; index++) {
            const element = coinKeys[index];
            if (!this.myProxy.inputWaterData[element] || this.myProxy.inputWaterData[element] == "") {
                continue;
            }
            const res = parseFloat(this.myProxy.inputWaterData[element]);
            if (res < 0) {
                return false;
            }
            if (this.myProxy.playerInfo.water_config[element] < res) {
                return false;
            }
        }

        return true;
    }

    public get isDisable_agent(): boolean {
        if (!this.formData.inputrate) {
            return false;
        }
        const res = parseFloat(this.formData.inputrate);
        //console.log("当前输入值" ,res)
        if (res < 0) return true;

        //console.log(typeof res , typeof this.playerInfo.parent_credit_rate)
        if (res > this.playerInfo.credit_rate) {
            //console.log("比自己的 大", this.playerInfo.credit_rate)
            return true;
        }
        return false;
    }

    handlerUpdate_creditset() {}
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }
    onRegister() {
        //console.log(" 点击注册");
        //this.myProxy.api_user_var_direct_register();
        if (this.chackCreditRate()) {
            this.myProxy.api_user_var_direct_register();
        }
    }

    public get tempTotle(): number {
        return this.form.credit_rate + this.form.credit_rate_invited;
    }

    chackCreditRate_new() {
        let maxValue = 0;
        if (typeof this.playerInfo.credit_rate_max != "number") {
            maxValue = parseFloat(this.playerInfo.credit_rate_max);
        } else {
            maxValue = this.playerInfo.credit_rate_max;
        }

        let minValue = 0;
        if (typeof this.playerInfo.credit_rate_min != "number") {
            minValue = parseFloat(this.playerInfo.credit_rate_min);
        } else {
            minValue = this.playerInfo.credit_rate_min;
        }
        if (this.tempTotle > maxValue) {
            return 1;
        } else if (this.tempTotle < minValue) {
            return -1;
        } else {
            return 0;
        }
    }

    public get tempClassStr(): string {
        if (this.chackCreditRate_new() != 0) {
            return "red--text";
        }
        return "textGreen--text";
    }

    chackCreditRate() {
        if (this.chackCreditRate_new() > 0) {
            PanelUtil.message_warn(LangUtil("我的占成+代理占成必须<=最高设置占成"));
        } else if (this.chackCreditRate_new() < 0) {
            PanelUtil.message_warn(LangUtil("我的占成+代理占成必须>=最低设置占成"));
        } else {
            return true;
        }
        return false;
    }
    onUsernameBlur() {
        if (this.form.username == "") return;
        if (this.form.username.length < 4) {
            PanelUtil.message_success(LangUtil("账号小于4位，请重新输入"));
        }
    }

    onPasswordBlur() {
        if (this.form.password == "") return;
        if (!checkUserPassword(this.form.password)) {
            PanelUtil.message_success(LangUtil("密码太短"));
        }
    }

    public get isShowCredit_use(): boolean {
        // if (!this.playerInfo.create_credit_user_type || this.playerInfo.create_credit_user_type.length < 1)
        // {
        //     return false;
        // }
        return true;
    }

    setRadioInfo() {
        this.radiosInfo = <any>[];

        if (!this.playerInfo.create_credit_user_type || this.playerInfo.create_credit_user_type.length < 1) {
            return;
        }
        if (this.playerInfo.create_credit_user_type.includes(1)) {
            const obj = {
                name: LangUtil("代理"),
                value: 1,
            };
            this.radiosInfo.push(obj);
        }
        if (this.playerInfo.create_credit_user_type.includes(2)) {
            const obj = {
                name: LangUtil("玩家"),
                value: 98,
            };
            this.radiosInfo.push(obj);
        }
        this.form.show_credit_set = this.radiosInfo[0].value;
        //console.log("----asdasd",this.playerInfo.create_credit_user_type);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetForm();
            this.setRadioInfo();
            //this.form.show_credit_set = this.radiosInfo[0].value;
            this.myProxy.api_public_auth_code();
            this.initCreditData(this.playerInfo.credit_rate_min, this.playerInfo.credit_rate_max);
        }
    }

    initCreditData(min: any, max: any) {
        if (typeof min != "number") {
            this.save_credit_min = parseInt(min);
        } else {
            this.save_credit_min = min;
        }
        if (typeof max != "number") {
            this.save_credit_max = parseInt(max);
        } else {
            this.save_credit_max = max;
        }

        //给两个滑块 最大最小 设置 初始值
        this.range_my_min = 0;
        this.range_daili_min = 0;

        //设置 两个 滑块的 中间值
        this.myProxy.pageData.form.credit_rate = this.save_credit_max;
        this.myProxy.pageData.form.credit_rate_invited = this.save_credit_max - this.myProxy.pageData.form.credit_rate;

        this.range_my_max = this.save_credit_max;
        this.range_daili_max = this.save_credit_max;
    }

    save_credit_min = 0;
    save_credit_max = 0;

    range_min = 0;
    range_my_min = 0;
    range_my_max = 0;
    range_daili_min = 0;
    range_daili_max = 0;
    range_max = 0;
}
