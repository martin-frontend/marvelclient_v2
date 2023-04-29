import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component, Vue } from "vue-property-decorator";
import DialogTimezoneMediator from "../mediator/DialogTimezoneMediator";
import DialogTimezoneProxy from "../proxy/DialogTimezoneProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import Timezone from "@/core/Timezone";
import GameProxy from "@/proxy/GameProxy";
import getProxy from "@/core/global/getProxy";

@Component
export default class DialogTimezone extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogTimezoneProxy = this.getProxy(DialogTimezoneProxy);
    pageData = this.myProxy.pageData;
    Timezone = Timezone.Instance;

    constructor() {
        super(DialogTimezoneMediator);
    }

    onClose() {
        MultDialogManager.onClosePanel();
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    get options() {
        return this.Timezone.timezonename;
    }
    private onChange(value: any) {
        const ischange = this.Timezone.setTimezone(value);
        if (
            Vue.router.history.current.path.includes("page_game_play") ||
            Vue.router.history.current.path.includes("page_game_soccer") ||
            Vue.router.history.current.path.includes("cricket")
        ) {
            if (ischange) {
                const gameProxy: GameProxy = getProxy(GameProxy);
                gameProxy.api_vendor_var_ori_product_show_var(gameProxy.currGame);
            }
        }
    }
    isCurItem(item: any) {
        if (this.Timezone.curTimezoneItem.value == item.value) {
            return true;
        }
        return false;
    }
}
