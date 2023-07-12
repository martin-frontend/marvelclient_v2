import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogDailySignMediator from "../mediator/DialogDailySignMediator";
import DialogDailySignProxy from "../proxy/DialogDailySignProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class DialogDailySign extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDailySignProxy = this.getProxy(DialogDailySignProxy);
    pageData = this.myProxy.pageData;
    rules = this.myProxy.daily_data.rules;
    constructor() {
        super(DialogDailySignMediator);
    }
    mounted() {
        setTimeout(() => {
            this.resetCardScale();
        }, 200);
        // this.$nextTick(() => {
        //     this.resetCardScale();
        //     // this.onWatchScreen();
        //     // this.onWatchScreen_height();
        // });
    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_plat_sign_index();
        }
    }
    /** 背景图片途径 */
    get bg_icon_path() {
        if (PanelUtil.getThemeDark()) {
            return require(`@/_skin005/assets/daily_sign/bg.png`);
        }

        return require(`@/_skin005/assets/daily_sign/bg_light.png`);
    }
    get miniTitle() {
        return LangUtil("每周累计登录天数即可领取对应第几天的奖励<br>每周一重置");
    }

    /**已经签到的天数 */
    get isSignedDays() {
        let count = 0;
        for (let index = 0; index < this.myProxy.daily_data.rules.length; index++) {
            const element = this.myProxy.daily_data.rules[index];
            if (element.process == 91 || element.process == "91") {
                count++;
            }
        }
        return count;
    }

    get todayData() {
        let todayData = this.myProxy.daily_data.rules[0];
        //表明今天已经签到了， 今日数据 则为 最后一个 已经签到的数据
        if (this.isTodaySign) {
            todayData = this.myProxy.daily_data.rules[this.isSignedDays - 1];
        } //今天没有签到 则为签到之后的
        else {
            todayData = this.myProxy.daily_data.rules[this.isSignedDays];
        }
        return todayData;
    }
    /**今天是否已经签到 */
    get isTodaySign() {
        return this.myProxy.daily_data.today_sign == 1 || this.myProxy.daily_data.today_sign == "1";
    }
    /**当前总计签到天数 */
    signDays = 0;
    // get signDays(): number {
    //     return 0;
    // }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    @Watch("$vuetify.breakpoint.height")
    onWatchScreen_height() {
        this.resetCardScale();
    }
    resetCardScale() {
        //PC版
        if (!this.$xsOnly) {
            if (this.$refs.card_node) {
                let scale_height = this.$vuetify.breakpoint.height / 720;
                scale_height = scale_height > 1 ? 1 : scale_height;
                //@ts-ignore
                this.$refs.card_node.style.scale = scale_height;
            }
        } else {
            if (this.$refs.card_node) {
                let scale_height = this.$vuetify.breakpoint.height / 600;
                scale_height = scale_height > 1 ? 1 : scale_height;

                let scale_width = this.$vuetify.breakpoint.width / 375;
                scale_width = scale_width > 1 ? 1 : scale_width;

                //@ts-ignore
                this.$refs.card_node.style.scale = scale_height > scale_width ? scale_width : scale_height;
            }
        }
    }

    onGetBones() {
        console.log("点击领取奖励--");
        this.myProxy.api_user_var_sign_store();
        //this.myProxy.api_user_var_sign_receive(this.myProxy.daily_data.id, this.todayData.rule_num);
    }
    // onItemClick(item: any) {
    //     console.log("---item--", item);
    //     this.myProxy.api_user_var_sign_store();
    // }
    onPhoneClose() {
        if (!this.$xsOnly) return;
        // console.log(" 点击关闭");
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }
}
