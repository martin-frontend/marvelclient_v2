import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogBetRecordProxy from "../../proxy/DialogBetRecordProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import OpenLink from "@/core/global/OpenLink";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DetailCricket extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    @Prop() item!: any;

    /**板球固赔状态 */
    get cricketFixedStatus() {
        return {
            0: LangUtil("板球订单状态0"),
            1: LangUtil("板球订单状态1"),
            2: LangUtil("板球订单状态2"),
            3: LangUtil("板球订单状态3"),
            4: LangUtil("板球订单状态4"),
            5: LangUtil("板球订单状态5"),
            6: LangUtil("板球订单状态6"),
            7: LangUtil("板球订单状态7"),
        };
    }
    /**板球交易所状态 */
    get cricketSwapStatus() {
        return {
            0: LangUtil("板球交易所订单状态0"),
            1: LangUtil("板球交易所订单状态1"),
            2: LangUtil("板球交易所订单状态2"),
            3: LangUtil("板球交易所订单状态3"),
            4: LangUtil("板球交易所订单状态4"),
            5: LangUtil("板球交易所订单状态5"),
            6: LangUtil("板球交易所订单状态6"),
            7: LangUtil("板球交易所订单状态7"),
        };
    }
    /**是否可以取消订单 */
    isCanCancle(item: any): boolean {
        if (!item) return false;
        if (item.cancel_order && (item.cancel_order == 1 || item.cancel_order == "1")) {
            //return true;
            //板球判断 1. type=2 下 status=【0】/【1】/【2】
            if (item.game_info) {
                if (item.game_info.type && (item.game_info.type == 2 || item.game_info.type == "2")) {
                    const list = [0, 1, 2];
                    for (let index = 0; index < list.length; index++) {
                        const element = list[index];
                        if (item.game_info.status == element || item.game_info.status == element + "") {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    /**取消订单按钮点击 */
    onCancleClick(item: any) {
        console.log("取消清单 按钮被点击", item);
        PanelUtil.message_confirm({
            message: LangUtil("是否确认取消这笔订单?"),
            okFun: () => {
                this.myProxy.api_vendor_var_bet_log_cancel(item);
            },
            okTxt: LangUtil("是"),
            cancelTxt: LangUtil("否"),
        });
    }
    onClickItemName(item: any) {
        console.log("足球名字被惦记", item);
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
