import EnumMarketType from "@/core/global/MarketUtils";
import LangUtil from "./LangUtil";
const marketType = EnumMarketType.EnumMarketType;
const formatAsian = EnumMarketType.formatAsian;

function getNameByeSelectionType(s_type: string, home_name: string, away_name: string) {
    if (s_type == "Home-Draw") return `${LangUtil(`${home_name}`)}-${LangUtil("和")}`;
    if (s_type == "Away-Draw") return `${LangUtil(`${away_name}`)}-${LangUtil("和")}`;
    if (s_type == "Home-Home") return `${LangUtil(`${home_name}`)}-${LangUtil(`${home_name}`)}`;
    if (s_type == "Home-Away") return `${LangUtil(`${home_name}`)}-${LangUtil(`${away_name}`)}`;
    if (s_type == "Away-Away") return `${LangUtil(`${away_name}`)}-${LangUtil(`${away_name}`)}`;
    if (s_type == "Away-Home") return `${LangUtil(`${away_name}`)}-${LangUtil(`${home_name}`)}`;
    if (s_type == "Draw-Home") return `${LangUtil("和")}-${LangUtil(`${home_name}`)}`;
    if (s_type == "Draw-Draw") return `${LangUtil("和")}-${LangUtil("和")}`;
    if (s_type == "Draw-Away") return `${LangUtil("和")}-${LangUtil(`${away_name}`)}`;
}
function getOrderTitle({ market_type, s_type, home_name, away_name, content, side, handicap }: any, onOrder: boolean = false) {
    switch (market_type) {
        case marketType.MATCH_ODDS: //主客和
        case marketType.MATCH_ODDS_HALF_TIME: //半场 - 主客和
            return s_type == "Home" ? home_name : s_type == "Away" ? away_name : LangUtil("Draw");
        case marketType.TOTAL_GOALS: //总入球
        case marketType.TOTAL_GOALS_HALF_TIME: //半场 - 总入球
        case marketType.ASIAN_OVER_UNDER: //亚洲大小盘
        case marketType.ASIAN_OVER_UNDER_HALF_TIME: //半场 - 亚洲大小盘
        case marketType.CR_ASIAN_OVER_UNDER:
        case marketType.ASIAN_OVER_UNDER_EXTRA_TIME:
        case marketType.ASIAN_OVER_UNDER_EXTRA_TIME_HALF_TIME:
        case marketType.ASIAN_OVER_UNDER_AFTER_PENALTIES:
            return `${s_type == "Overs" ? LangUtil("大") : LangUtil("小")} ${formatAsian(handicap, s_type).substring(1)}`;
        case marketType.ASIAN_HANDICAP: //亚洲让球盘
        case marketType.ASIAN_HANDICAP_HALF_TIME: //半场 - 亚洲让球盘
        case marketType.DRAW_NO_BET: //平局退款
        case marketType.DRAW_NO_BET_HALF_TIME: //半场-平局退款
        case marketType.CR_ASIAN_HANDICAP:
        case marketType.ASIAN_HANDICAP_EXTRA_TIME:
        case marketType.ASIAN_HANDICAP_EXTRA_TIME_HALF_TIME:
        case marketType.ASIAN_HANDICAP_AFTER_PENALTIES:
            return `${s_type == "Home" ? home_name : away_name} ${formatAsian(handicap, s_type)}`;
        case marketType.HALF_TIME_FULL_TIME: //半场/全场
            return ` ${formatAsian(handicap, s_type)}`;
        case marketType.BOTH_TEAMS_TO_SCORE: // 两队都得分
        case marketType.BOTH_TEAMS_TO_SCORE_HALF_TIME: //半场-两队都得分
        case marketType.TEAM_A_WIN_TO_NIL: //主队零失球获胜
        case marketType.TEAM_B_WIN_TO_NIL: //客队零失球获胜
        case marketType.TEAM_A_WIN_TO_NIL_HALF_TIME: //半场 - 主队零失球获胜
        case marketType.TEAM_B_WIN_TO_NIL_HALF_TIME: //半场 - 客队零失球获胜
            return `${s_type == "Yes" ? LangUtil("是") : LangUtil("否")} ${formatAsian(handicap, s_type)}`;
        case marketType.ODD_OR_EVEN_HALF_TIME: //半场 - 单/双
        case marketType.ODD_OR_EVEN: //入球单双
            return `${s_type == "Odd" ? LangUtil("单") : LangUtil("双")} ${formatAsian(handicap, s_type)}`;
        case marketType.CORRECT_SCORE: //'波胆'
        case marketType.CORRECT_SCORE_HALF_TIME: //半场 - 波胆
            return s_type == "" ? LangUtil("其它") : s_type;
    }
}
//special > 注单记录 双重机会/双胜彩
function getTeamName(data: any, special: boolean = true) {
    const teamType = ["Home", "Away", "Draw"];
    const marketType = ["HALF_TIME_FULL_TIME", "DOUBLE_CHANCE", "DOUBLE_CHANCE_HALF_TIME"];
    const notMarketType = ["DRAW_NO_BET", "DRAW_NO_BET_HALF_TIME"];
    if (special) {
        if (teamType.includes(data.selection.type) && !notMarketType.includes(data.market.market_type)) {
            switch (data.selection.type) {
                case "Home":
                    return `${data.matche.home_team} `;
                case "Away":
                    return `${data.matche.away_team} `;
                case "Draw":
                    return LangUtil("Draw");
            }
        }
        return marketType.includes(data.market.market_type) ? getNameByeSelectionType(data.selection.type, data.matche.home_team, data.matche.away_team) : "";
    } else {
        return marketType.includes(data.market_type) ? getNameByeSelectionType(data.s_type, data.home_name, data.away_name) : "";
    }
}

const exportOrder = {
    getOrderTitle,
    getNameByeSelectionType,
    getTeamName,
};

export default exportOrder;
