import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPromotionStatisticsMediator from "../mediator/DialogPromotionStatisticsMediator";
import DialogPromotionStatisticsProxy from "../proxy/DialogPromotionStatisticsProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

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
        MultDialogManager.onClosePanel();
    }

    onQuery() {
        if (this.pageData.search.agent_user_id == "") {
            PanelUtil.message_alert(LangUtil("请输入ID"));
            return;
        }
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
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.reset();
            this.myProxy.onQuery();
        }
    }
}
