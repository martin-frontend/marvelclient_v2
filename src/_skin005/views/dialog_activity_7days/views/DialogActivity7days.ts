import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogActivity7daysMediator from "../mediator/DialogActivity7daysMediator";
import DialogActivity7daysProxy from "../proxy/DialogActivity7daysProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
import OpenLink from "@/core/global/OpenLink";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { changeDateShow, dateFormat } from "@/core/global/Functions";
import GameConfig from "@/core/config/GameConfig";
import LoginEnter from "@/_skin005/core/global/LoginEnter";
@Component
export default class DialogActivity7days extends AbstractView {
    LangUtil = LangUtil;
    core = core;
    myProxy: DialogActivity7daysProxy = this.getProxy(DialogActivity7daysProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogActivity7daysMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        PanelUtil.getProxy_recharge.rechargeProxy.clearFrom();
        MultDialogManager.onClosePanel();
    }

    get recharge_model_id() {
        return {
            id: 0,
            rule_id: 51,
        };
    }
    mounted() {
        // setTimeout(() => {
        //     this.resetCardScale();
        // }, 200);
        // this.$nextTick(() => {
        //     this.resetCardScale();
        //     // this.onWatchScreen();
        //     // this.onWatchScreen_height();
        // });
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                const mainNode = document.getElementById("main_node");
                if (mainNode) {
                    //console.log("回到顶部");
                    mainNode.scrollTop = 0;
                }
                this.resetCardScale();
                this.resetRule();
            });
            this.clearTime();
            this.isLastItem = false;
        } else {
            this.clearTime();
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
    handleLinkClick(event: any) {
        // 检查点击的目标元素是否是超链接
        if (event.target.tagName === "U" || event.target.tagName === "A") {
            const targetLink = event.target.closest("a") || event.target.parentNode.closest("a");
            if (targetLink) {
                // 在这里执行您的点击事件处理逻辑
                console.log("超链接被点击了", event.target);
                // 取消默认的链接跳转行为
                event.preventDefault();
                const targetUrl = targetLink.href;
                console.log("超链接被点击了，目标 URL:", targetUrl);
                OpenLink(targetUrl);
            }
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
            // console.log("--scale_height-", scale_height);
            // console.log("--scale_width-", scale_width);
            if (!this.$xsOnly) {
                //判断是横屏还是竖屏
                const isHorizontal = scale_height < scale_width;
                if (isHorizontal) {
                    //@ts-ignore
                    this.$refs.card_node.$el.style.scale = scale_height;
                    //两个点 （0.52， -186） 和 （1，0）
                    const top_count = 387.5 * scale_height - 387.5;
                    //@ts-ignore
                    this.$refs.card_node.$el.style.top = top_count + "px";
                } else {
                    //@ts-ignore
                    this.$refs.card_node.$el.style.scale = scale_width;
                    //@ts-ignore
                    this.$refs.card_node.$el.style.top = "auto";
                }
            } else {
                // console.log("手机版----");
                scale_height = this.$vuetify.breakpoint.height / 1000;
                scale_width = this.$vuetify.breakpoint.width / 780;
                scale_height = scale_height < 1 ? scale_height : 1;
                scale_width = scale_width < 1 ? scale_width : 1;

                const scale = scale_height > scale_width ? scale_width : scale_height;
                //@ts-ignore
                this.$refs.card_node.$el.style.scale = scale;
                const top_count = 255.2381 * scale - 302.8571;
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
    onGetBtnClick() {
        LoginEnter(() => {
            if (this.isCanGet && this.curCanGetItem && this.curCanGetItem.reward_status == 2) {
                this.myProxy.api_plat_activity_daily_rewards_var_receive(this.curCanGetItem.award_id);
                return;
            }

            const proxy = PanelUtil.getProxy_recharge;
            // proxy.transferProxy.gold_info = this.selfProxy.userInfo.gold_info;
            proxy.rechargeProxy.api_user_var_recharge_method_list();
            this.myProxy.pageData.rechargeItem = JSON.parse(JSON.stringify(this.curRuleData));

            PanelUtil.showAppLoading(true);
        });

        // PanelUtil.openpage_recharge(0);
        // this.onClose();
    }
    get chickIsCanTouch() {
        //还没有充值过
        if (!this.isCanGet && this.pageData.are_you_eligible) {
            return true;
        }
        //状态  reward_status // 奖励状态 1:不能领奖 2:可以领奖 3:已经领奖 4:已过期
        const isHave = this.myProxy.pageData.rechargeActiveData.some((item: any) => {
            return item.reward_status == 2;
        });

        return isHave;
    }

    onRuleBtnClick() {
        // console.log("-----onRuleBtnClick-----");
        const obj = JSON.parse(JSON.stringify(this.pageData.data));
        obj.award_type = 0;
        PanelUtil.openpanel_activity_detail(obj);
    }
    transRechargeMoney(item: any) {
        const symbol = CoinTransformHelper.GetMainCoinSymbol;
        const count = CoinTransformHelper.TransformMoney(item.params, 2, "", "USDT", true, false);
        return {
            symbol: symbol,
            count: count,
        };
    }
    //当前 规则下 使用的数据
    curRuleData = <any>{
        params: "",
        point: 100,
        coin_name_unique: "",
    };
    rechargeRule = <any>[];
    resetRule() {
        if (!this.myProxy.pageData.data || !this.myProxy.pageData.data.rules || this.myProxy.pageData.data.rules.length < 1) return [];
        /**只有一个 */
        const rules = this.pageData.data.rules[0].list;
        // const id = GameConfig.config.recharge_model_id.rule_id || "51";
        this.rechargeRule = [];
        for (let index = 0; index < rules.length; index++) {
            const element_rule = rules[index];

            const obj = {
                params: "",
                point: 100,
                coin_name_unique: "",
            };

            for (let n = 0; n < element_rule.list.length; n++) {
                const element_item = element_rule.list[n];
                if (element_item.class == "UserRechargeFirstRule") {
                    obj.params = element_item.params;
                }
                if (element_item.class == "UserAwardCoinPercentRule") {
                    obj.point = element_item.coin_amount;
                    //@ts-ignore
                    obj.coin_name_unique = element_item.coin_type;
                }
            }
            this.rechargeRule.push(obj);
        }
        this.curRuleData = this.rechargeRule[0];
        // return rechargeDataArr;
    }

    /**  已经充值 过 还是 没有 充值 过 */
    get isCanGet() {
        return this.pageData.rechargeActiveData.length > 0;
    }
    /**上面 大的规则 按钮被点击 */
    onClickRechargeRule(item: any) {
        this.curRuleData = item;
        console.log("当前点击", item);
    }
    /**获取 7天 每天的奖励的数值 */
    get dailyDataArray() {
        if (this.isCanGet) {
            // 如果能领奖 则使用 服务器发送过来的数据
            return this.myProxy.pageData.rechargeActiveData;
        } else {
            //使用 数值
            const award_Array = [];
            if (!this.pageData.data.daily_ratio) {
                this.myProxy.pageData.data.daily_ratio = [];
            }
            for (let index = 0; index < this.pageData.data.daily_ratio.length; index++) {
                const element = this.pageData.data.daily_ratio[index];
                const obj = <any>{};
                const res = CoinTransformHelper.TransformMoney(
                    (this.curRuleData.params * element * this.curRuleData.point) / 10000,
                    2,
                    "",
                    "USDT",
                    false,
                    false,
                    false,
                    false
                );
                obj[CoinTransformHelper.GetMainCoinName] = res;
                award_Array.push({
                    award_info: obj,
                });
            }
            return award_Array;
        }
    }
    item_bonus(item: any) {
        const keys = Object.keys(item.award_info);
        let str = "";
        for (let index = 0; index < keys.length; index++) {
            str = str + CoinTransformHelper.GetCoinSymbol(keys[index]) + " " + item.award_info[keys[index]];
            if (index != keys.length - 1) {
                str = str + " ";
            }
        }
        return str;
    }
    /** 每个元素的状态 */
    item_stage(item: any) {
        if (item.reward_status) {
            if (item.reward_status == 3) {
                return LangUtil("已领取");
            } else if (item.reward_status == 4) {
                return LangUtil("已过期");
            }
        }
        return "";
    }
    //当前正在活动的对象
    item_active(item: any) {
        if (item.reward_status) {
            if (item.reward_status == 2) {
                return true;
            }
        }
        return false;
    }

    get rechargeBtnText() {
        if (!this.isCanGet && !this.pageData.are_you_eligible) {
            return LangUtil("敬请期待");
        }
        if (!this.isCanGet && this.pageData.are_you_eligible) {
            return LangUtil("马上充值");
        }
        //有可以领取的
        if (this.chickIsCanTouch) {
            return LangUtil("立即领取");
        }
        if (!this.curCanGetItem && this.isLastItem) {
            return LangUtil("领取结束");
        }
        return this.timeShowText;
    }
    isLastItem = false; //是否为最后一个元素
    //当前需要选择的对象
    get curCanGetItem() {
        if (!this.isCanGet) return null;
        let nextElement;
        for (let index = 0; index < this.pageData.rechargeActiveData.length; index++) {
            const element = this.pageData.rechargeActiveData[index];
            //当前有可以领取的对象， 则直接输出这个 对象，这个就为 当前对象
            if (element.reward_status == 2) {
                return element;
            }
            if (element.reward_status == 1 && !nextElement) {
                nextElement = element;
            }
            if (!nextElement && index == this.pageData.rechargeActiveData.length - 1) {
                this.isLastItem = true;
            }
        }
        //当前所有都不能领取，则显示下一个 可以领取的对象
        return nextElement;
    }
    get timeShowText() {
        const timeLeft = this.timeCount;
        // 将剩余时间转换为时、分、秒
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        // 格式化输出倒计时
        const formattedTime = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
        return formattedTime;
    }
    formatTime(time: number) {
        // 将时间格式化为两位数
        return time < 10 ? `0${time}` : time;
    }
    timeHandle = 0; //倒计时 句柄
    timeCount = 0;
    clearTime() {
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
        }
        this.timeHandle = 0;
    }
    //倒计时结束
    onTimeOut() {
        clearTimeout(this.timeHandle);
        this.curCanGetItem.reward_status = 2;
        // this.myProxy.api_plat_activity_daily_rewards_var(this.pageData.data.id);
    }
    @Watch("pageData.rechargeActiveData")
    onWatchRechargeActiveData() {
        //当前 活动的对象 的状态为 不可以领取 开始倒计时
        if (this.curCanGetItem && this.curCanGetItem.reward_status == 1) {
            this.clearTime();
            //计算差值
            this.timeCount = (this.curCanGetItem.last_receive_time - 24 * 3600) * 1000 - Date.now();
            this.timeHandle = setInterval(() => {
                this.timeCount = this.timeCount - 1000;
                if (this.timeCount < -2000) {
                    this.onTimeOut();
                }
            }, 1000);
            if (this.timeCount < -2000) {
                this.onTimeOut();
            }
        }
    }
    @Watch("core.user_id")
    onRefresh() {
        console.log("---->>>刷新----");
        this.myProxy.api_plat_activity_daily_rewards_var();
    }
    getDate(str: string, isChange: boolean = true) {
        let newstr = changeDateShow(str, isChange, true);
        if (newstr) newstr = newstr.substring(0, newstr.length - 3);
        return newstr;
    }
}
