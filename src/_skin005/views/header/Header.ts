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

    // @Watch("gameProxy.currGame.vendor_id")
    // onWatchcurrGame() {
    //     console.log("当前游戏 名字变化了");
    // }

    lastTabValue = "";
    @Watch("pagetab")
    onWatchPagetab(val: any, val_2: any) {
        console.log("当前  tab 变化了" + val + "----", val_2);
        // if (val!= val_2 && (val == 1 || val == 22))
        // {
        //     console.log(" 修改值");
        //     this.pagetab = val_2;
        // }
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
                }

            } break;
            case "11": {
                if (!this.routerPath.includes("page_statistice_credit"))
                    PanelUtil.openpage_statist_credit();
            } break;
            case "22": {

                //if (!this.routerPath.includes("page_game_cricket") )
                {
                    console.log("打开  板球 界面");//this.goSport();
                    this.goCricket();
                }

            } break;
            default:
                break;
        }

        if (!core.user_id && (this.pagetab == "1" || this.pagetab == "22")) {
            this.$nextTick(() => {
                this.pagetab = "0";
            })
        }
        // if (core.user_id && (this.pagetab == "1" || this.pagetab == "22"))
        // {
        //     this.pagetab = this.lastTabValue;
        // }

    }

    // @Watch("pagetab")
    // onWatchPageTabChange(vul_1: number, vul_2: number) {
    //     console.log("表头的值", this.pagetab);
    //     // if (this.pagetab == undefined){
    //     //     console.log("控制" ,vul_2);
    //     //     this.pagetab = vul_2;
    //     // }
    //     switch (this.pagetab) {
    //         case 0: { this.goHome(); } break;
    //         //case 1: { this.goGameList(); } break;
    //         case 1: {
    //             if (this.routerPath != "/page_game_soccer")
    //                 this.goSport();
    //         } break;
    //         case 2: {
    //             if (this.routerPath != "/page_statistice_credit")
    //                 PanelUtil.openpage_statist_credit();
    //         } break;

    //         default:
    //             break;
    //     }

    //     if (!core.user_id && vul_1 == 1) {
    //         this.$nextTick(() => {
    //             this.pagetab = 0;
    //         })

    //     }
    //     //console.log("表头的值", this.pagetab);   

    // }
    // @Watch("$vuetify.breakpoint.width")
    // onWatchWidth() {
    //     this.$nextTick(() => {
    //         if (this.getElement("tabBox")) {

    //             if (this.isShowStatistice || SkinVariable.isShowBanqiu) {
    //                 this.getElement("tabBox").style.minWidth =
    //                     this.getElement("tab1").$el.clientWidth +
    //                     this.getElement("tab2").$el.clientWidth +
    //                     this.getElement("tab3").$el.clientWidth +
    //                     40 * 2 +
    //                     "px";
    //             }
    //             else {
    //                 this.getElement("tabBox").style.minWidth =
    //                     this.getElement("tab1").$el.clientWidth +
    //                     // this.getElement("tab2").$el.clientWidth +
    //                     this.getElement("tab3").$el.clientWidth +
    //                     40 * 2 +
    //                     "px";
    //             }
    //         }
    //     });
    // }

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
