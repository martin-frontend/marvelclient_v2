import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import router from "@/router";
import SelfProxy from "@/proxy/SelfProxy";
import page_mine from "@/_skin004/views/page_mine";
import page_extension from "@/_skin004/views/page_extension";
import dialog_activity from "@/views/dialog_activity";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import page_bonus from "@/views/page_bonus";
import page_swap from "@/views/page_swap";
import PageHomeProxy from "../../proxy/PageHomeProxy";
import { moneyFormat } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { number } from "echarts";
import { id } from "ethers/lib/utils";
import NoticeProxy from "@/proxy/NoticeProxy";
import getProxy from "@/core/global/getProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class Activity extends AbstractView {
    
    @Prop( {default:0}) showDataType!: number;
    LangUtil = LangUtil;
    //proxy
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;

    moneyFormat = moneyFormat;

    is_show_commission = GamePlatConfig.config.is_show_commission;

    /**判断登入 */
    get isUserLogin() {
        return this.selfProxy.userInfo.user_id ? true : false;
    }

    /**CF今日涨跌 */
    get coinChangedData() {
        const str = this.pageData.swap_k.coin_a_b_changed;
        if (str) {
            const num1 = str.split("(");
            const num2 = num1[1].split(")");

            return [num1[0], num2[0]];
        } else {
            return;
        }
    }

    public get getShowData() : any {
        if (!this.showDataType || this.showDataType == 0)
            return this.noticeProxy.data.listType1

            switch (this.showDataType) {
                case 2  :return this.noticeProxy.data.listType4
                case 8  :return this.noticeProxy.data.listType5
                case 16 :return this.noticeProxy.data.listType6
                case 32 :return this.noticeProxy.data.listType7
                case 64 :return this.noticeProxy.data.listType8
                case 4  :return this.noticeProxy.data.listType9
                case 128:return this.noticeProxy.data.listType10
                default:
                    break;
            }
        
        return [];

    }

    onBigItemClick(item: any) {
        this.noticeProxy.jump(item);
    }

    goPageBouns() {
        LoginEnter(page_bonus.show);
    }

    goExtension() {
        LoginEnter(page_extension.show);
    }

    /**游戏挖矿 */
    goMine() {
        LoginEnter(page_mine.show);
    }

    goActivity() {
        dialog_activity.show();
    }

    goPageSwap() {
        page_swap.show();
    }
}
