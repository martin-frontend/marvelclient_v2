import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogBindInviteMediator from "../mediator/DialogBindInviteMediator";
import DialogBindInviteProxy from "../proxy/DialogBindInviteProxy";
import SelfProxy from "@/proxy/SelfProxy";
@Component
export default class DialogBindInvite extends AbstractView {
    myProxy: DialogBindInviteProxy = this.getProxy(DialogBindInviteProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);

    constructor() {
        super(DialogBindInviteMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }

    get isCheckedId(): boolean {
        const { inviteId } = this.pageData;
        return (this.checkId(inviteId))
    }

    private checkId(id: any) {
        return id.length > 0 ? true : false
    }

    onSubmit() {
        this.selfProxy.api_user_update_var({ invite_user_id: this.pageData.inviteId });
    }
}
