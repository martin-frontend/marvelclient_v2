import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogGoogleSettingsMediator from "../mediator/DialogGoogleSettingsMediator";
import DialogGoogleSettingsProxy from "../proxy/DialogGoogleSettingsProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import OpenLink from "@/core/global/OpenLink";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogGoogleSettings extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoogleSettingsProxy = this.getProxy(DialogGoogleSettingsProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    userInfo = this.selfProxy.userInfo;
    pageData = this.myProxy.pageData;
    isIos = core.isIOS();

    constructor() {
        super(DialogGoogleSettingsMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    handlerNextStep() {
        PanelUtil.openpanel_bind_google();
        this.onClose();
    }

    onGetIosLink() {
        const link = LangUtil("iosgoogle验证下载");
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

    onGetAndroidLink() {
        const link = LangUtil("androidgoogle验证下载");
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

    handlerUpdate(val: any) {
        this.selfProxy.api_user_update_var({ is_login_need_google: val.toString() });
    }

    handlerCopy() {
        CopyUtil(this.pageData.list.google_key);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_google_key();
        }
    }
}
