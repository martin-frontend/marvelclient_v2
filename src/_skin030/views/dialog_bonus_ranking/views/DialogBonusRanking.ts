import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogBonusRankingMediator from "../mediator/DialogBonusRankingMediator";
import DialogBonusRankingProxy from "../proxy/DialogBonusRankingProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogBonusRanking extends AbstractView {
    myProxy: DialogBonusRankingProxy = this.getProxy(DialogBonusRankingProxy);
    pagebonusProxy = PanelUtil.getProxy_page_bonus;
    pageData = this.myProxy.pageData;
    dataList = this.pagebonusProxy.pageData.bonus_rank;
    dataRank = this.pagebonusProxy.pageData.rank;

    LangUtil = LangUtil;

    plat_stake_info = this.pagebonusProxy.pageData.plat_stake_info;

    constructor() {
        super(DialogBonusRankingMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }

    private iconsPrize: any = {
        0: require(`@/_skin030/assets/bonus/gold.png`),
        1: require(`@/_skin030/assets/bonus/silver.png`),
        2: require(`@/_skin030/assets/bonus/bronze.png`),
    };
}
