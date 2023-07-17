import AbstractView from "@/core/abstract/AbstractView";

import { Watch, Component } from "vue-property-decorator";
import DialogPromotionRewardMediator from "../mediator/DialogPromotionRewardMediator";
import DialogPromotionRewardProxy from "../proxy/DialogPromotionRewardProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogPromotionReward extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPromotionRewardProxy = this.getProxy(DialogPromotionRewardProxy);
    pageData = this.myProxy.pageData;
    data = this.pageData.myData;
    promotion_reward_model_id = this.pageData.promotion_reward_model_id;
    GamePlatConfig = GamePlatConfig;
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

    boxImgPath(index: any) {
        if (index < 3) {
            return require("@/_skin005/assets/promotion_reward/box1.png");
        } else if (index < 6 && index >= 3) {
            return require("@/_skin005/assets/promotion_reward/box2.png");
        } else {
            return require("@/_skin005/assets/promotion_reward/box3.png");
        }
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

    goActivity() {
        //this.myProxy.pageData.bShow = false;
        PanelUtil.openpanel_activity_detail(this.pageData.list);
        this.onClose();
    }

    // get progressValue() {
    //     let value = "0%";
    //     if (this.pageData.firstChargeCount == 0 || this.pageData.myData.length == 0) return value;

    //     const curCount = this.pageData.firstChargeCount;
    //     const data = this.pageData.myData;
    //     const before = 8; // 第1點之前寬度 8%
    //     const range = [0, data[0].count];
    //     let completions = 0;

    //     // @ts-ignore
    //     data.forEach((item, index) => {
    //         if ((!item.match_info && item.receive == 0) || item.receive === undefined) return;

    //         completions++;
    //         if (data[index + 1]) {
    //             range.shift();
    //             range.push(data[index + 1].count);
    //         }
    //     });

    //     if (completions == 5) {
    //         value = "100%";
    //     } else {
    //         if (completions == 0) {
    //             value = before * (curCount / (range[1] - range[0])) + "%";
    //         } else {
    //             value = before + ((100 - before) / 4) * ((curCount - range[0]) / (range[1] - range[0]) + completions - 1) + "%";
    //         }
    //     }

    //     return value;
    // }

    get isCanReceive() {
        return this.pageData.rule_nums != -1;
    }

    onPhoneClose() {
        if (!this.$xsOnly) return;
        console.log(" 点击关闭");
        //this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }
    get titleImg() {
        let lang = core.lang;
        
        const inc: any = ["zh_CN", "en_EN", "es_ES", "pt_PT"];
        if (!inc.includes(lang)) {
            lang = "zh_CN";
        }
        return require(`@/_skin005/assets/promotion_reward/title/${lang}.png`);
    }
}
