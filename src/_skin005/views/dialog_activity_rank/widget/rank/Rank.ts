import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityRankProxy from "../../proxy/DialogActivityRankProxy";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class Rank extends AbstractView {
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    myProxy: DialogActivityRankProxy = this.getProxy(DialogActivityRankProxy);
    CoinTransformHelper = CoinTransformHelper;
    pageData = this.myProxy.pageData;
    rankUserList = this.myProxy.pageData.rankUserList;
    // user_list = this.rankUserList.list;
    my_rank_data = this.rankUserList.my_data;
    user_list = this.pageData.rankUserList.list;
    transMoney(money: any, isForeign: boolean = false, isNeedSymbol: boolean = true) {
        if (!isForeign && (this.pageData.data.rank_type == 4 || this.pageData.data.rank_type == 5)) return money;

        const symbol = CoinTransformHelper.GetMainCoinSymbol;
        const count = CoinTransformHelper.TransformMoney(money, 2, "", "USDT", true, isNeedSymbol);
        return count;
    }

    rankImg(rank: number) {
        return require(`@/_skin005/assets/activity_rank_list/rank_${rank}.png`);
    }
    awardCoinIcon(coin_name: string) {
        return this.GamePlatConfig.config.plat_coins[coin_name].icon || "";
        // return this.GamePlatConfig.config.plat_coins[CoinTransformHelper.GetMainCoinName].icon;
    }
}
