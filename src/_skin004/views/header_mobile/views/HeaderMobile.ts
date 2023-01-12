import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import HeaderMobileMediator from "../mediator/HeaderMobileMediator";
import HeaderMobileProxy from "../proxy/HeaderMobileProxy";
import LangUtil from "@/core/global/LangUtil";
import LangConfig from "@/core/config/LangConfig";
import dialog_login from "@/_skin004/views/dialog_login";
import dialog_register from "@/_skin004/views/dialog_register";
import dialog_notice from "../../dialog_notice";
import ServiceUtil from "@/_skin004/core/global/ServiceUtil";

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
    onLangChange(key:any) {
        window.localStorage.setItem("lang", key);
        location.reload();
    }
    /**公告 */
    onNoticeShow()
    {
        dialog_notice.show();
    }
    onService() {
        ServiceUtil();
    }
}
