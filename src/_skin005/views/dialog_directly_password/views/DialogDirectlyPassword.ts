import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyPasswordMediator from "../mediator/DialogDirectlyPasswordMediator";
import DialogDirectlyPasswordProxy from "../proxy/DialogDirectlyPasswordProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import { checkUserPassword } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class DialogDirectlyPassword extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyPasswordProxy = this.getProxy(DialogDirectlyPasswordProxy);
    pageData = this.myProxy.pageData;
    form = this.myProxy.formData;

    constructor() {
        super(DialogDirectlyPasswordMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    get isCheck(): boolean {
        const { password, password_confirm } = this.form;
        return password == password_confirm && checkUserPassword(password);
    }
    onSubmit() {
        this.pageData.loading = true;
        if (!core.checkUserPassword(this.form.password)) {
            PanelUtil.message_info("输入6个以上字符"); //
        } else if (this.form.password != this.form.password_confirm) {
            PanelUtil.message_info("两次输入的密码不一致"); //
        } else {
            this.myProxy.agent_direct_user_update();
        }
    }
}
