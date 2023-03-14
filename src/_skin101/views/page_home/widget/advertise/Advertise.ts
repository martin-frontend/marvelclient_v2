import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";

import GamePlatConfig from "@/core/config/GamePlatConfig";
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

@Component
export default class Advertise extends AbstractView {
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    core = core;
    //proxy
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;
    moneyFormat = moneyFormat;

    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;
    isEnter1 = false;
    isEnter2 = false;
    isEnter3 = false;
    bonus_pool_amount_temp = 189422;
    // bonus_pool_amount_temp = 18;
    progressObj = {
        value: 0,
    };

    get height(): number {
        // switch (this.$vuetify.breakpoint.name) {
        //     case "xs":
        //         return 145;
        //     case "sm":
        //     case "md":
        //         return 350;
        //     default:
        //         return 450;
        // }
        switch (this.$vuetify.breakpoint.name) {
            case "xs":
                // return 200;
                return (200 / 375) * this.$vuetify.breakpoint.width;
            // case "sm":
            // case "md":
            //     return 316;
            default:
                return 316;
        }
    }

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
        this.onChange();
    }

    onBigItemClick(item: any) {
        // console.log("item", item);
        this.noticeProxy.jump(item);
    }

    onChange() {
        this.progressObj.value = 0;
        gsap.to(this.progressObj, {
            duration: 5,
            value: 100,
            ease: Linear.easeNone,
        });
    }
    // 新增
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
