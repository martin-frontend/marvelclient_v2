import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPersonalCardMediator from "../mediator/DialogPersonalCardMediator";
import DialogPersonalCardProxy from "../proxy/DialogPersonalCardProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogPersonalCard extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPersonalCardProxy = this.getProxy(DialogPersonalCardProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);

    constructor() {
        super(DialogPersonalCardMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    private onSubmit() {
        const { personalCard } = this.pageData;
        this.selfProxy.api_user_update_var({ business_card: personalCard });
    }
}
