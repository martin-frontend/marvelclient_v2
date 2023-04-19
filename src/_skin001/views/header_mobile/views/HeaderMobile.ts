import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import HeaderMobileMediator from "../mediator/HeaderMobileMediator";
import HeaderMobileProxy from "../proxy/HeaderMobileProxy";
import LangUtil from "@/core/global/LangUtil";
import LangConfig from "@/core/config/LangConfig";
import OpenLink from "@/core/global/OpenLink";
import dialog_login from "@/views/dialog_login";
import dialog_register from "@/views/dialog_register";

@Component
export default class HeaderMobile extends AbstractView {
    LangUtil = LangUtil;
    LangConfig = LangConfig;
    core = core;
    myProxy: HeaderMobileProxy = this.getProxy(HeaderMobileProxy);
    pageData = this.myProxy.pageData;

    routerPath = this.$router.app.$route.path;

    constructor() {
        super(HeaderMobileMediator);
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    /**打开登录页面 */
    handlerLogin() {
        dialog_login.show();
    }
    /**打开注册页面 */
    handlerRegister() {
        dialog_register.show();
    }

    /**切换语言 */
    onLangChange(key: any) {
        window.localStorage.setItem("lang", key);
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
}
