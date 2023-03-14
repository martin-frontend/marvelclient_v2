import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogEmailDetailMediator from "../mediator/DialogEmailDetailMediator";
import DialogEmailDetailProxy from "../proxy/DialogEmailDetailProxy";

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
    }

    // @Watch("pageData.bShow")
    // onWatchShow() {
    //     BlurUtil(this.pageData.bShow);
    // }

    onReceive() {
        this.myProxy.api_user_var_mail_var_receive();
    }
}
