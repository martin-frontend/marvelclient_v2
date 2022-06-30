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


@Component
export default class DialogTradePassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTradePasswordProxy = this.getProxy(DialogTradePasswordProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    safetyCenterProxy: DialogSafetyCenterProxy = this.getProxy(DialogSafetyCenterProxy);
    userInfo = this.selfProxy.userInfo;
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    constructor() {
        super(DialogTradePasswordMediator);
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
        if (!(this.userInfo.phone != "" && this.userInfo.phone != undefined)) {
            dialog_message_box.confirm({
                message: LangUtil("您的账号未绑定手机，请绑定手机?"),
                okFun: () => {
                    this.goSetPhone();
                },
            });
        } else {
            dialog_get_verity.showSmsVerity(6, this.form.area_code, this.form.verify_code);
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    onSubmit() {
        this.pageData.loading = true;
    }

    goSetPhone() {
        this.safetyCenterProxy.pageData.tabIndex = 0
        dialog_safety_center.show()
    }
}
