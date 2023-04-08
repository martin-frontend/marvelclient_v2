import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogGameRateMediator from "../mediator/DialogGameRateMediator";
import DialogGameRateProxy from "../proxy/DialogGameRateProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogGameRate extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGameRateProxy = this.getProxy(DialogGameRateProxy);
    pageData = this.myProxy.pageData;

    GamePlatConfig = GamePlatConfig;

    constructor() {
        super(DialogGameRateMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_block_coins_scale();
        }
    }

    public vndCount(item: any) {
        //const count = 1 / item.scale

        return (1 / item.scale).toFixed(2);
    }
}
