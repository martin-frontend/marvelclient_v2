import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import dialog_record_mine from "@/views/dialog_record_mine";
import dialog_bet_record from "@/_skin001/views/dialog_bet_record";
import SelfProxy from "@/proxy/SelfProxy";
import page_game_list from "@/views/page_game_list";
import dialog_message_box from "@/views/dialog_message_box";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import { amountFormat, checkMultiline } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    LangUtil = LangUtil;
    checkMultiline = checkMultiline;

    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    private xsOnly = false;
    private progressLinear = 16;

    constructor() {
        super(PageMineMediator);
    }

    mounted() {
        this.xsOnly = this.$vuetify.breakpoint.xsOnly;
        this.checkProgress();
    }

    @Watch("$vuetify.breakpoint.xsOnly")
    onWAtchXsOnly() {
        this.xsOnly = this.$vuetify.breakpoint.xsOnly;
        this.checkProgress();
    }

    checkProgress() {
        this.progressLinear = this.xsOnly ? 10 : 16;
    }

    vipMap: any = {
        0: require(`@/assets/mine/vip0.png`),
        1: require(`@/assets/mine/vip1.png`),
        2: require(`@/assets/mine/vip2.png`),
        3: require(`@/assets/mine/vip3.png`),
        4: require(`@/assets/mine/vip4.png`),
        5: require(`@/assets/mine/vip5.png`),
        6: require(`@/assets/mine/vip6.png`),
        7: require(`@/assets/mine/vip7.png`),
        8: require(`@/assets/mine/vip8.png`),
        9: require(`@/assets/mine/vip9.png`),
        10: require(`@/assets/mine/vip10.png`),
        11: require(`@/assets/mine/vip11.png`),
        12: require(`@/assets/mine/vip12.png`),
        13: require(`@/assets/mine/vip13.png`),
        14: require(`@/assets/mine/vip14.png`),
        15: require(`@/assets/mine/vip15.png`),
        16: require(`@/assets/mine/vip16.png`),
        17: require(`@/assets/mine/vip17.png`),
        18: require(`@/assets/mine/vip18.png`),
        19: require(`@/assets/mine/vip19.png`),
        20: require(`@/assets/mine/vip20.png`),
    };

    mobileChange(key: any) {
        const mapPC = <any>{
            coinIcon: 42,
            minRewardBtn: {
                w: 178,
                h: 42,
            },
            leftBgVipIcon: {
                w: 75,
                h: 75,
            },
            howIcon: 72,
            howBtn: {
                w: 126,
                h: 42,
            },
        };
        const mapMobile = <any>{
            coinIcon: 30,
            minRewardBtn: {
                w: 127,
                h: 30,
            },
            leftBgVipIcon: {
                w: 75,
                h: 75,
            },
            howIcon: 65,
            howBtn: {
                w: 90,
                h: 30,
            },
        };
        return this.$vuetify.breakpoint.xsOnly ? mapMobile[key] : mapPC[key];
    }

    /**奖励记录 */
    handlerMineRecord() {
        dialog_record_mine.show();
    }
    /**投注记录 */
    handlerBetRecord() {
        dialog_bet_record.show();
    }
    /**领取奖励 */
    handlerAward() {
        dialog_message_box.confirm({
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
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
    }

    onGoBet() {
        page_game_list.show();
    }

    destroyed() {
        super.destroyed();
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
}
