import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import OrderTitleUtils from "@/core/global/OrderTitleUtils";
import { amountFormat, changeDateShow, getDateByTimeZone } from "@/core/global/Functions";
import DialogOrderProxy from "@/_skin005/views/dialog_order/proxy/DialogOrderProxy";
import Timezone from "@/core/Timezone";
@Component
export default class ExchangeOrder extends AbstractView {
    myProxy: DialogOrderProxy = this.getProxy(DialogOrderProxy);
    pageData = this.myProxy.pageData;
    item = this.myProxy.pageData.data;
    itemData = this.myProxy.pageData.itemData;
    LangUtil = LangUtil;
    OrderTitleUtils = OrderTitleUtils;
    getDateByTimeZone = getDateByTimeZone;
    amountFormat = amountFormat;
    TransMarketPrice(price: any) {
        return price;
    }
    getDate(date: any) {
        if (date === 0) {
            return "-";
        }
        return changeDateShow(Timezone.Instance.convertTime_to_Locale_utc(Number(date)), true);
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
        //win_type: 1，赢，2 半赢，3 平手，4，输，5 输一半，6 提前结算
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
            case 6:
                return require(`@/_skin005/assets/order_detail/win_type/settlement.png`);
        }
    }
    getWinTypeStr(item: any) {
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
            case 6:
                return LangUtil("提前结算");
        }
    }
}
