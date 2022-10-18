import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import { MatcheVO, StatesVO } from "@/_skin001/vo/CompetitionVO";
import PageHomeProxy from "../../proxy/PageHomeProxy";
import getProxy from "@/core/global/getProxy";
import { dateFormat } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import MarketUtils from "../../utils/MarketUtils";
import LoginEnter from "@/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";

@Component
export default class SoccerMatcheItem extends AbstractView {
    LangUtil = LangUtil;
    MarketUtils = MarketUtils;
    dateFormat = dateFormat;
    myProxy: PageHomeProxy = getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;

    @Prop() matche!: MatcheVO;

    get competition() {
        return this.pageData.compData.find((item) => item.competition_id == this.matche.competition_id);
    }

    get states(): StatesVO {
        return this.matche.states;
    }

    get startTime() {
        return this.dateFormat(new Date(this.matche.sb_time * 1000), "MM-dd hh:mm");
    }

    get statusString() {
        switch (this.states.match_phase) {
            case "1H":
                return LangUtil("上半场");
            case "HT":
                return LangUtil("中场");
            case "-":
                return LangUtil("即交开赛");
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
                return this.dateFormat(new Date(this.matche.sb_time * 1000), "MM-dd hh:mm");
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
            return `(${gmt})` + LangUtil("距开赛") + LangUtil("{0}小时", hour) + LangUtil("{0}分", min);
        } else {
            return `(${gmt})` + LangUtil("距开赛") + LangUtil("{0}分", (cha / 60) >> 0);
        }
    }

    getTeamIcon(url:string){
        return url || require(`@/_skin001/assets/icon/icon_team_default.png`);
    }

    /**拆分比分/红黄牌/脚球 */
    getValues(str: string): number[] {
        return str.split("-").map((item) => parseInt(item));
    }

    getMarket(market_type:string){
        return this.matche.market[0].fix_markets[market_type];
    }

    getSelections(market_type:string){
        return this.matche.market[0].fix_markets[market_type].selections;
    }

    onEnter(){
        this.pageData.event_id = this.matche.id;
        LoginEnter(() => {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.currGame = {
                app_type: 2,
                category: 64,
                icon: "http://sftpuser.starsabc.com/resource/load_page_domain/d8/a7/d8a7883ef7beb56973362b0ab85b2402.jpg",
                index_no: 6,
                languages: ['zh_CN', 'th_TH', 'jp_JP', 'es_ES', 'ko_Kr', 'vi_VN', 'en_EN', 'zh_TW'],
                list_type: 0,
                lobby_model_product_id: 369,
                lobby_product_id: 4857,
                open_mode: 1,
                ori_product_id: "1",
                ori_vendor_extend: "{\"iframe_bad\":false}",
                orientation: 1,
                plat_id: 30017,
                status: 1,
                tags: [],
                vendor_id: 96,
                vendor_name: "金利体育-测试",
                vendor_product_id: 8271,
                vendor_product_name: "足球",
                vendor_type: 64,
                water_rate_accelerate: 0,
            }
            gameProxy.api_vendor_var_ori_product_show_var(gameProxy.currGame);
        });
    }

}
