import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogLimitedBonusMediator from "../mediator/DialogLimitedBonusMediator";
import DialogLimitedBonusProxy from "../proxy/DialogLimitedBonusProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import PanelUtil from "@/_skin030/core/PanelUtil";
@Component
export default class DialogLimitedBonus extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogLimitedBonusProxy = this.getProxy(DialogLimitedBonusProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogLimitedBonusMediator);
    }
    timeArr = [0, 0, 0, 0]; //时间组 ，用来存 分钟和秒
    timeHandle = 0; //时间的句柄

    //设置时间组
    setTimeArr(second: number) {
        //将秒专为  分 与秒
        const minutes = Math.floor(second / 60);

        let my_second = second - minutes * 60;
        if (my_second <= 0) my_second = 0;
        this.timeArr = [Math.floor(minutes / 10), minutes % 10, Math.floor(my_second / 10), my_second % 10];
        // console.log("计算时间》〉" + second + "《〈重组的时间为", this.timeArr);
    }
    //清除倒计时
    cleanTime() {
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
            this.timeHandle = 0;
        }
    }
    //时间到
    onTimeFinish() {
        this.cleanTime();
        console.log("倒计时 时间到了");
        this.resetTime(180);
    }
    //重置设置时间
    resetTime(second: number) {
        this.cleanTime();
        this.myProxy.pageData.timeCount = second;
        this.timeHandle = setInterval(() => {
            this.myProxy.pageData.timeCount--;

            if (this.myProxy.pageData.timeCount < 0) {
                this.myProxy.pageData.timeCount = 0;
                this.onTimeFinish();
            }
            this.setTimeArr(this.myProxy.pageData.timeCount);
        }, 1000);
    }

    onClose() {
        if (this.closeHandle) {
            clearTimeout(this.closeHandle);
            this.closeHandle = 0;
        }
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                //console.log("回到顶部");
                const mainNode = document.getElementById("main_node");
                if (mainNode) {
                    mainNode.scrollTop = 0;
                }
                this.resetCardScale();
            });
            this.resetTime(180);
        } else {
            this.cleanTime();
            this.setTimeArr(0);
        }
    }
    @Watch("pageData.bHidden")
    onWatchHidden() {
        if (!this.pageData.bHidden) {
            this.$nextTick(() => {
                this.resetCardScale();
            });
        }
    }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    @Watch("$vuetify.breakpoint.height")
    onWatchScreen_height() {
        this.resetCardScale();
    }
    resetCardScale() {
        if (this.$refs.card_node) {
            let scale_height = this.$vuetify.breakpoint.height / 1000;
            let scale_width = this.$vuetify.breakpoint.width / 980;
            scale_height = scale_height < 1 ? scale_height : 1;
            scale_width = scale_width < 1 ? scale_width : 1;
            if (!this.$xsOnly) {
                //判断是横屏还是竖屏
                const isHorizontal = scale_height < scale_width;
                // if (isHorizontal) {
                //     //@ts-ignore
                //     this.$refs.card_node.$el.style.scale = scale_height;
                //     //两个点 （0.52， -186） 和 （1，0）
                //     const top_count = 387.5 * scale_height - 387.5;
                //     //@ts-ignore
                //     this.$refs.card_node.$el.style.top = top_count + "px";
                // } else {
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale_width;
                //@ts-ignore
                this.$refs.card_node.$el.style.top = "auto";
                // }
            } else {
                // console.log("手机版----");
                scale_height = this.$vuetify.breakpoint.height / 800;
                scale_width = this.$vuetify.breakpoint.width / 720;
                scale_height = scale_height < 1 ? scale_height : 1;
                scale_width = scale_width < 1 ? scale_width : 1;

                const scale = scale_height > scale_width ? scale_width : scale_height;
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale;
                const top_count = 228 * scale - 138;
                //@ts-ignore
                this.$refs.card_node.$el.style.top = top_count + "px";
            }
        }
    }

    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }
    closeHandle = 0;
    onGetBtnClick() {
        console.log("---领取按钮");
        if (core.user_id) {
            const activelist = PanelUtil.getProxy_navigation.activityData;
            this.closeHandle = setTimeout(() => {
                this.onClose();
            }, 200);
            for (let index = 0; index < activelist.length; index++) {
                const element = activelist[index];
                if (element.award_type && element.award_type == 16) {
                    PanelUtil.openpanel_activity_detail_recharge(element);
                    return;
                }
            }
            PanelUtil.openpage_recharge();
        }
        PanelUtil.message_confirm({
            message: LangUtil("请您登录游戏"),
            okFun: () => {
                PanelUtil.openpanel_login();
                this.closeHandle = setTimeout(() => {
                    this.onClose();
                }, 200);
            },
        });
    }
    get chickIsCanTouch() {
        return true;
    }
    get titleImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "es_ES", "pt_PT"];
        if (!inc.includes(lang)) {
            lang = "zh_CN";
        }
        return require(`@/_skin030/assets/limit_bonus/${lang}/title.png`);
    }
    get getBtnTextImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "es_ES", "pt_PT"];
        if (!inc.includes(lang)) {
            lang = "zh_CN";
        }
        return require(`@/_skin030/assets/limit_bonus/${lang}/get_text.png`);
    }

    getTimeImg(count: number) {
        return require(`@/_skin030/assets/limit_bonus/public/time_${count}.png`);
    }
}
