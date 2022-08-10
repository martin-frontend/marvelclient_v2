import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRealNameMediator from "../mediator/DialogRealNameMediator";
import DialogRealNameProxy from "../proxy/DialogRealNameProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";

@Component
export default class DialogRealName extends AbstractView {
    LangUtil = LangUtil;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: DialogRealNameProxy = this.getProxy(DialogRealNameProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogRealNameMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
            this.myProxy.pageData.real_name = "";
        }
    }

    get isCheckedId(): boolean {
        const { real_name } = this.pageData;
        return this.checkNickname(real_name);
    }

    private checkNickname(nickname: any) {
        return nickname.length > 0 ? true : false;
    }

    onSubmit() {
        const { real_name } = this.pageData;
        const data: any = {};
        if (10 >= real_name.length && real_name.length >= 1) {
            data.real_name = real_name;
            this.pageData.loading = true;
            this.selfProxy.api_user_update_var(data);
        } else {
            dialog_message.info(LangUtil("真实姓名为1-10个字符"));
        }
    }
}
