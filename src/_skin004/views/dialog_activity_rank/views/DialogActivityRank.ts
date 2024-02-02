import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityRankMediator from "../mediator/DialogActivityRankMediator";
import DialogActivityRankProxy from "../proxy/DialogActivityRankProxy";
import LangUtil from "@/core/global/LangUtil";
import { changeDateShow, getDateOffset } from "@/core/global/Functions";
import gsap, { Linear, Elastic } from "gsap";
import { scrollUtil_div } from "@/core/global/ScrollUtil";
import BlurUtil from "@/core/global/BlurUtil";
import LoginEnter, { EnterGame } from "@/_skin004/core/global/LoginEnter";
import dialog_message_box from "@/views/dialog_message_box";
@Component
export default class DialogActivityRank extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityRankProxy = this.getProxy(DialogActivityRankProxy);
    pageData = this.myProxy.pageData;
    rank_list = this.myProxy.pageData.rankList.list;
    constructor() {
        super(DialogActivityRankMediator);
    }
    mounted() {
        // this.myProxy.getRankListDetail();
        // this.myProxy.api_plat_activity_index_rank_list();
        // this.myProxy.api_plat_activity_index_rank_user_list();
    }

    onClose() {
        // this.pageData.bShow = false;
        // MultDialogManager.onClosePanel();
        this.myProxy.onClose();
    }
    @Watch("pageData.bHidden")
    onWatchHidden() {
        if (!this.pageData.bHidden) {
            this.$nextTick(() => {
                this.resetCardScale();
            });
        }
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_plat_activity_index_rank_list();
            this.$nextTick(() => {
                const mainNode = document.getElementById("main_node");
                if (mainNode) {
                    //console.log("回到顶部");
                    mainNode.scrollTop = 0;
                }
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

    @Watch("pageData.rank_updata")
    onWatchCurRankChange() {
        this.$nextTick(() => {
            this.anim_big_scale_to_nomal();
        });
    }
    @Watch("pageData.cur_rank_id")
    onWatchRankIdChange() {
        this.$nextTick(() => {
            if (this.$refs.scroll_detail_node) {
                //@ts-ignore
                scrollUtil_div(this.$refs.scroll_detail_node.$el, 0, 0);
            }
        });
    }
    resetCardScale() {
        if (!this.$refs.card_node) return;

        if (!this.$vuetify.breakpoint.mobile) {
            let scale_width = this.$vuetify.breakpoint.width / 796;
            scale_width = Math.min(1.5, scale_width);
            //@ts-ignore
            this.$refs.card_node.$el.style.zoom = scale_width;
        } else {
            let scale_width = this.$vuetify.breakpoint.width / 400;
            scale_width = Math.min(1.5, scale_width);
            //@ts-ignore
            this.$refs.card_node.$el.style.zoom = scale_width;
        }
    }
    get isRunningActivity() {
        return this.pageData.cur_rank_type == 1;
    }
    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }

    get titleImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "pt_PT", "vi_VN"];
        if (!inc.includes(lang)) {
            lang = "en_EN";
        }
        return require(`@/_skin004/assets/activity_rank_list/title/${lang}.png`);
    }
    get overtimeImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "pt_PT", "vi_VN"];
        if (!inc.includes(lang)) {
            lang = "en_EN";
        }
        return require(`@/_skin004/assets/activity_rank_list/overtime/${lang}.png`);
    }
    getStartDate(str: string) {
        const { startTime } = getDateOffset(str);
        return changeDateShow(startTime);
    }
    getEndDate(str: string) {
        const { endTime } = getDateOffset(str);
        return changeDateShow(endTime);
    }
    handleLinkClick(event: any) {
        // event.preventDefault();
        // 检查点击的目标元素是否是超链接
        // let targetLink = event.target.closest("a") || event.target.parentNode.closest("a");
        // if (!targetLink && event.target.tagName === "BUTTON") {
        //     const btn = event.target.closest("button");
        //     if (btn) targetLink = btn.querySelector("a");
        // }
        // if (targetLink) {
        //     // 取消默认的链接跳转行为
        //     event.preventDefault();
        //     const targetUrl = targetLink.href;
        //     //提取targetLink中的原始的值
        //     const targetUrlOrigin = targetLink.getAttribute("href");
        //     const obj = {
        //         open_mode_url: targetUrlOrigin,
        //     };
        //     if (PanelUtil.isCanJump(obj)) {
        //         PanelUtil.jumpTo(obj);
        //         this.onClose();
        //     } else {
        //         PanelUtil.jumpTo({
        //             open_mode_url: targetUrl,
        //         });
        //     }
        // }
    }

    onGameItemClick(item: any) {
        console.warn("游戏对象呗点击", item);
        // this.anim_big_scale_to_nomal();
        if (item) {
            if (item.status == 1) {
                if (item.visitor_allowed == 1) {
                    this.onClose();
                    EnterGame(item);
                } else {
                    LoginEnter(() => {
                        this.onClose();
                        EnterGame(item);
                    });
                }
            } else {
                dialog_message_box.alert(LangUtil("{0}正在维护", item.vendor_product_name));
            }
        }
    }

    anim_big_scale_to_nomal() {
        if (!this.$refs.close_node) return;
        const obj = this.$refs.close_node;
        const tl = gsap.timeline();

        tl.to(obj, {
            scale: 3,
            duration: 0,
            x: 250,
            y: 200,
            opacity: 0.0,
        });
        // 把tween动画添加到timeline实例上，注意我们在用的是tl.to 而不是gsap.to
        tl.to(obj, {
            scale: 1,
            duration: 0.5,
            x: 10,
            y: 0,
            opacity: 1,
            ease: "expo.in",
            // ease: CustomBounce.create("myBounce", {
            //     strength: 0.5,
            //     endAtStart: false,
            //     squash: 1,
            //     squashID: "myBounce-squash",
            // }),
        });

        tl.play();
    }

    onLastActivityItemClick(item: any) {
        if (this.isDisable(item)) return;
        console.warn("当前选择的对象为", item);
        this.myProxy.resetQueryActivityData();
        this.myProxy.pageData.cur_rank_id = item.id;
        this.myProxy.reGetData();
    }
    isDisable(item: any) {
        return this.pageData.cur_rank_id == item.id;
    }
    get lastRankTxt() {
        return this.pageData.cur_rank_type == 1 ? LangUtil("往期排行") : LangUtil("进行中的排行榜");
    }
    onBtnClickLastRank() {
        this.pageData.cur_rank_type = (this.pageData.cur_rank_type % 2) + 1;
        this.pageData.cur_rank_id = 0;
        this.myProxy.resetQuery();
        this.myProxy.api_plat_activity_index_rank_list();
    }
    get isShowOvertimeTag() {
        return !this.isRunningActivity && this.rank_list && this.rank_list.length > 0 && !this.pageData.isRankListLoading;
    }

    get mob_scroll_height() {
        if (this.pageData.data.game_list && this.pageData.data.game_list.length > 0) {
            return 280;
        }
        return 330;
    }
}
