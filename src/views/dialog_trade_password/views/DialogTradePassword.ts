import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogTradePasswordMediator from "../mediator/DialogTradePasswordMediator";
import DialogTradePasswordProxy from "../proxy/DialogTradePasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import { checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import dialog_get_verity from "@/views/dialog_get_verity";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";
import dialog_safety_center from "@/views/dialog_safety_center";
import DialogSafetyCenterProxy from "@/views/dialog_safety_center/proxy/DialogSafetyCenterProxy";
import dialog_message from "@/views/dialog_message";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    safetyCenterProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    validate_type = GamePlatConfig.config.validate_type;
    userInfo = this.selfProxy.userInfo;
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogTradePasswordMediator);
    }

    mounted() {
        if (this.validate_type.includes(2)) {
            this.pageData.code_type = 1;
        } else {
            this.pageData.code_type = 2;
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    get isCheck(): boolean {
        const { password, password_confirm, verify_code } = this.form;
        return (
            password == password_confirm &&
            checkVerifyVode(verify_code) &&
            checkUserPassword(password)
        );
    }

    getCode() {
        // if ((this.userInfo.phone != "" && this.userInfo.phone != undefined) && this.validate_type.includes(2)) {
        //     this.pageData.code_type = 1;
        //     dialog_get_verity.showSmsVerity(5, '', ''); //获取短信验证码
        // } else if ((this.userInfo.email != "" && this.userInfo.email != undefined) && this.validate_type.includes(1
        // )) {
        //     this.pageData.code_type = 2;
        //     dialog_get_verity.showEmailVerity(5, this.userInfo.email); //获取邮箱验证码
        // } else 
        if (!(this.userInfo.phone != "" && this.userInfo.phone != undefined) && this.validate_type.includes(2)) {
            dialog_message_box.confirm({
                message: LangUtil("您的账号未绑定手机，请绑定手机?"),
                okFun: () => {
                    this.goSetPhone();
                },
            });
        } else if (!(this.userInfo.email != "" && this.userInfo.email != undefined) && this.validate_type.includes(1)) {
            dialog_message_box.confirm({
                message: LangUtil("您的账号未绑定邮箱，请绑定邮箱?"),
                okFun: () => {
                    this.goSetEmail();
                },
            });
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
        if (!core.checkUserPassword(this.pageData.form.password)) {
            dialog_message.info("输入6个以上字符");//
        } else if (this.pageData.form.password != this.pageData.form.password_confirm) {
            dialog_message.info("两次输入的密码不一致");//
        } else if (this.pageData.form.verify_code == "") {
            dialog_message.info("请输入验证码");//
        } else {
            this.myProxy.api_user_change_password_gold_var()
        }
    }

    goSetPhone() {
        this.safetyCenterProxy.pageData.tabIndex = 0;
        dialog_safety_center.show();
    }

    goSetEmail() {
        this.safetyCenterProxy.pageData.tabIndex = 1;
        dialog_safety_center.show();
    }
}
