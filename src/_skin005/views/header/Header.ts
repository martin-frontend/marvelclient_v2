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

@Component
export default class Header extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;

    //当前路由
    routerPath = this.$router.app.$route.path;
    pagetab = -1;

    mounted() {
        this.onWatchWidth();
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
        this.onWatchWidth();
        return ModulesHelper.IsShow_AgentManager();
        //return this.isShowDirectly == 2;
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

    @Watch("$route")
    onWatchRouter() {
        console.log("修改");
        this.routerPath = this.$router.app.$route.path;

        switch (this.routerPath) {
            // case "/page_game_list":
            //     this.pagetab = 1;
            //     break;
            case "/page_game_soccer":
                this.pagetab = 1;
                break;
            case "/page_statistice_credit":
                    this.pagetab = 2;
                    break;
            default:
                this.pagetab = -1;
                break;
        }
        if (!this.routerPath || this.routerPath == "/") {
            this.pagetab = 0;
        }
    }

    @Watch("pagetab")
    onWatchPageTabChange(vul_1: number, vul_2: number) {
        console.log("表头的值", this.pagetab);
        // if (this.pagetab == undefined){
        //     console.log("控制" ,vul_2);
        //     this.pagetab = vul_2;
        // }
        switch (this.pagetab) {
            case 0: { this.goHome(); } break;
            //case 1: { this.goGameList(); } break;
            case 1: {
                if (this.routerPath != "/page_game_soccer")
                    this.goSport();
            } break;
            case 2: {
                if (this.routerPath != "/page_statistice_credit")
                   PanelUtil.openpage_statist_credit();
            } break;

            default:
                break;
        }

        if (!core.user_id && vul_1 == 1) {
            this.$nextTick(() => {
                this.pagetab = 0;
            })

        }
        //console.log("表头的值", this.pagetab);   

    }
    @Watch("$vuetify.breakpoint.width")
    onWatchWidth() {
        this.$nextTick(() => {
            if (this.getElement("tabBox")) {

                if (this.isShowStatistice) {
                    this.getElement("tabBox").style.minWidth =
                        this.getElement("tab1").$el.clientWidth +
                        this.getElement("tab2").$el.clientWidth +
                        this.getElement("tab3").$el.clientWidth +
                        40 * 2 +
                        "px";
                }
                else {
                    this.getElement("tabBox").style.minWidth =
                        this.getElement("tab1").$el.clientWidth +
                        // this.getElement("tab2").$el.clientWidth +
                        this.getElement("tab3").$el.clientWidth +
                        40 * 2 +
                        "px";
                }
            }
        });
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
}
