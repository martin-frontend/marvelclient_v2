import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";

import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import { amountFormat, checkMultiline } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Assets from "@/_skin005/assets/Assets";
import GlobalVar from "@/core/global/GlobalVar";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    LangUtil = LangUtil;
    checkMultiline = checkMultiline;
    ModulesHelper = ModulesHelper;
    core = core;
    private xsOnly = false;
    private progressLinear = 6;
    gameProxy = PanelUtil.getProxy_gameproxy;
    constructor() {
        super(PageMineMediator);
    }
    mounted() {
        //PanelUtil.showAppLoading(false);
        this.xsOnly = this.$xsOnly;
        this.checkProgress();
    }
    amountFormat(val: any, isb = true) {
        return amountFormat(val, isb);
    }
    @Watch("$xsOnly")
    onWAtchXsOnly() {
        this.xsOnly = this.$xsOnly;
        this.checkProgress();
    }

    checkProgress() {
        this.progressLinear = this.xsOnly ? 6 : 6;
    }

    vipMap = Assets.VipMap;

    mobileChange(key: any) {
        const mapPC = <any>{
            coinIcon: 30,
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
        return this.$xsOnly ? mapMobile[key] : mapPC[key];
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
    getVipIcon(vip: any) {
        return `~@/assets/mine/vip${vip}.png`;
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

    destroyed() {
        super.destroyed();
        this.myProxy.clearData();
    }

    get vip_bg_path() {
        if (this.$vuetify.theme.dark) {
            return require(`@/_skin005/assets/mine/item_bg_dark.png`);
        } else {
            return require(`@/_skin005/assets/mine/item_bg.png`);
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
}
