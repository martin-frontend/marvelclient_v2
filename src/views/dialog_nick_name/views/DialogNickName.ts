import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogNickNameMediator from "../mediator/DialogNickNameMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";

@Component
export default class DialogNickName extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNickNameProxy = this.getProxy(DialogNickNameProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);

    constructor() {
        super(DialogNickNameMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    get isCheckedId(): boolean {
        const { nickname } = this.pageData;
        return this.checkNickname(nickname);
    }

    private checkNickname(nickname: any) {
        return nickname.length > 0 ? true : false;
    }

    onSubmit() {
        const { nickname } = this.pageData;
        const data: any = {};
        if (10 >= nickname.length && nickname.length >= 3) {
            data.nick_name = nickname;
            if (Object.keys(nickname).length > 0) {
                this.pageData.loading = true;
                this.selfProxy.api_user_update_var(data);
            }
        } else {
            dialog_message.info("请输入最少3位/最多10位");
        }
    }
}
