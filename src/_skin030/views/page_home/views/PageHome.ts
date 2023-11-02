import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import LangUtil from "@/core/global/LangUtil";

import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import SkinVariable from "@/_skin030/core/SkinVariable";
import OpenLink from "@/core/global/OpenLink";
import CoinTransformHelper from "@/_skin030/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";

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
    selfProxy = PanelUtil.getProxy_selfproxy;
    core = core;
    get progressLinear() {
        return this.$mobile ? 14 : 16;
    }

    constructor() {
        super(PageHomeMediator);
    }

    get vip_info() {
        return this.myProxy.vip_info_custom;
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
        return require(`@/_skin030/assets/block_extension${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
    }
    get block_activity_bg() {
        return require(`@/_skin030/assets/block_activity${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
    }
    get block_bg() {
        return require(`@/_skin030/assets/texture_money${this.$vuetify.theme.dark ? "_dark" : ""}.png`);
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

    /**获取vip icon */
    getVipIcon(level: number) {
        return require(`@/_skin030/assets/mine/VIP${level}.png`);
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
    open_recharge() {
        PanelUtil.openpage_recharge();
    }
    open_checkin() {
        PanelUtil.openpanel_dailysign();
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
    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, false, false);
    }

    game_item_data = [
        {
            category: 4,
            icon: "ky_game_lotto",
            title: LangUtil("彩票"),
            bg_name: "game_lotto",
            desc_title: LangUtil("彩票标题"),
            desc: LangUtil("彩票游戏描述信息-----"),
            btn_name: LangUtil("进入彩票"),
        },
        {
            category: 64,
            icon: "ky_game_sport",
            title: LangUtil("体育"),
            bg_name: "game_sport",
            desc_title: LangUtil("体育标题"),
            desc: LangUtil("体育游戏描述信息-----"),
            btn_name: LangUtil("进入体育"),
        },
        {
            category: 2,
            icon: "ky_game_hot",
            title: LangUtil("首页棋牌"),
            bg_name: "game_anime",
            desc_title: LangUtil("棋牌标题"),
            desc: LangUtil("棋牌游戏描述信息-----"),
            btn_name: LangUtil("进入棋牌"),
        },
        {
            category: 16,
            icon: "ky_game_casino",
            title: LangUtil("首页电子"),
            bg_name: "game_casino",
            desc_title: LangUtil("电子标题"),
            desc: LangUtil("电子游戏描述信息-----"),
            btn_name: LangUtil("进入电子"),
        },
    ];

    pay_img_path(item: any) {
        return require(`@/_skin030/assets/pagehome/pay_${item}.png`);
    }
    tabOptions = () => {
        const obj = <any>{};

        obj[0] = "ky_reg_fb";
        obj[1] = "ky_reg_google";
        obj[2] = "ky_reg_line";
        obj[3] = "ky_reg_tiwi";

        return obj;
    };
    typechange = 0;
    /**图标时间选择 */
    onTimeChange(val: any) {
        console.log("点击的值 为", val);
        // this.pageData.tabIndex = parseInt(val);
        // this.onTabClick(this.pageData.tabIndex);
    }
    goRegister() {
        PanelUtil.openpanel_register();
    }
}
