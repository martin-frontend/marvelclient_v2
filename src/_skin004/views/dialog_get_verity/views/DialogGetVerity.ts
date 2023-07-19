import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import DialogSpeedVerification from "@/_skin004/views/dialog_speed_verification";

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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            if (!this.isDragAuth) this.getVerity();
            // else this.myProxy.api_public_auth_drag();
        }
    }

    @Watch("pageData.verification")
    onWatchRefresh() {
        if (this.$refs.sliderVerifyBlock) {
            console.log("刷新---");
            //@ts-ignore
            this.$refs.sliderVerifyBlock.reset();
        }
    }
    onbtnClick() {
        console.log("----点击-----");
        // this.myProxy.api_public_auth_drag();
        // if (this.isDragAuth) {
        //     const that = this;
        //     const successFun = function (val: any) {
        //         that.myProxy.pageData.form.auth_code = val;
        //         that.onSend();
        //     };
        //     const failFun = function () {
        //         that.myProxy.api_public_auth_drag();
        //     };
        //     that.myProxy.api_public_auth_drag();
        //     DialogSpeedVerification.show(successFun, failFun, this.myProxy.pageData.verification);
        //     return;
        // }
        if (this.isDragAuth) {
            this.myProxy.api_public_auth_drag();
        }
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
}
