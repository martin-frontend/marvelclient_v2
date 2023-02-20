import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

import { moneyFormat } from "@/core/global/Functions";
import PageIntroduceProxy from "../../proxy/PageIntroduceProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import OpenLink from "@/core/global/OpenLink";

@Component
export default class Jieshao extends AbstractView {
    LangUtil = LangUtil;


    moneyFormat = moneyFormat;
    myProxy: PageIntroduceProxy = this.getProxy(PageIntroduceProxy);
    pageData = this.myProxy.pageData;
    reward_coin_info = this.pageData.reward_coin_info;
    pageImage = this.myProxy.pageImage;
    awardCoin = GamePlatConfig.getAwardCoin();

    goWhitePage() {
        OpenLink(LangUtil("白皮书链接"));
    }
}
