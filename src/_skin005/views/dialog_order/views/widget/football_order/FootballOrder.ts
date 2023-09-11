import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import OrderTitleUtils from "@/core/global/OrderTitleUtils";
import { amountFormat, changeDateShow, getDateByTimeZone } from "@/core/global/Functions";
import DialogOrderProxy from "@/_skin005/views/dialog_order/proxy/DialogOrderProxy";
import Timezone from "@/core/Timezone";
import * as moment from "moment-timezone";
@Component
export default class FootballOrder extends AbstractView {
    myProxy: DialogOrderProxy = this.getProxy(DialogOrderProxy);
    pageData = this.myProxy.pageData;
    item = this.myProxy.pageData.data;
    LangUtil = LangUtil;
    OrderTitleUtils = OrderTitleUtils;
    getDateByTimeZone = getDateByTimeZone;
    amountFormat = amountFormat;
    TransMarketPrice(price: any) {
        return price;
    }
    getDate(date: any) {
        return changeDateShow(Timezone.Instance.convertTime_to_Locale_utc(Number(date)), false, true);
    }
    //根据盘口展示已结算的赛果角球还是比分等
    // getHadResultStr() {
    //     if (!this.item.real_time_state) {
    //         return;
    //     }
    //     const copyitem = JSON.parse(JSON.stringify(this.item));
    //     copyitem.state = copyitem.real_time_state;

    //     return OrderTitleUtils.getScoreStr(copyitem);
    // }
    // 注单状态
    statusMap = {
        0: LangUtil("确认中"), //确认中
        1: LangUtil("确认成功"), //确认成功
        3: LangUtil("已拒绝"), //拒绝
        4: LangUtil("已取消"), //拒绝
        5: LangUtil("无效"), //无效
    };

    statusMapColor = {
        0: "#FF7128", //确认中
        1: "#007E29", //确认成功
        3: "#7E0000", //拒绝
        4: "#FF2828", //取消
    };
    getWinType(item: any) {
        if (this.isPreSettle(item)) {
            return require(`@/_skin005/assets/order_detail/win_type/presettle.png`);
        }
        //win_type: 1，赢，2 半赢，3 平手，4，输，5 输一半
        switch (item.win_type) {
            case 1:
                return require(`@/_skin005/assets/order_detail/win_type/win.png`);
            case 2:
                return require(`@/_skin005/assets/order_detail/win_type/halfwin.png`);
            case 3:
                return require(`@/_skin005/assets/order_detail/win_type/draw.png`);
            case 4:
                return require(`@/_skin005/assets/order_detail/win_type/lose.png`);
            case 5:
                return require(`@/_skin005/assets/order_detail/win_type/halflose.png`);
        }
    }
    getWinTypeStr(item: any) {
        if (this.isPreSettle(item)) return LangUtil("提前结算");
        switch (item.win_type) {
            case 1:
                return LangUtil("赢");
            case 2:
                return LangUtil("半赢");
            case 3:
                return LangUtil("平手");
            case 4:
                return LangUtil("输");
            case 5:
                return LangUtil("输一半");
        }
    }

    /**判断是否为提前计算 */
    isPreSettle(item: any): boolean {
        if (item && item.game_info && item.game_info.cashOutCount == 1 && item.game_info.orderStatus == 5) {
            return true;
        }
        return false;
    }
    /**计算输赢 */
    winAmount(item: any) {
        if (this.isPreSettle(item)) {
            return Number(item.game_info.cashOutPayoutStake) - Number(item.game_info.cashOutTotalStake);
        }
        return item.settle_amount;
    }
    isChuanDan(item: any): boolean {
        if (item && item.bet_type && item.bet_type.trim()) {
            const strArr = item.bet_type.split("x");
            if (strArr.length == 2 && (strArr[0] != 1 || strArr[0] != "1")) {
                return true;
            }
        }
        return false;
    }
    getWinType_chuanDan(item: any) {
        if (this.chuanDanWinAmount(item) < 0) {
            return require(`@/_skin005/assets/order_detail/win_type/lose.png`);
        } else {
            return require(`@/_skin005/assets/order_detail/win_type/win.png`);
        }
    }
    chuanDanWinAmount(item: any) {
        return Number(item.settleAmount) - Number(item.stakeAmount);
    }
    getWinColor_chuandan(item: any) {
        switch (item.settleResult) {
            case 2:
                return "#ffc03b";
            case 3:
                return "#ff6c8e";
            case 4:
                return "#90ce8d";
            case 5:
                return "#ff6dde";
            case 6:
                return "#6da5ff";
        }
        return "#000";
    }
    getWinType_chuandan(item: any) {
        //settleResult: 0 无结果 2 和 3 输 4 赢 5 赢一半 6 输一半 7 取消
        switch (item.settleResult) {
            // case 1:
            //     return require(`@/_skin005/assets/order_detail/win_type/win.png`);
            case 2:
                return require(`@/_skin005/assets/order_detail/win_type/draw.png`);
            case 3:
                return require(`@/_skin005/assets/order_detail/win_type/lose.png`);
            case 4:
                return require(`@/_skin005/assets/order_detail/win_type/win.png`);
            case 5:
                return require(`@/_skin005/assets/order_detail/win_type/halfwin.png`);
            case 6:
                return require(`@/_skin005/assets/order_detail/win_type/halflose.png`);
            // case 7:
            //     return require(`@/_skin005/assets/order_detail/win_type/halflose.png`);

            default:
                return require(`@/_skin005/assets/order_detail/win_type/draw.png`);
        }
    }
    getWinTypeStr_chuandan(item: any) {
        switch (item.settleResult) {
            case 0:
                return LangUtil("无结果");
            case 2:
                return LangUtil("和");
            case 3:
                return LangUtil("输");
            case 4:
                return LangUtil("赢");
            case 5:
                return LangUtil("半赢");
            case 6:
                return LangUtil("输一半");
            case 7:
                return LangUtil("取消");
        }
    }
}
