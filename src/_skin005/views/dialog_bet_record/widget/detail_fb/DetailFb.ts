import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogBetRecordProxy from "../../proxy/DialogBetRecordProxy";
import GameConfig from "@/core/config/GameConfig";
import OpenLink from "@/core/global/OpenLink";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DetailFb extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    @Prop() item!: any;

    chickIsCanClick(item: any): boolean {
        if (!item || !item.vendor_id) return false;

        const headGameConfig = GameConfig.config.head_game_config;
        for (let index = 0; index < headGameConfig.length; index++) {
            if (headGameConfig[index].vendor_id + "" == item.vendor_id + "") {
                return true;
            }
        }
        return false;
    }

    onClickFootballName(item: any) {
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
    handlerDetail(data: any) {
        //dialog_order.show(data);
        PanelUtil.openpanel_order(data, data.game_info);
    }
    fb_icon_name(item: any) {
        if (item.sport_id) {
            return "sport_" + item.sport_id;
        }
        return "fb";
    }
}
