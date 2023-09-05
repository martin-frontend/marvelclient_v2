import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDailyTaskMediator from "../mediator/DialogDailyTaskMediator";
import DialogDailyTaskProxy from "../proxy/DialogDailyTaskProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import PanelUtil from "@/_skin005/core/PanelUtil";
import LoginEnter from "@/_skin005/core/global/LoginEnter";
@Component
export default class DialogDailyTask extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDailyTaskProxy = this.getProxy(DialogDailyTaskProxy);
    pageData = this.myProxy.pageData;
    constructor() {
        super(DialogDailyTaskMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                this.resetCardScale();
                // this.resetRule();
            });
            this.myProxy.api_plat_activity_index_everyday();
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
            let scale_height = (this.$vuetify.breakpoint.height * 0.88) / 1300;
            let scale_width = this.$vuetify.breakpoint.width / 650;
            scale_height = scale_height < 1 ? scale_height : 1;
            scale_width = scale_width < 1 ? scale_width : 1;
            // if (!this.$xsOnly) {
            const height = 1150;
            const width = 650;
            const top_count = height * (1 - scale_height) * 0.5;
            const left_count = width * (1 - scale_height) * 0.5;
            //@ts-ignore
            this.$refs.card_node.$el.style.scale = scale_height;
            //@ts-ignore
            this.$refs.card_node.$el.style.top = -top_count + "px";
        }
    }

    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }

    get titleImg() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "pt_PT","es_ES"];
        if (!inc.includes(lang)) {
            lang = "zh_CN";
        }
        return require(`@/_skin005/assets/daily_task/title/${lang}.png`);
    }
    onBtnRule() {
        console.log("  rule---->>>>");
    }
    get rule_desc() {
        if (this.myProxy.dailyTaskData.list && this.myProxy.dailyTaskData.list[0] && this.myProxy.dailyTaskData.list[0].rule_desc) {
            return this.myProxy.dailyTaskData.list[0].rule_desc;
        }
        return "";
    }
    get taskList() {
        if (
            this.myProxy.dailyTaskData.list &&
            this.myProxy.dailyTaskData.list[0] &&
            this.myProxy.dailyTaskData.list[0].rules &&
            this.myProxy.dailyTaskData.list[0].rules.length > 0
        ) {
            return this.myProxy.dailyTaskData.list[0].rules;
        }
        return [];
    }
    /**任务的奖励 */
    getItemAward(item: any): string {
        if (!item || !item.award || !item.award.params) return "";

        let str = "";
        const keys = Object.keys(item.award.params);

        for (let index = 0; index < keys.length; index++) {
            if (index != 0) {
                str = str + " ";
            }
            // str = CoinTransformHelper.GetCoinSymbol(keys[index]) + item.award.params[keys[index]];
            str = item.award.params[keys[index]] + " " + keys[index];
        }
        return str;
    }

    /** 1.已完成 且已领奖 91
     * 2.已完成 未领奖 81
     * 3.未完成
     */
    /**是否已经完成 已经领取结束 */
    isComplete(item: any) {
        return item && item.process == 91;
    }
    /**是否可以领取 未领奖*/
    isCanReceive(item: any) {
        return item && item.process == 81;
    }
    getShowTest(item: any): string {
        if (this.isCanReceive(item)) {
            return LangUtil("领取");
        }
        let str = item.condition.match_num + "/" + item.condition.params;

        switch (item.condition.class) {
            case "UserSignDaysRule": //签到
                str = LangUtil("签到");
                break;
            case "UserRechargeSumRule": //充值
                {
                    const new_str =
                        CoinTransformHelper.TransformMoney(item.condition.match_num, 2, "", "", true, true) +
                        "/" +
                        CoinTransformHelper.TransformMoney(item.condition.params, 2, "", "", true, true);
                    str = LangUtil("充值({0})", new_str);
                }

                break;
            case "UserDirectlyHasFirstRechargeRule2": //推广
            case "UserDirectlyHasFirstRechargeRule": //推广
                str = LangUtil("邀请({0})", str);
                break;
            case "UserBindCpfRule":
            case "UserBindEmailRule":
            case "UserIsRegisterRule": //绑定号码
                str = LangUtil("去绑定");
                break;
            case "UserChessWaterBillGe1Rule":
            case "UserGamerWaterBillGe1Rule": //真人游戏反水
            case "UserSportsWaterBillGe1Rule": //棋牌游戏反水
            case "UserLotteryWaterBillGe1Rule": //彩票游戏反水
                {
                    const new_str =
                        CoinTransformHelper.TransformMoney(item.condition.match_num, 2, "", "", true, true) +
                        "/" +
                        CoinTransformHelper.TransformMoney(item.condition.params, 2, "", "", true, true);
                    str = LangUtil("流水({0})", new_str);
                }
                break;
            case "UserJumpShareRule": //跳转分享
                str = LangUtil("分享");
                break;
            case "UserJumpTgGroup": //跳转TG
                str = LangUtil("加入");
                break;
            default:
                break;
        }
        return str;
    }
    /**点击领奖 */
    onReceiveTask(item: any) {
        console.log("点击领取奖励", item);
        if (!core.user_id) {
            LoginEnter(() => {});
            return;
        }
        if (this.isComplete(item)) return;
        if (this.isCanReceive(item)) {
            this.myProxy.api_plat_activity_var_receive(item.rule_num);
            return;
        }
        if (PanelUtil.isCanJump(item)) {
            if (item.condition.class == "UserJumpTgGroup") {
                this.myProxy.api_user_var_jump_store(2);
            } else if (item.condition.class == "UserJumpShareRule") {
                this.myProxy.api_user_var_jump_store(1);
            }
            PanelUtil.jumpTo(item);
            this.onClose();
            return;
        }
        switch (item.condition.class) {
            case "UserSignDaysRule": //签到
                this.myProxy.api_user_var_sign_store();
                return;
            // PanelUtil.openpanel_dailysign();
            case "UserRechargeSumRule": //充值
                PanelUtil.openpage_recharge();
                break;
            case "UserDirectlyHasFirstRechargeRule2": //推广
            case "UserDirectlyHasFirstRechargeRule": //推广
                PanelUtil.openpage_extension();
                break;
            case "UserIsRegisterRule": //绑定号码
                PanelUtil.openpanel_safety_center(1);
                break;
            case "UserBindEmailRule": //绑定邮箱
                PanelUtil.openpanel_safety_center(0);
                break;
            case "UserGamerWaterBillGe1Rule": //真人游戏反水
                PanelUtil.openpanel_gamelist(32);
                break;
            case "UserSportsWaterBillGe1Rule": //棋牌游戏反水
                PanelUtil.openpanel_gamelist(2);
                break;
            case "UserJumpShareRule": //跳转分享
                this.myProxy.api_user_var_jump_store(1);
                PanelUtil.openpage_extension();
                break;
            case "UserJumpTgGroup": //跳转TG
                this.myProxy.api_user_var_jump_store(2);
                break;
            default:
                break;
        }
        this.onClose();
    }

    onClickRuleBtn() {
        const obj = JSON.parse(JSON.stringify(this.myProxy.dailyTaskData.list[0]));
        obj.award_type = 0;
        if (!obj.link_url) {
            obj.link_url = obj.rule_desc;
        }
        PanelUtil.openpanel_activity_detail(obj);
    }
    @Watch("core.user_id")
    onRefresh() {
        console.log("---->>>刷新----");
        this.myProxy.api_plat_activity_index_everyday();
    }
}
