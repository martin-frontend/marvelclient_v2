import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import SelfProxy from "@/proxy/SelfProxy";
import getProxy from "@/core/global/getProxy";
import ScrollUtil from "@/core/global/ScrollUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import ServiceUtil from "@/_skin005/core/global/ServiceUtil";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GlobalVar from "@/core/global/GlobalVar";
import SkinVariable from "@/_skin005/core/SkinVariable";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class Header extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;
    GlobalVar = GlobalVar;
    GameConfig = GameConfig;
    ModulesHelper = ModulesHelper;
    //当前路由
    routerPath = this.$router.app.$route.path;
    pagetab = "";
    SkinVariable = SkinVariable;
    gameProxy = PanelUtil.getProxy_gameproxy;
    mounted() {
        //this.onWatchWidth();
        this.onWatchRouter();
    }

    getElement(ref: string): any {
        return this.$refs[ref];
    }

    public get isMini(): boolean {
        return PanelUtil.getProxy_novigation.isminiMenu;
    }

    //是否显示 代理管理
    public get isShowStatistice(): boolean {
        //this.onWatchWidth();
        return ModulesHelper.IsShow_AgentManager();
        //return this.isShowDirectly == 2;
    }
    //是否显示 板球
    public get isShowCricket(): boolean {

        if (this.GameConfig.config.CricketVendorId && this.GameConfig.config.CricketVendorId != 0) {
            return true;
        }
        return false;
    }

    /**打开主页 */
    goHome() {
        PanelUtil.openpage_home();
        ScrollUtil(0);
    }

    goGameList() {
        PanelUtil.openpage_gamelist();
    }
    goSport() {
        //console.log("点击");
        PanelUtil.openpage_soccer();
    }
    /**板球 */
    goCricket() {
        PanelUtil.openpage_soccer_cricket();
    }

    /**是否为板球 */
    public get isCricket(): boolean {
        console.log("---- 数据 变化------");
        return (!!this.GameConfig.config.CricketVendorId && this.gameProxy.currGame.vendor_id == this.GameConfig.config.CricketVendorId)
    }

    lastTabValue = "";
    @Watch("pagetab")
    onWatchPagetab(val: any, val_2: any) {
        console.log("当前  tab 变化了" + val + "----", val_2);
        if (!core.user_id && val == 1) {
            this.$nextTick(
                () => {
                    console.log("还原值", val_2);
                    this.pagetab = val_2;
                }
            )
        }
        this.lastTabValue = val_2;
    }

    @Watch("$route")
    onWatchRouter() {
        console.log("修改");
        this.routerPath = this.$router.app.$route.path;

        if (this.routerPath.includes("page_game_soccer")) {
            if (this.isCricket) {
                this.pagetab = "22";
            }
            else
                this.pagetab = "1";
        }
        else if (this.routerPath.includes("page_statistice_credit")) {
            this.pagetab = "11";
        }
        else {
            this.pagetab = "-1";
        }
        if (!this.routerPath || this.routerPath == "/" + core.lang) {
            this.pagetab = "0";
        }
    }

    /**图标时间选择 */
    onTimeChange(val: any) {
        console.log("----val--", val);
        //this.pagetab = parseInt(val);
        console.log("---标题 切换", this.pagetab);
        switch (this.pagetab) {
            case "0": { this.goHome(); } break;
            //case 1: { this.goGameList(); } break;
            case "1": {
                if (!this.routerPath.includes("page_game_soccer") || this.isCricket) {
                    this.goSport();
                    this.$nextTick(() => {
                        this.pagetab = this.lastTabValue;
                    });
                }

            } break;
            case "11": {
                if (!this.routerPath.includes("page_statistice_credit"))
                    PanelUtil.openpage_statist_credit();
            } break;
            case "22": {
                console.log("打开  板球 界面");//this.goSport();
                this.goCricket();
                this.$nextTick(() => {
                    this.pagetab = this.lastTabValue;
                });
            } break;
            default:
                break;
        }
    }

    showNovPanel() {
        PanelUtil.showNovigation(true);
    }
    /**打开登录页面 */
    handlerLogin() {
        PanelUtil.openpanel_login();
    }
    /**打开注册页面 */
    handlerRegister() {
        PanelUtil.openpanel_register();
    }
    /**打开邮箱页面 */
    handlerMail() {
        PanelUtil.openpanel_mail();
    }
    /**打开充值页面 */
    onCoinIn() {
        PanelUtil.openpanel_recharge();
    }
    onService() {
        ServiceUtil();
    }


    public get isShowHeader(): boolean {
        //return this.routerPath != '/page_game_soccer' && this.routerPath != '/page_game_play';
        return !(this.routerPath.includes("page_game_soccer") || this.routerPath.includes("page_game_play"));
    }

}
