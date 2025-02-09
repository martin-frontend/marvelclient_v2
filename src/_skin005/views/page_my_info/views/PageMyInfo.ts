import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMyInfoMediator from "../mediator/PageMyInfoMediator";
import PageMyInfoProxy from "../proxy/PageMyInfoProxy";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PageBlur from "@/_skin005/core/PageBlur";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import GlobalVar from "@/core/global/GlobalVar";
import SkinVariable from "@/_skin005/core/SkinVariable";
import { amountFormat } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
@Component
export default class PageMyInfo extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageMyInfoProxy = this.getProxy(PageMyInfoProxy);
    pageData = this.myProxy.pageData;
    commonIcon = Assets.commonIcon;
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    GamePlatConfig = GamePlatConfig;
    ModulesHelper = ModulesHelper;
    GlobalVar = GlobalVar;
    SkinVariable = SkinVariable;
    getCoinAlias = CoinTransformHelper.GetCoinAlias;
    constructor() {
        super(PageMyInfoMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        PanelUtil.showAppLoading(false);
        this.myProxy.api_user_var_block_coins_scale();
    }
    amountFormat(val: any, isb = true) {
        return amountFormat(val, isb);
    }
    get menuList() {
        const newlist = [];
        const list = {
            0: { id: 0, name: LangUtil("个人中心"), icon: "my_info" },
            1: { id: 1, name: LangUtil("安全中心"), icon: "sefety" },
            2: { id: 2, name: LangUtil("我的余额"), icon: "yue" },
            3: { id: 3, name: LangUtil("我的投注"), icon: "bet_my" },
            4: { id: 4, name: LangUtil("消息中心"), icon: "mail" },
            5: { id: 5, name: LangUtil("币种介绍"), icon: "coin" },
            6: { id: 6, name: LangUtil("质押分红"), icon: "chips" },
            7: { id: 7, name: LangUtil("推广赚钱"), icon: "extension" },
            8: { id: 8, name: LangUtil("游戏返水"), icon: "water" },
            9: { id: 9, name: LangUtil("SWAP交易"), icon: "swap" },
            10: { id: 10, name: LangUtil("精彩活动"), icon: "activity" },
            11: { id: 11, name: LangUtil("代理管理"), icon: "agentmenger" },
            12: { id: 12, name: LangUtil("我的返水"), icon: "water" },
            13: { id: 13, name: LangUtil("用户认证"), icon: "certified" },
            14: { id: 14, name: LangUtil("公告中心"), icon: "notice" },
            15: { id: 15, name: LangUtil("推广代理"), icon: "agentmenger" },
            17: { id: 17, name: LangUtil("用户认证"), icon: "certified" },
        };
        newlist.push(list[0]);
        if (SkinVariable.isShowPlatUsersVerification && GamePlatConfig.config.is_user_verification.is_open) newlist.push(list[13]);
        if (!ModulesHelper.IsShow_HideSafeCenter()) newlist.push(list[1]);
        newlist.push(list[2]);
        newlist.push(list[3]);
        newlist.push(list[4]);

        //币种介绍
        if (ModulesHelper.IsShow_CoinIntroduce()) {
            newlist.push(list[5]);
        }
        //质押分红
        if (ModulesHelper.IsShow_PledgeDividend()) {
            newlist.push(list[6]);
        }
        //推广赚钱
        if (ModulesHelper.IsShow_Promotion()) {
            newlist.push(list[7]);
        }
        //游戏返水
        if (ModulesHelper.IsShow_GameWater()) {
            newlist.push(list[8]);
        }
        //SWAP交易
        if (ModulesHelper.IsShow_Swap()) {
            newlist.push(list[9]);
        }
        //精彩活动
        if (ModulesHelper.IsShow_ActivityDisplay()) {
            newlist.push(list[10]);
        }
        //代理管理
        if (ModulesHelper.IsShow_AgentManager()) {
            newlist.push(list[11]);
        }
        //代理管理
        if (ModulesHelper.isShow_Fan_shui()) {
            newlist.push(list[12]);
        }
        //公告
        if (ModulesHelper.IsShow_NoticeBtn()) {
            newlist.push(list[14]);
        }
        //代理统计
        if (this.selfProxy.userInfo.is_show_agent_statistic === 1) {
            newlist.push(list[15]);
        }
        // kyc认证
        if (ModulesHelper.IsShow_Kyc()) {
            newlist.push(list[17]);
        }
        return newlist;
    }

    goCategory(item: any) {
        switch (item) {
            case 0:
                PanelUtil.openpanel_user_center();
                break;
            case 1:
                PanelUtil.openpanel_safety_center();
                break;
            case 2:
                PanelUtil.openpanel_wallet();
                break;
            case 3:
                PanelUtil.openpanel_bet_record();
                break;
            case 4:
                PanelUtil.openpanel_mail();
                break;
            case 5:
                PanelUtil.openpage_introduce();
                break;
            case 6:
                PanelUtil.openpage_bonus();
                break;
            case 7:
                PanelUtil.openpage_extension();
                break;
            case 8:
                PanelUtil.openpage_mine();
                break;
            case 9:
                PanelUtil.openpage_swap();
                break;
            case 10:
                PanelUtil.openpanel_activity();
                break;
            case 11:
                PanelUtil.openpage_statist_credit();
                break;
            case 12:
                PanelUtil.openpanel_directly_backwater(null, true);
                break;
            case 13:
                PanelUtil.openpanel_plat_users_verification();
                break;
            case 14:
                PanelUtil.openpanel_notice();
                break;
            case 15:
                PanelUtil.openpage_promotion_statistic();
                break;
            case 17:
                {
                    const kyc_status = this.selfProxy.userInfo.kyc_status;
                    if (kyc_status == 0 || kyc_status == 2) {
                        PanelUtil.openpanel_dialog_kyc();
                    } else {
                        PanelUtil.message_info(this.getCertificationStatus({ id: 17 }).name);
                    }
                }
                break;
        }
    }

    public get curShowMoney(): any {
        if (this.selfProxy.userInfo && this.selfProxy.userInfo.gold_info && this.gameProxy.coin_name_unique) {
            //@ts-ignore
            const res = this.selfProxy.userInfo.gold_info[this.gameProxy.coin_name_unique];
            if (res) {
                return res.sum_money;
            } else {
                return "";
            }
            //return this.selfProxy.userInfo.gold_info[this.gameProxy.coin_name_unique].sum_money;
        }
        return "";
    }
    isShowVipInfo = ModulesHelper.IsShow_VipInfo();
    vipMap = Assets.VipMap;
    // vip 详情 按钮点击
    onVipInfoBtnClick() {
        console.log("查看vip 详情");
        PanelUtil.openpage_mine();
    }

    onItemClick(key: string) {
        this.gameProxy.setCoin(key);
        //PanelUtil.openpage_game_play();
        if (
            this.$route.path.includes("page_game_play") ||
            this.$route.path.includes("page_game_soccer") ||
            this.$route.path.includes("cricket")
        ) {
            this.gameProxy.api_vendor_var_ori_product_show_var(this.gameProxy.currGame);
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        //console.log("  user 修改值", this);
        // PageBlur.blur_mainpage(this.isFilterChange,false );
        // PageBlur.blur_novigation(this.isFilterChange,false );
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }

    onCoinIn() {
        PanelUtil.openpanel_recharge();
    }

    handlerGameRate() {
        PanelUtil.openpanel_game_rate();
    }

    onRechargeBtnClick() {
        console.log("充值按钮点击");
        PanelUtil.openpanel_recharge();
    }
    onExchargeBtnClick() {
        console.log("提现");
        PanelUtil.openpanel_excharge();
    }

    onLoginOut() {
        //this.selfProxy.api_user_logout();
        PanelUtil.message_confirm({
            message: LangUtil("是否退出登录"),
            okFun: () => {
                this.selfProxy.api_user_logout();
            },
        });
    }

    public get item_count(): number {
        const realWidth = this.$vuetify.breakpoint.width - 22;
        const count = Math.floor(realWidth / 85);
        const idx = this.menuList.length % count;
        const needCount = count - idx;

        console.log("count :  " + count + " -- needCount--" + needCount);
        if (idx <= 0) {
            return 0;
        }
        return needCount;
    }
    public get isShowRecharge(): boolean {
        const is_credit_user = this.selfProxy.userInfo.is_credit_user == 1;
        if (GlobalVar.skin == "skin006_1" && is_credit_user) {
            return false;
        }
        return (
            GlobalVar.instance.isShowRecharge ||
            (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98) ||
            (this.selfProxy.userInfo.is_credit_user == 1 && this.selfProxy.userInfo.is_cash_agent == 1)
        );
    }
    transformExpAndUsdt(count: any) {
        if (!this.ModulesHelper.IsShow_VipShowDeal()) {
            return count;
        }
        if (this.myProxy.getCoinsScale <= 0) return count;
        let amount = 0;
        if (typeof count == "string") {
            amount = parseFloat(count);
        } else {
            amount = count;
        }
        const newNub = (amount * this.myProxy.getCoinsScale).toFixed(2);
        return newNub;
    }
    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, false, false);
    }
    getCertificationStatus(item: any) {
        // const status: any = 1;
        // switch (status) {
        const status = item.id == 13 ? this.selfProxy.userVerificationStatus : this.selfProxy.userInfo.kyc_status;
        switch (status) {
            case 0:
                return { name: LangUtil("未认证"), icon: "mdi-alert-circle", color: "red" };
            case 1:
                return { name: LangUtil("认证通过"), icon: "mdi-check-circle", color: "success" };

            case 2:
                return { name: LangUtil("认证失败"), icon: "mdi-alert-circle", color: "red" };

            case 3:
                return { name: LangUtil("审核中"), icon: "mdi-clock", color: "orange" };
            case 11:
                return { name: LangUtil("开始认证"), icon: "mdi-clock", color: "orange" };
            case 12:
                return { name: LangUtil("提交认证中"), icon: "mdi-clock", color: "orange" };
            default:
                return {};
        }
    }
    isActivityCoin(name: any) {
        return GamePlatConfig.isActivityCoin(name);
    }
    //过期或者取消的活动币
    get liveActivity() {
        // return this.selfProxy.coinTaskData.list.filter((item: any) => item.status != 5 && item.status != 6);
        return this.selfProxy.coinTaskData.list.filter((item: any) => item.status == 2);
    }

    //活动币是否显示
    isShowActivityCoin(key: string): boolean {
        //是否为活动币
        if (!this.isActivityCoin(key)) return false;

        //检查当前币种的活动是否在列表中
        const isActive = this.selfProxy.coinTaskData.list.some((ele: any, index: any, arr: any) => {
            return ele.task_coin_name_unique == key;
        });
        if (!isActive) return false;

        //判断需要展示的情况
        const isNeedShow = this.liveActivity.some((ele: any, index: any, arr: any) => {
            return ele.task_coin_name_unique == key;
        });
        if (isNeedShow) return true;

        return false;
    }
}
