import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { MatcheVO, StatesVO } from "@/_skin001/vo/CompetitionVO";
import PageHomeProxy from "../../proxy/PageHomeProxy";
import getProxy from "@/core/global/getProxy";
import { changeDateShow, dateFormat } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import MarketUtils from "../../utils/MarketUtils";
import { getResponseIcon } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Timezone from "@/core/Timezone";

@Component
export default class SoccerMatcheItem extends AbstractView {
    LangUtil = LangUtil;
    MarketUtils = MarketUtils;
    dateFormat = dateFormat;
    myProxy: PageHomeProxy = getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;
    getResponseIcon = getResponseIcon;

    @Prop() matche!: MatcheVO;

    get competition() {
        return this.pageData.compData.find((item) => item.competition_id == this.matche.competition_id);
    }

    get states(): StatesVO {
        return this.matche.states;
    }

    get startTime() {
        const sss = Timezone.Instance.convertTime_to_Locale_utc(this.matche.sb_time * 1000);
        return changeDateShow(sss,false);
    }

    get statusString() {
        switch (this.states.match_phase) {
            case "1H":
                return LangUtil("上半场");
            case "HT":
                return LangUtil("中场");
            case "-":
                return LangUtil("即将开赛");
            case "2H":
                return LangUtil("下半场");
            case "FT":
                return LangUtil("完场");
            case "1H OT":
                return LangUtil("上半场延长");
            case "OT HT":
                return LangUtil("中场延长");
            case "2H OT":
                return LangUtil("下半场延长");
            case "OT FT":
                return LangUtil("延长赛结束");
            case "PK":
                return LangUtil("PK赛");
            case "PK FT":
                return LangUtil("PK赛结束");
            default:
                return this.startTime;
        }
    }

    downcount() {
        const gmt = "GMT+" + (0 - new Date().getTimezoneOffset() / 60);
        const cha = (this.matche.sb_time >> 0) - GlobalVar.server_time;
        if (cha > 86400) {
            return `(${gmt})` + LangUtil("距开赛") + LangUtil("{0}天", (cha / 86400) >> 0);
        } else if (cha > 3600) {
            const hour = (cha / 3600) >> 0;
            const min = ((cha - hour * 3600) / 60) >> 0;
            return `(${gmt})` + LangUtil("距开赛") + "\n" + LangUtil("{0}时", hour) + LangUtil("{0}分", min);
        } else {
            return `(${gmt})` + LangUtil("距开赛") + LangUtil("{0}分", (cha / 60) >> 0);
        }
    }

    /**拆分比分/红黄牌/脚球 */
    getValues(str: string): number[] {
        return str.split("-").map((item) => parseInt(item));
    }

    getMarket(market_type: string) {
        return this.matche.market[0].fix_markets[market_type];
    }

    getSelections(market_type: string) {
        const selections = this.matche.market[0].fix_markets[market_type]?.selections;
        if (selections) {
            let len = 2;
            if (market_type == "MATCH_ODDS" || market_type == "MATCH_ODDS_HALF_TIME") {
                len = 3;
            }
            return selections.slice(0, len);
        }
        if (market_type == "MATCH_ODDS" || market_type == "MATCH_ODDS_HALF_TIME") {
            return [{ price: {} }, { price: {} }, { price: {} }];
        } else {
            return [{ price: {} }, { price: {} }];
        }
    }

    onEnter() {
        this.pageData.event_id = this.matche.id;
        PanelUtil.openpage_soccer();
    }
}
