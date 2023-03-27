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
@Component
export default class PageMyInfo extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageMyInfoProxy = this.getProxy(PageMyInfoProxy);
    pageData = this.myProxy.pageData;
    commonIcon = Assets.commonIcon;
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    GamePlatConfig = GamePlatConfig;
    GlobalVar= GlobalVar;
    constructor() {
        super(PageMyInfoMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        PanelUtil.showAppLoading(false);
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
        };
        newlist.push(list[0]);
        newlist.push(list[1]);
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
        return newlist;
    }

    goCategory(item: any) {
        switch (item) {
            case 0: PanelUtil.openpanel_user_center();
                break;
            case 1: PanelUtil.openpanel_safety_center();
                break;
            case 2: PanelUtil.openpanel_wallet();
                break;
            case 3: PanelUtil.openpanel_bet_record();
                break;
            case 4: PanelUtil.openpanel_mail();
                break;
            case 5: PanelUtil.openpage_introduce();
                break;
            case 6: PanelUtil.openpage_bonus();
                break;
            case 7: PanelUtil.openpage_extension();
                break;
            case 8: PanelUtil.openpage_mine();
                break;
            case 9: PanelUtil.openpage_swap();
                break;
            case 10: PanelUtil.openpanel_activity();
                break;
            case 11: PanelUtil.openpage_statist_credit();
                break;
                case 12: PanelUtil.openpanel_directly_backwater(null, true);
                break;
        }
    }

    public get curShowMoney(): any {
        if (this.selfProxy.userInfo &&
            this.selfProxy.userInfo.gold_info &&
            this.gameProxy.coin_name_unique) {
            //@ts-ignore
            const res = this.selfProxy.userInfo.gold_info[this.gameProxy.coin_name_unique];
            if (res) {
                return res.sum_money;
            }
            else {
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
        if (this.$route.path.includes("page_game_play") || this.$route.path.includes("page_game_soccer") || this.$route.path.includes("cricket")) {
            this.gameProxy.api_vendor_var_ori_product_show_var(this.gameProxy.currGame);
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        console.log("  user 修改值", this);
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
        console.log("提现")
        PanelUtil.openpanel_excharge();
    }

    onLoginOut() {
        //this.selfProxy.api_user_logout();
        PanelUtil.message_confirm({
            message:LangUtil("是否退出登录"),
            okFun:() =>{
                this.selfProxy.api_user_logout();
            }
        })
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
    public get isShowRecharge() : boolean {
        return GlobalVar.instance.isShowRecharge || (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98 );
    } 
}
