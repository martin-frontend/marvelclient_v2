import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogOrderMediator from "../mediator/DialogOrderMediator";
import DialogOrderProxy from "../proxy/DialogOrderProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin030/core/PageBlur";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogOrder extends AbstractView {
    LangUtil = LangUtil;

    myProxy: DialogOrderProxy = this.getProxy(DialogOrderProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogOrderMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (!this.pageData.bShow) {
            this.myProxy.resetQuery();
        }
    }

    get isExchangeVendor() {
        return this.pageData.itemData?.vendor_id == GameConfig.config.ExchangeVendorId;
    }
}
