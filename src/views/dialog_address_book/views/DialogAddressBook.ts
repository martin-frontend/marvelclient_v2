import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookMediator from "../mediator/DialogAddressBookMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogAddressBook extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookProxy = this.getProxy(DialogAddressBookProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogAddressBookMediator);
    }

    onChange(value: any) {
        const keys = Object.keys(this.pageData.methodList[this.form.coin_name_unique].options);
        this.form.block_network_id = keys[0];
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
        }
    }
}
