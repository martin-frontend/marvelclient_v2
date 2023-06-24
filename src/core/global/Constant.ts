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
    /** 每种游戏的路由的地址 */
    static GameListRouterList() {
        return [
            "page_game_list",
            "sports",
            "live-casino-online",
            "blockchain-games",
            "fishing-games",
            "slots-games",
            "lottery-games",
            "cards-games",
            "game-history",
        ];
    }
    /**检测传入路径 是否 包含有 游戏 以及分类的 路径 */
    static isIncludeGameRouter(path: string): boolean {
        const gameRouterList = Constant.GameListRouterList();
        for (let index = 0; index < gameRouterList.length; index++) {
            const element = gameRouterList[index];
            if (path.includes(element)) {
                return true;
            }
        }
        return false;
    }
    /**通过传入游戏类型的值获取路由的名字 */
    static getRouterPathByVendor(vendor: number): string {
        switch (vendor) {
            case 2:
                return "cards-games"; //     2	棋牌
            case 3:
                return "game-history"; //     3	近期游戏记录
            case 4:
                return "lottery-games"; // 4	彩票
            case 8:
                return "fishing-games"; // 8	捕鱼
            case 16:
                return "slots-games"; // 16	电子
            case 32:
                return "live-casino-online"; // 32	真人
            case 64:
                return "sports"; // 64	体育电竞
            case 128:
                return "blockchain-games"; // 128	链游
        }
        return "";
    }
    /**通过传入的路由的名字 获取 哪个 id 如果没有则 输出 -1 */
    static getVendorByRouter(path: string): number {
        if (path.includes("sports")) {
            return 64;
        } else if (path.includes("live-casino-online")) {
            return 32;
        } else if (path.includes("blockchain-games")) {
            return 128;
        } else if (path.includes("fishing-games")) {
            return 8;
        } else if (path.includes("slots-games")) {
            return 16;
        } else if (path.includes("lottery-games")) {
            return 4;
        } else if (path.includes("game-history")) {
            return 3;
        } else if (path.includes("cards-games")) {
            return 2;
        }
        return -1;
    }
}
