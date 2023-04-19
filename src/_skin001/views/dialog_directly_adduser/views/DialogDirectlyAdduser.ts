import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyAdduserMediator from "../mediator/DialogDirectlyAdduserMediator";
import DialogDirectlyAdduserProxy from "../proxy/DialogDirectlyAdduserProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import Constant from "@/core/global/Constant";

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
    }
    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }
    onRegister() {
        //console.log(" 点击注册");
        this.myProxy.api_user_var_direct_register();
    }
    onUsernameBlur() {
        if (this.form.username == "") return;
        if (this.form.username.length < 4) {
            dialog_message.success(LangUtil("账号小于4位，请重新输入"));
        }
    }

    onPasswordBlur() {
        if (this.form.password == "") return;
        if (!checkUserPassword(this.form.password)) {
            dialog_message.success(LangUtil("密码太短"));
        }
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetForm();
            this.myProxy.api_public_auth_code();
        }
    }
}
