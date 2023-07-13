import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogSpeedVerificationMediator from "../mediator/DialogSpeedVerificationMediator";
import DialogSpeedVerificationProxy from "../proxy/DialogSpeedVerificationProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
@Component
export default class DialogSpeedVerification extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpeedVerificationProxy = this.getProxy(DialogSpeedVerificationProxy);
    pageData = this.myProxy.pageData;

    sliderText = LangUtil("向右滑动");
    constructor() {
        super(DialogSpeedVerificationMediator);
    }
    sliderimgs = [
        require(`@/_skin005/assets/verify/bg_1.jpg`),
        require(`@/_skin005/assets/verify/bg_2.jpg`),
        require(`@/_skin005/assets/verify/bg_3.jpg`),
        require(`@/_skin005/assets/verify/bg_4.jpg`),
        require(`@/_skin005/assets/verify/bg_5.jpg`),
        require(`@/_skin005/assets/verify/bg_6.jpg`),
        require(`@/_skin005/assets/verify/bg_7.jpg`),
        require(`@/_skin005/assets/verify/bg_8.jpg`),
        require(`@/_skin005/assets/verify/bg_9.jpg`),
        require(`@/_skin005/assets/verify/bg_10.jpg`),
    ];
    closeHandle = 0;
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
        if (this.closeHandle) {
            clearTimeout(this.closeHandle);
            this.closeHandle = 0;
        }
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (this.closeHandle) {
                clearTimeout(this.closeHandle);
                this.closeHandle = 0;
            }
            this.$nextTick(()=>{
                //@ts-ignore
                if (this.$refs.sliderVerifyBlock) this.$refs.sliderVerifyBlock.reset();
            });
        }
    }

    onsuccess(value:any) {
        // if (this.myProxy.pageData.successCallback) {
        //     this.myProxy.pageData.successCallback();
        // }
        this.closeHandle = setTimeout(() => {
            if (this.myProxy.pageData.successCallback) {
                this.myProxy.pageData.successCallback(value);
            }
            this.onClose();
        }, 500);
    }
    onfail() {
        this.sliderText = LangUtil("校验失败，请向右滑动完成验证！");
        // this.closeHandle = setTimeout(() => {
        if (this.myProxy.pageData.failCallback) {
            this.myProxy.pageData.failCallback();
        }
        //     this.onClose();
        // }, 500);
    }
    onRefresh() {
        console.log("刷新");
    }
}
