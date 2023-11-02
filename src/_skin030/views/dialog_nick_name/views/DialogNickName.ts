import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogNickNameMediator from "../mediator/DialogNickNameMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogNickName extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNickNameProxy = this.getProxy(DialogNickNameProxy);
    pageData = this.myProxy.pageData;
    selfProxy = PanelUtil.getProxy_selfproxy;

    constructor() {
        super(DialogNickNameMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        this.myProxy.pageData.nickname = "";
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
        if (12 >= nickname.length && nickname.length >= 1) {
            data.nick_name = nickname;
            if (Object.keys(nickname).length > 0) {
                this.pageData.loading = true;
                this.selfProxy.api_user_update_var(data);
            }
        } else {
            PanelUtil.message_info(LangUtil("昵称为1-12位字符"));
        }
    }
}
