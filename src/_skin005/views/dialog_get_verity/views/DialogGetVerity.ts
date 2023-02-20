import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Watch } from "vue-property-decorator";
import DialogGetVerityMediator from "../mediator/DialogGetVerityMediator";
import DialogGetVerityProxy from "../proxy/DialogGetVerityProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogGetVerity extends AbstractView {
    @Prop() category!:number;
    @Prop() type!:number;
    @Prop() email!:string;
    @Prop() area_code!:string;
    @Prop() mobile!:string;
    @Prop({ default: false }) isCheck!: boolean;
    LangUtil = LangUtil;
    myProxy: DialogGetVerityProxy = this.getProxy(DialogGetVerityProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogGetVerityMediator);
    }

    mounted(){
        this.pageData.category = this.category;
        this.pageData.form.type = this.type;
        this.pageData.form.email = this.email;
        this.pageData.form.area_code = this.area_code;
        this.pageData.form.mobile = this.mobile;
    }

    @Watch("category")
    onWatchCategory(){
        this.pageData.category = this.category;
    }
    @Watch("type")
    onWatchType(){
        this.pageData.form.type = this.type;
    }
    @Watch("email")
    onWatchEmail(){
        this.pageData.form.email = this.email;
    } 
    @Watch("area_code")
    onWatchAreaCode(){
        this.pageData.form.area_code = this.area_code;
    }
    @Watch("mobile")
    onWatchMobile(){
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
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.getVerity();
        }
    }
    isshow=false;
    onBtnClick()
    {
        this.isshow = !this.isshow;
    }
}
