import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogWalletSetMediator from "../mediator/DialogWalletSetMediator";
import DialogWalletSetProxy from "../proxy/DialogWalletSetProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogWalletSet extends AbstractView {
    switch_hide_rechange = false;
    switch_french_currency = false;

    LangUtil = LangUtil;
    myProxy: DialogWalletSetProxy = this.getProxy(DialogWalletSetProxy);
    pageData = this.myProxy.pageData;

    GamePlatConfig = GamePlatConfig;

    constructor() {
        super(DialogWalletSetMediator);
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
