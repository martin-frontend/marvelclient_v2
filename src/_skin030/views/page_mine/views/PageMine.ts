import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";

import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import { amountFormat, checkMultiline } from "@/core/global/Functions";
import PanelUtil from "@/_skin030/core/PanelUtil";
import Assets from "@/_skin030/assets/Assets";
import GlobalVar from "@/core/global/GlobalVar";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import CoinTransformHelper from "@/_skin030/core/CoinTransformHelper";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    LangUtil = LangUtil;
    checkMultiline = checkMultiline;
    ModulesHelper = ModulesHelper;
    core = core;
    private mobile = false;
    private progressLinear = 6;
    gameProxy = PanelUtil.getProxy_gameproxy;
    commonIcon = Assets.commonIcon;
    selfProxy = PanelUtil.getProxy_selfproxy;
    constructor() {
        super(PageMineMediator);
    }
    mounted() {
        //PanelUtil.showAppLoading(false);
        this.mobile = this.$mobile;
        this.checkProgress();
    }
    amountFormat(val: any, isb = true) {
        return amountFormat(val, isb);
    }
    @Watch("$mobile")
    onWAtchmobile() {
        this.mobile = this.$mobile;
        this.checkProgress();
    }

    checkProgress() {
        this.progressLinear = this.mobile ? 6 : 6;
    }

    vipMap = Assets.VipMap;

    mobileChange(key: any) {
        const mapPC = <any>{
            coinIcon: 25,
            minRewardBtn: {
                w: 102,
                h: 36,
            },
            leftBgVipIcon: {
                w: 75,
                h: 75,
            },
            howIcon: 72,
            howBtn: {
                w: 102,
                h: 36,
            },
        };
        const mapMobile = <any>{
            coinIcon: 30,
            minRewardBtn: {
                w: 90,
                h: 30,
            },
            leftBgVipIcon: {
                w: 60,
                h: 60,
            },
            howIcon: 65,
            howBtn: {
                w: 90,
                h: 30,
            },
        };
        return this.$mobile ? mapMobile[key] : mapPC[key];
    }

    /**奖励记录 */
    handlerMineRecord() {
        PanelUtil.openpanel_record_mine();
    }
    /**投注记录 */
    handlerBetRecord() {
        PanelUtil.openpanel_bet_record();
    }
    /**领取奖励 */
    handlerAward() {
        PanelUtil.message_confirm({
            message: LangUtil("确定要领取?"),
            okFun: () => {
                this.myProxy.api_user_var_backwater_trial_receive();
            },
        });
    }
    /**获取vip icon */
    getVipIcon(vip: number) {
        return require(`@/_skin030/assets/mine/VIP${vip}.png`);
    }

    jumpTo(target: string) {
        if (target == "#betandwater") {
            const getAwardbtn: HTMLElement = <any>document.getElementById("animbtn");
            getAwardbtn?.addEventListener("animationend", () => {
                getAwardbtn.classList.remove("button-animation");
            });
            getAwardbtn?.classList.add("button-animation");
        }
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
    }

    onGoBet() {
        //PanelUtil.openpanel_gamelist();
        PanelUtil.openpage_home();
    }

    open_checkin() {
        PanelUtil.openpanel_dailysign();
    }

    destroyed() {
        super.destroyed();
        this.myProxy.clearData();
    }

    get vip_bg_path() {
        if (this.$vuetify.theme.dark) {
            return require(`@/_skin030/assets/mine/item_bg_dark.png`);
        } else {
            return require(`@/_skin030/assets/mine/item_bg.png`);
        }
    }

    @Watch("core.user_id")
    onWatchUserId() {
        console.log("  用户信息 变化 ， 请求数据");
        this.myProxy.api_user_var_backwater_trial();
        this.myProxy.api_user_var_block_coins_scale();
        PanelUtil.getProxy_selfproxy.api_user_show_var([3, 4, 5, 6]);
        if (GlobalVar.instance.isNullUser) {
            this.myProxy.api_plat_var_vip_config();
        }
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

    transformBackwater(val: any) {
        let sss = val * CoinTransformHelper.GetMainCoinScale;
        if (!ModulesHelper.RebateDisplayType()) {
            sss = sss / 100;
        }
        let str = "";
        if (!ModulesHelper.RebateDisplayType()) {
            str = amountFormat(sss, true, 2) + this.LangUtil("%");
        } else {
            str = amountFormat(sss, false);
        }
        str = CoinTransformHelper.GetMainCoinSymbol + str;
        //const str = amountFormat(sss,false);

        return str;
    }
    vipdetailtext = [
        {
            iconPath: require(`@/_skin030/assets/mine/vip_level_1.png`),
            title: LangUtil("VIP标题1"),
            desc: LangUtil("VIP描述1"),
        },
        // {
        //     iconPath: require(`@/_skin030/assets/mine/vip_level_2.png`),
        //     title: LangUtil("VIP标题2"),
        //     desc: LangUtil("VIP描述2"),
        // },
        {
            iconPath: require(`@/_skin030/assets/mine/vip_level_3.png`),
            title: LangUtil("VIP标题3"),
            desc: LangUtil("VIP描述3"),
        },
        {
            iconPath: require(`@/_skin030/assets/mine/vip_level_4.png`),
            title: LangUtil("VIP标题4"),
            desc: LangUtil("VIP描述4"),
        },
    ];
    centerVipIndex = 1;
    onBtnNext() {
        this.centerVipIndex++;
        this.centerVipIndex = this.centerVipIndex % this.vipdetailtext.length;
    }
    onBtnLast() {
        this.centerVipIndex--;
        if (this.centerVipIndex < 0) {
            this.centerVipIndex = this.vipdetailtext.length - 1;
        }
        //this.centerVipIndex =  this.centerVipIndex % this.vipdetailtext.length;
    }
    getVipShowItem_base(offset: number) {
        let index = this.centerVipIndex + offset;
        if (index < 0) {
            index = this.vipdetailtext.length + index;
        }
        index = index % this.vipdetailtext.length;
        return this.vipdetailtext[index];
    }
    get vipShowItem_0() {
        return this.getVipShowItem_base(-1);
    }
    get vipShowItem_cur() {
        return this.getVipShowItem_base(0);
    }
    get vipShowItem_1() {
        return this.getVipShowItem_base(1);
    }
}
