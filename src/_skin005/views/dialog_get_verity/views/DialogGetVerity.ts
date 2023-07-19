import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import Assets from "@/_skin005/assets/Assets";

@Component
export default class DialogGetVerity extends AbstractView {
    @Prop() category!: number;
    @Prop() type!: number;
    @Prop() email!: string;
    @Prop() area_code!: string;
    @Prop() mobile!: string;
    @Prop({ default: false }) isCheck!: boolean;
    LangUtil = LangUtil;
    myProxy: DialogGetVerityProxy = this.getProxy(DialogGetVerityProxy);
    pageData = this.myProxy.pageData;
    sliderimgs = Assets.verityImgArr;
    constructor() {
        super(DialogGetVerityMediator);
    }

    mounted() {
        this.pageData.category = this.category;
        this.pageData.form.type = this.type;
        this.pageData.form.email = this.email;
        this.pageData.form.area_code = this.area_code;
        this.pageData.form.mobile = this.mobile;
    }

    @Watch("category")
    onWatchCategory() {
        this.pageData.category = this.category;
    }
    @Watch("type")
    onWatchType() {
        this.pageData.form.type = this.type;
    }
    @Watch("email")
    onWatchEmail() {
        this.pageData.form.email = this.email;
    }
    @Watch("area_code")
    onWatchAreaCode() {
        this.pageData.form.area_code = this.area_code;
    }
    @Watch("mobile")
    onWatchMobile() {
        this.pageData.form.mobile = this.mobile;
    }

    getVerity() {
        this.myProxy.api_public_auth_code();
    }

    onSend() {
        if (this.pageData.category == 0) {
            this.myProxy.api_public_email_send();
        } else {
            this.myProxy.api_public_sms_send();
        }
    }

    onClose() {
        this.pageData.bShow = false;
        //MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.closeHandle) {
            clearTimeout(this.closeHandle);
            this.closeHandle = 0;
        }
        if (this.pageData.bShow) {
            if (this.isDragAuth) {
                this.myProxy.api_public_auth_drag();
            } else this.getVerity();
        }
    }
    isshow = false;
    onBtnClick() {
        this.isshow = !this.isshow;
    }
    closeHandle = 0;
    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }
    sliderText = LangUtil("向右滑动");
    onsuccess(value: any) {
        this.myProxy.pageData.form.auth_code = value;
        this.onSend();
        this.closeHandle = setTimeout(() => {
            this.onClose();
        }, 500);
    }
    onfail() {
        this.sliderText = LangUtil("校验失败，请向右滑动完成验证！");
        // this.closeHandle = setTimeout(() => {
        // if (this.myProxy.pageData.failCallback) {
        //     this.myProxy.pageData.failCallback();
        // }
        //     this.onClose();
        // }, 500);
        this.myProxy.api_public_auth_drag();
    }
    onRefresh() {
        console.log("刷新");
        this.myProxy.api_public_auth_drag();
    }

    @Watch("pageData.verification")
    onWatchRefresh() {
        if (this.$refs.sliderVerifyBlock) {
            console.log("刷新---");
            //@ts-ignore
            this.$refs.sliderVerifyBlock.reset();
        }
    }
}
