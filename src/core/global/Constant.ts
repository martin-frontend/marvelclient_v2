import LangUtil from "./LangUtil";

export default class Constant {
    /**时间查询类型 */
    static get TIME_TYPE() {
        return [LangUtil("今日"), LangUtil("昨日"), LangUtil("最近7天"), LangUtil("最近30天")]; //"今日", "昨日", "最近7天", "最近30天"
    }

    static get PERFORMANCE_TIME_TYPE() {
        return [LangUtil("最近7天"), LangUtil("最近30天")]; //"近7日", "近30日"
    }
    //获取当前游戏类型 对应的显示名字
    static GameTypeText(gametype: any) {
        let str = "";
        switch (gametype) {
            case "2":
                str = "棋牌";
                break;
            case "4":
                str = "彩票";
                break;
            case "8":
                str = "捕鱼";
                break;
            case "16":
                str = "电子";
                break;
            case "32":
                str = "真人";
                break;
            case "64":
                str = "体育电竞";
                break;
            case "128":
                str = "链游";
                break;
            default:
                str = gametype;
                break;
        }
        return LangUtil(str);
    }
}
