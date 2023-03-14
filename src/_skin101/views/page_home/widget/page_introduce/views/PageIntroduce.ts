import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import { moneyFormat } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import PageIntroduceMediator from "../mediator/PageIntroduceMediator";
import PageIntroduceProxy from "../proxy/PageIntroduceProxy";
import dialog_message_box from "@/_skin101/views/dialog_message_box/index";
import router from "@/router";
import LoginEnter from "@/_skin100/core/global/LoginEnter";
import page_extension from "@/_skin101/views/page_extension";
import dialog_activity from "@/_skin101/views/dialog_activity";
import page_bonus from "@/_skin101/views/page_bonus";
import page_game_list from "@/_skin101/views/page_game_list";
@Component
export default class PageIntroduce extends AbstractView {
    LangUtil = LangUtil;
    moneyFormat = moneyFormat;
    myProxy: PageIntroduceProxy = this.getProxy(PageIntroduceProxy);
    pageData = this.myProxy.pageData;
    reward_coin_info = this.pageData.reward_coin_info;
    pageImage = this.myProxy.pageImage;

    awardCoin = GamePlatConfig.getAwardCoin();

    constructor() {
        super(PageIntroduceMediator);
    }

    getTextWrapClass(): string {
        if (this.$vuetify.breakpoint.width > 1264 && this.$vuetify.breakpoint.width < 1460) {
            return "textWrap-ctDown";
        }
        if (this.$vuetify.breakpoint.md) {
            return "textWrap-md";
        }
        if (this.$vuetify.breakpoint.sm) {
            return "textWrap-md";
        }
        if (this.$vuetify.breakpoint.xs) {
            return "textWrap-xs";
        }
        return "textWarp-ct";
    }
    goExtension() {
        LoginEnter(page_extension.show);
    }

    goPledge() {
        LoginEnter(page_bonus.show);
    }
    goActivity() {
        dialog_activity.show();
    }
    onTGGroup() {
        dialog_message_box.alert(LangUtil("暂未开放"));
        // onWatchShow()
    }
    goHome() {
        page_game_list.show();
    }
    goContractInfo() {
        OpenLink(this.reward_coin_info.contract_address);
    }
}
