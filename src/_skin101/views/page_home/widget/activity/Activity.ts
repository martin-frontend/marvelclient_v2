import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import router from "@/router";
import SelfProxy from "@/proxy/SelfProxy";
import page_mine from "@/_skin101/views/page_mine";
import page_extension from "@/_skin101/views/page_extension";
import dialog_activity from "@/_skin101/views/dialog_activity";
import LoginEnter from "@/_skin101/core/global/LoginEnter";
import page_bonus from "@/_skin101/views/page_bonus";
import page_swap from "@/_skin101/views/page_swap";
import PageHomeProxy from "../../proxy/PageHomeProxy";
import { moneyFormat } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { number } from "echarts";
import { id } from "ethers/lib/utils";

@Component
export default class Activity extends AbstractView {
    LangUtil = LangUtil;
    //proxy
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;

    moneyFormat = moneyFormat;

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
