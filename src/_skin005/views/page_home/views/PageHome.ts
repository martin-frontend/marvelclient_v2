import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import LangUtil from "@/core/global/LangUtil";

import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import SkinVariable from "@/_skin005/core/SkinVariable";

@Component
export default class PageHome extends AbstractView {
    LangUtil = LangUtil;
    gameProxy = PanelUtil.getProxy_gameproxy;
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    myProxy: PageHomeProxy = getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;
    ModulesHelper = ModulesHelper;
    SkinVariable = SkinVariable;
    IsShow_PledgeDividend = ModulesHelper.IsShow_PledgeDividend();
    IsShow_Promotion = ModulesHelper.IsShow_Promotion();
    IsShow_GameWater = ModulesHelper.IsShow_GameWater();
    IsShow_Swap = ModulesHelper.IsShow_Swap();
    IsShow_ActivityDisplay = ModulesHelper.IsShow_ActivityDisplay();
    IsShow_FootBallHot = ModulesHelper.IsShow_FootBallHot();
    // 是否显示game_type
    isShowGameType = SkinVariable.isShowGameType;

    constructor() {
        super(PageHomeMediator);
    }

    /**CF今日涨跌 */
    get coinChangedData() {
        const str = this.pageData.swap_k.coin_a_b_changed;
        if (str) {
            const num1 = str.split("(");
            const num2 = num1[1].split(")");

            return [num1[0], num2[0]];
        } else {
            return [0, 0];
        }
    }

    get block_extension_bg() {
        return require(`@/_skin005/assets/block_extension${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
    }
    get block_activity_bg() {
        return require(`@/_skin005/assets/block_activity${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
    }
    get block_bg() {
        return require(`@/_skin005/assets/texture_money${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
    }

    public get viewWidth(): number {
        if (SkinVariable.adjustBannerHeightFor08Skin) return this.viewWidthFor08Skin;

        if (this.$mobile) {
            if (this.$vuetify.breakpoint.width < 360) {
                return 80;
            }
            if (this.$vuetify.breakpoint.width < 500) {
                return 90;
            }
            if (this.$vuetify.breakpoint.width < 800) {
                return 130;
            }
            return 180;
        }
        if (this.$vuetify.breakpoint.width > 1700) {
            return 350;
        } else if (this.$vuetify.breakpoint.width > 1280) {
            return 265;
        }
        return 350;
        // return 240;
    }

    get viewWidthFor08Skin(): number {
        if (this.$mobile) {
            return this.$vuetify.breakpoint.width / (1440 / 450);
        } else if (this.$vuetify.breakpoint.width > 1700) {
            return 450;
        } else {
            return 340;
        }
    }

    //推广赚钱
    goExtension() {
        PanelUtil.openpage_extension();
    }
    /**打开活动页面 */
    goActivity() {
        PanelUtil.openpanel_activity();
    }
    //打开 质押分红 界面
    openpage_bonus() {
        PanelUtil.openpage_bonus();
    }

    //打开 游戏返水 界面
    openpage_mine() {
        PanelUtil.openpage_mine();
    }

    //打开 SWAP交易 界面
    openpage_swap() {
        PanelUtil.openpage_swap();
    }
    onBigItemClick(item: any) {
        this.jump(item);
    }
    jump(item: core.PlatNoticeVO) {
        //跳转模块:1-不跳转|2-奖励币介绍|3-质押分红|4-游戏挖矿|5-精彩活动|6-推广赚钱|7-币币交易|8-Swap
        console.log(">>>>>", item.open_mode);
        PanelUtil.jumpTo(item);
    }
    get getBinerSize(): number {
        if (this.$mobile) {
            return 12;
        }
        if (this.IsShow_PledgeDividend || this.IsShow_Swap) {
            return 9;
        }
        return 12;
    }
    destroyed(): void {
        if (this.updataHandle) {
            clearInterval(this.updataHandle);
        }
    }
    updataHandle = 0;
    mounted() {
        /**客户端更新  10分钟更新一次 */
        const updataTime = 10 * 60 * 1000;

        const lastUpdataTime = window.localStorage.getItem("updataTime_" + core.plat_id) || "0";
        if (Date.now() - Number(lastUpdataTime) > updataTime * 0.5) {
            window.localStorage.setItem("updataTime_" + core.plat_id, Date.now() + "");
            this.myProxy.api_plat_var_client_config();
        }
        this.updataHandle = setInterval(() => {
            this.myProxy.api_plat_var_client_config();
        }, updataTime);
    }
}
