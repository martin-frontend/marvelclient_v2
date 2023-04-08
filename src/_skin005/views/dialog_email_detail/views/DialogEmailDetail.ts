import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogEmailDetailMediator from "../mediator/DialogEmailDetailMediator";
import DialogEmailDetailProxy from "../proxy/DialogEmailDetailProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
@Component
export default class DialogEmailDetail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogEmailDetailProxy = this.getProxy(DialogEmailDetailProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogEmailDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    // @Watch("pageData.bShow")
    // onWatchShow() {
    //     PageBlur.blur_page(this.pageData.bShow);
    // }

    onReceive() {
        this.myProxy.api_user_var_mail_var_receive();
    }

    get isneedObj() {
        if (this.pageData.data && this.pageData.data.attachment_content) {
            const sss = Object.keys(this.pageData.data.attachment_content).length % 2;
            return sss % 2 == 1;
        } else {
            return false;
        }
    }
}
