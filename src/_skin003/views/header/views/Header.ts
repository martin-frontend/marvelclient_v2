import Assets from "@/_skin003/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GameConfig from "@/core/config/GameConfig";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangConfig from "@/core/config/LangConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import ScrollUtil from "@/core/global/ScrollUtil";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import dialog_activity from "@/_skin003/views/dialog_activity";
import dialog_login from "@/_skin003/views/dialog_login";
import dialog_register from "@/_skin003/views/dialog_register";
import page_introduce from "@/views/page_introduce";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import HeaderProxy from "../proxy/HeaderProxy";
import LoginEnter from "@/core/global/LoginEnter";
import page_extension from "@/_skin003/views/page_extension";

@Component
export default class Header extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    CategoryIcon = Assets.CategoryIcon;
    routerPath = this.$router.app.$route.path;
    core = core;
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    GamePlatConfig = GamePlatConfig;
    LangConfig = LangConfig;
    //当前活动的分类
    categoryActive = -1;

    constructor() {
        super(HeaderMediator);
       
    }

    mounted() {
        window.addEventListener("scroll", this.scrollHandle, true);
        this.scrollHandle();
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }
    /**打开主页 */
    goHome() {
        if (this.$router.app.$route.path != "/") {
            this.$router.push("/");
        }
        ScrollUtil(0);
    }
    /**打开介绍页面 */
    goIntroduce() {
        page_introduce.show();
    }
    /**打开活动页面 */
    goActivity() {
        dialog_activity.show();
    }
    //推广赚钱页面
    goExtension() {
        // if (this.isShowDirectly == 2) {
        //     LoginEnter(dialog_agent_manager.show);
        // } else if (this.isShowDirectly == 1) 
        LoginEnter(page_extension.show);
    }
    /**打开登录页面 */
    handlerLogin() {
        dialog_login.show();
    }
    /**打开注册页面 */
    handlerRegister() {
        dialog_register.show();
    }
    /**锚点跳转 */
    goAnchor(id: string) {
        if (this.routerPath != "/") this.goHome();
        setTimeout(() => {
            const anchor: any = document.getElementById(id);
            if (anchor) {
                ScrollUtil(anchor.offsetTop);
            }
        }, 100);
    }
    /**切换语言 */
    onLangChange() {
        window.localStorage.setItem("lang", core.lang);
        location.reload();
    }

    onService() {
        const link = LangUtil("客服链接") + "?id=" + core.user_id;
        try {
            window.open(
                link,
                LangUtil("客服"),
                "height=680, width=680, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
            );
        } catch (e: any) {
            OpenLink(link);
        }
    }

    scrollHandle() {
        this.categoryActive = -1;
        if (!this.$vuetify.breakpoint.mobile) {
            const len = this.pageData.lobbyIndex.length;
            for (let i = 0; i < len; i++) {
                const item = this.pageData.lobbyIndex[i];
                const div = document.getElementById(item.category.toString());
                if (div) {
                    const rect = div.getBoundingClientRect();
                    if (rect.top <= 250 && rect.bottom - 50 > 155) {
                        this.categoryActive = i;
                        break;
                    }
                }
            }
        }
    }

    @Watch("myProxy.isOpenWalletMenu")
    onWatchMenu(val: boolean) {
        if (!val) {
            this.myProxy.isShowWalletTip = false;
        }
    }

    onConnect() {
        if (this.$vuetify.breakpoint.mobile) {
            const a = document.createElement("a"); //创建a标签
            a.setAttribute("href", GameConfig.config.ThirdLoginUrl);
            a.setAttribute("target", "_blank");
            document.body.appendChild(a);
            a.click(); //执行当前对象
        } else {
            const left: number = (document.body.clientWidth - 420) / 2;
            const top: number = (document.body.clientHeight - 540) / 2;
            window.open(
                GameConfig.config.ThirdLoginUrl,
                "",
                `height=540, width=420, top=${top}, left=${left}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no`
            );
        }
    }
}
