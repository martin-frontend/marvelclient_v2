import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogBonusRankingMediator from "../mediator/DialogBonusRankingMediator";
import DialogBonusRankingProxy from "../proxy/DialogBonusRankingProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBonusProxy from "@/_skin003/views/page_bonus/proxy/PageBonusProxy";

@Component
export default class DialogBonusRanking extends AbstractView {
    myProxy: DialogBonusRankingProxy = this.getProxy(DialogBonusRankingProxy);
    pagebonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
    }

    private iconsPrize: any = {
        0: require(`@/assets/bonus/gold@2x.png`),
        1: require(`@/assets/bonus/silver@2x.png`),
        2: require(`@/assets/bonus/bronze@2x.png`),
    };
}
