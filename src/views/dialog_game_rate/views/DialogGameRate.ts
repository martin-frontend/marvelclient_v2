import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogGameRateMediator from "../mediator/DialogGameRateMediator";
import DialogGameRateProxy from "../proxy/DialogGameRateProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_block_coins_scale();
        }
    }
}
