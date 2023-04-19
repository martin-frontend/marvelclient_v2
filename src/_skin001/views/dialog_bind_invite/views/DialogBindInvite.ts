import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogBindInviteMediator from "../mediator/DialogBindInviteMediator";
import DialogBindInviteProxy from "../proxy/DialogBindInviteProxy";
import SelfProxy from "@/proxy/SelfProxy";
import LangUtil from "@/core/global/LangUtil";
@Component
export default class DialogBindInvite extends AbstractView {
    myProxy: DialogBindInviteProxy = this.getProxy(DialogBindInviteProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    LangUtil = LangUtil;

    constructor() {
        super(DialogBindInviteMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    get isCheckedId(): boolean {
        const { inviteId } = this.pageData;
        return this.checkId(inviteId);
    }

    private checkId(id: any) {
        return id.length > 0 ? true : false;
    }

    onSubmit() {
        this.myProxy.api_user_var_invite_user_info({ invite_user_id: this.pageData.inviteId });
    }
}
