import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogSpeedVerificationMediator from "../mediator/DialogSpeedVerificationMediator";
import DialogSpeedVerificationProxy from "../proxy/DialogSpeedVerificationProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import Assets from "@/_skin030/assets/Assets";
@Component
export default class DialogSpeedVerification extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogSpeedVerificationProxy = this.getProxy(DialogSpeedVerificationProxy);
    pageData = this.myProxy.pageData;

    sliderText = LangUtil("向右滑动");
    constructor() {
        super(DialogSpeedVerificationMediator);
    }
    sliderimgs = Assets.verityImgArr;
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
            this.$nextTick(() => {
                //@ts-ignore
                if (this.$refs.sliderVerifyBlock) this.$refs.sliderVerifyBlock.reset();
            });
        }
    }

    @Watch("pageData.verification")
    onChangePos() {
        if (this.$refs.sliderVerifyBlock) {
            //@ts-ignore
            this.$refs.sliderVerifyBlock.refresh();
        }
    }
    onsuccess(value: any) {
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
