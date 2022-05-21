import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAwardMediator from "../mediator/DialogAwardMediator";
import DialogAwardProxy from "../proxy/DialogAwardProxy";

@Component
export default class DialogAward extends AbstractView {
    myProxy: DialogAwardProxy = this.getProxy(DialogAwardProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogAwardMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }
}
