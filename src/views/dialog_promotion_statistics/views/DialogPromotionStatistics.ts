import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPromotionStatisticsMediator from "../mediator/DialogPromotionStatisticsMediator";
import DialogPromotionStatisticsProxy from "../proxy/DialogPromotionStatisticsProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogPromotionStatistics extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPromotionStatisticsProxy = this.getProxy(DialogPromotionStatisticsProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogPromotionStatisticsMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    onQuery() {
        this.myProxy.onQuery();
    }

    @Watch("pageData.search.agent_user_id")
    onWatchSearchAgentId(val: any) {
        if (val != "") {
            this.pageData.idButtonActive = true;
        } else {
            this.pageData.idButtonActive = false;
        }
    }

    @Watch("pageData.search.dateArr")
    onWatchSearchDate(val: any) {
        if (val != "") {
            this.pageData.dateButtonActive = true;
        } else {
            this.pageData.dateButtonActive = false;
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.reset();
            this.myProxy.onQuery();
        }
    }
}
