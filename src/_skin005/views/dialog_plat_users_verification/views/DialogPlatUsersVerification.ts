import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPlatUsersVerificationMediator from "../mediator/DialogPlatUsersVerificationMediator";
import DialogPlatUsersVerificationProxy from "../proxy/DialogPlatUsersVerificationProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import SkinVariable from "@/_skin005/core/SkinVariable";
import { checkMail, checkOnlyNub, checkPhone, checkUserName, checkUserName1, checkUserPassword, checkVerifyVode } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class DialogPlatUsersVerification extends AbstractView {
    LangUtil = LangUtil;
    SkinVariable = SkinVariable;
    myProxy: DialogPlatUsersVerificationProxy = this.getProxy(DialogPlatUsersVerificationProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    list = this.pageData.list;
    isCheckedForget = false;
    getverityProxy = PanelUtil.getProxy_get_verityProxy;
    checkbox = false;
    checkPhone = checkPhone;

    constructor() {
        super(DialogPlatUsersVerificationMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.pageData.loading = false;
            this.myProxy.resetForm();
            this.myProxy.api_user_var_plat_users_verification_show();
            this.myProxy.api_public_country();
            this.myProxy.api_public_all_area_code();
        }
    }

    onSubmit() {
        this.myProxy.api_user_var_plat_users_verification_save();
    }

    searchCity(country_id: any) {
        if (!country_id) return;
        this.myProxy.api_public_city(country_id);
        this.myProxy.resetForm(false);
        this.setAreaCode(country_id);
    }

    onCountryChange(country_id: any) {
        this.myProxy.resetForm(false);
        this.setAreaCode(country_id);
    }

    setAreaCode(country_id: any) {
        // @ts-ignore
        const obj = this.pageData.areaCodeList.find((item) => item.country_id == country_id);
        if (obj) {
            this.form.area_code = obj.area_code;
        }
    }
    get areaCodeArr(): any {
        return this.myProxy.pageData.areaCodeList;
    }
    get curShowCode(): string {
        return "+" + this.form.area_code;
    }
    customFilter(item: any, queryText: any, itemText: any) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.area_code + "";
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    }

    get isCheck(): boolean {
        if (this.SkinVariable.isShowRestrictions && !this.checkbox) {
            return false;
        }
        const { country, city, verification_name, area_code, mobile, email, verify_code } = this.form;
        return country && city && checkOnlyNub(area_code) && checkUserName1(verification_name) && checkMail(email) && checkPhone(mobile);
    }
    get isdeisable(): boolean {
        if (this.isFormDisabled) return true;
        if (!this.getverityProxy || !this.getverityProxy.pageData || !this.getverityProxy.pageData.downcount) return false;

        console.log(" 获取验证码 中的数据", this.getverityProxy.pageData.downcount);
        return this.getverityProxy.pageData.downcount > 0;
    }

    get isFormDisabled() {
        return this.list.status != 0 && this.list.status != 2;
    }

    get certificationStatus() {
        switch (this.list.status) {
            case 0:
                return { name: "", color: "", icon: "" };
            case 1:
                return { name: LangUtil("认证通过"), color: "success", icon: "mdi-check-circle" };

            case 2:
                return { name: LangUtil("认证失败"), color: "red", icon: "mdi-alert-circle" };

            case 3:
                return { name: LangUtil("审核中"), color: "orange", icon: "mdi-clock" };
            default:
                return {};
        }
    }
}
