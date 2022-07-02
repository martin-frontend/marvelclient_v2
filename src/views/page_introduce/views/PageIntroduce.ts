import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import OpenLink from "@/core/global/OpenLink";
import router from "@/router";
import dialog_activity from "@/views/dialog_activity";
import page_bonus from "@/views/page_bonus";
import { Watch, Component } from "vue-property-decorator";
import PageIntroduceMediator from "../mediator/PageIntroduceMediator";
import PageIntroduceProxy from "../proxy/PageIntroduceProxy";

@Component
export default class PageIntroduce extends AbstractView {
    LangUtil = LangUtil;
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

    goContractInfo() {
        OpenLink(this.reward_coin_info.contract_address);
    }

    goWhitePage(){
        OpenLink(LangUtil("白皮书链接"));
    }

    goHome(){
        router.replace("/");
    }

    goPledge(){
        LoginEnter(page_bonus.show);
    }

    goActivity(){
        dialog_activity.show();
    }
}
