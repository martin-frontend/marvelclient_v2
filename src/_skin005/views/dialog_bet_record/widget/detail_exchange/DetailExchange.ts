import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogBetRecordProxy from "../../proxy/DialogBetRecordProxy";
import GameConfig from "@/core/config/GameConfig";
import OpenLink from "@/core/global/OpenLink";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DetailExchange extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    @Prop() item!: any;

    get brazilExchangeStatus() {
        return {
            0: LangUtil("巴西交易所订单状态0"),
            1: LangUtil("巴西交易所订单状态1"),
            2: LangUtil("巴西交易所订单状态2"),
            3: LangUtil("巴西交易所订单状态3"),
            4: LangUtil("巴西交易所订单状态4"),
            5: LangUtil("巴西交易所订单状态5"),
            6: LangUtil("巴西交易所订单状态6"),
            7: LangUtil("巴西交易所订单状态7"),
            8: LangUtil("巴西交易所订单状态8"),
            9: LangUtil("巴西交易所订单状态9"),
            10: LangUtil("巴西交易所订单状态10"),
        };
    }

    onClickBrazilExchange(item: any) {
        console.log("onClickBrazilExchange");

        if (!item || !item.vendor_id) return false;

        const headGameConfig = GameConfig.config.head_game_config;
        for (let index = 0; index < headGameConfig.length; index++) {
            if (headGameConfig[index].vendor_id + "" == item.vendor_id + "") {
                this.onHeadgameClick(headGameConfig[index]);
                this.onClose();
                return true;
            }
        }
        return false;
    }

    onHeadgameClick(item: any) {
        console.log("收到点击", item);

        //如果是打开跳转连接
        if (item.url && item.url.trim()) {
            OpenLink(item.url);
            return;
        }
        //需要跳转打开网页
        if (item.page && item.page.trim()) {
            PanelUtil.actionByName(item.page);
            return;
        }
        // const newItem = JSON.parse(JSON.stringify(item));
        // if (newItem.ori_vendor_extend) {
        //     newItem.ori_vendor_extend = JSON.stringify(newItem.ori_vendor_extend);
        // }
        item.visitor_allowed = 1;
        PanelUtil.openpage_soccer(item);
    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
}
