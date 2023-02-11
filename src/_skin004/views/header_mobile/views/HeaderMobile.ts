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
import AppProxy from "@/_skin004/AppProxy";
import dialog_recharge from "@/_skin004/views/dialog_recharge";
import dialog_email from "@/_skin004/views/dialog_email";
import SelfProxy from "@/proxy/SelfProxy";
@Component
export default class HeaderMobile extends AbstractView {
    LangUtil = LangUtil;
    LangConfig = LangConfig;
    core = core;
    myProxy: HeaderMobileProxy = this.getProxy(HeaderMobileProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    appProxy :AppProxy = this.getProxy(AppProxy);
    routerPath = this.$router.app.$route.path;

    red_dot_tips = this.selfProxy.red_dot_tips;

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

    isdownloadShow = true;
    
    
    public get isshowTop() : boolean {
        return this.isdownloadShow && this.appProxy.isShowGuide;
    }
    
    onClose()
    {
        this.isdownloadShow = false;
    }

    public get guideText() : string {
        return this.appProxy.guideText;
    }

    onGuide()
    {
        this.appProxy.onGuide();
    }
    
    onCoinIn() {
        dialog_recharge.show();
    }
    onCoinOut() {
        dialog_recharge.show(1);
    }
    openMail()
    {
        dialog_email.show();
    }
    
}
