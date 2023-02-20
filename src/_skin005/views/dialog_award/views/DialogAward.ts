import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAwardMediator from "../mediator/DialogAwardMediator";
import DialogAwardProxy from "../proxy/DialogAwardProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogAward extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAwardProxy = this.getProxy(DialogAwardProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogAwardMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
}
