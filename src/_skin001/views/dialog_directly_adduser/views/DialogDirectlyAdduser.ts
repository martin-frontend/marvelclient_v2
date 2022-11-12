import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { checkMail, checkPhone, checkUserName, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyAdduserMediator from "../mediator/DialogDirectlyAdduserMediator";
import DialogDirectlyAdduserProxy from "../proxy/DialogDirectlyAdduserProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";

@Component
export default class DialogDirectlyAdduser extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyAdduserProxy = this.getProxy(DialogDirectlyAdduserProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogDirectlyAdduserMediator);
    }
    get isCheck(): boolean {
        const { username, password, verify_code, register_type } = this.form;
        return (
            ((register_type == 1 && checkUserName(username)) ||
                (register_type == 2 && checkMail(username)) ||
                (register_type == 4 && checkPhone(username))) &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }
    onClose() {
        this.pageData.bShow = false;
    }
    getImageVerity() {
        this.myProxy.api_public_auth_code();
    }
    onRegister() {
        console.log(" 点击注册");
        this.myProxy.api_user_var_direct_register();
    }
    onUsernameBlur() {
        if(this.form.username == "") return;
        if(this.form.username.length < 4) {
            dialog_message.success(LangUtil("账号小于4位，请重新输入"));
        }
    }

    onPasswordBlur() {
        if(this.form.password == "") return;
        if(!checkUserPassword(this.form.password)) {
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
