import AbstractView from "@/core/abstract/AbstractView";

import { Watch, Component } from "vue-property-decorator";
import DialogPromotionRewardMediator from "../mediator/DialogPromotionRewardMediator";
import DialogPromotionRewardProxy from "../proxy/DialogPromotionRewardProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogPromotionReward extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPromotionRewardProxy = this.getProxy(DialogPromotionRewardProxy);
    pageData = this.myProxy.pageData;
    data = this.pageData.myData;
    coinImg = [
        require("@/_skin005/assets/promotion_reward/USDT1.png"),
        require("@/_skin005/assets/promotion_reward/USDT2.png"),
        require("@/_skin005/assets/promotion_reward/USDT3.png"),
        require("@/_skin005/assets/promotion_reward/USDT4.png"),
        require("@/_skin005/assets/promotion_reward/USDT5.png"),
    ];
    promotion_reward_model_id = this.pageData.promotion_reward_model_id;

    get got_path() {
        return require(`@/_skin005/assets/daily_sign/got.png`);
    }

    constructor() {
        super(DialogPromotionRewardMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    onReceive() {
        this.myProxy.api_plat_activity_var_receive(this.pageData.rule_nums);
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.pageData.promotion_reward_model_id = GameConfig.config.promotion_reward_model_id;
            this.myProxy.api_plat_activity_var();
            this.myProxy.api_plat_activity_var_rule_id_var();
        }
    }

    goExtension() {
        //this.myProxy.pageData.bShow = false;
        PanelUtil.openpage_extension();
        this.onClose();
    }

    get progressValue() {
        let value = "0%";
        if (this.pageData.firstChargeCount == 0 || this.pageData.myData.length == 0) return value;

        const curCount = this.pageData.firstChargeCount;
        const data = this.pageData.myData;
        const before = 8; // 第1點之前寬度 8%
        const range = [0, data[0].count];
        let completions = 0;
        

        // @ts-ignore
        data.forEach((item, index) => {
            if (!item.match_info && item.receive == 0 || item.receive === undefined) return;

            completions++;
            if (data[index + 1]) {
                range.shift();
                range.push(data[index + 1].count);
            }
        });

        if (completions == 5) {
            value = "100%";
        } else {
            if (completions == 0) {
                value = before * (curCount / (range[1] - range[0])) + "%";
            } else {
                value = before + ((100 - before) / 4) * ((curCount - range[0]) / (range[1] - range[0]) + completions - 1) + "%";
            }
        }

        return value;
    }

    get isCanReceive() {
        return this.pageData.rule_nums != -1;
    }
}
