import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogNickNameMediator from "../mediator/DialogNickNameMediator";
import DialogNickNameProxy from "../proxy/DialogNickNameProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogNickName extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNickNameProxy = this.getProxy(DialogNickNameProxy);
    pageData = this.myProxy.pageData;

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
        this.pageData.loading = true;
    }
}
