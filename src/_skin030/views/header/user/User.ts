import AbstractView from "@/core/abstract/AbstractView";
import SelfProxy from "@/proxy/SelfProxy";
import Assets from "@/_skin030/assets/Assets";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import PageBlur from "@/_skin030/core/PageBlur";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import SkinVariable from "@/_skin030/core/SkinVariable";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class User extends AbstractView {
    @Prop({ default: false }) isShowFull!: boolean;
    commonIcon = Assets.commonIcon;
    //selfProxy = PanelUtil.getProxy_selfproxy;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;
    platUsersVerificationProxy = PanelUtil.getProxy_get_platUsersVerificationProxy;

    IsShow_VipInfo = ModulesHelper.IsShow_VipInfo();
    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        // PageBlur.blur_mainpage(this.isFilterChange,false );
        PageBlur.blur_novigation(this.isFilterChange, false);
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }
    showUserPanel(val: boolean) {
        console.log("点击s-----s");
        // PanelUtil.appproxy.setUserPanelShow(val);
        if (val) {
            if (SkinVariable.isShowPlatUsersVerification && GamePlatConfig.config.is_user_verification.is_open) {
                this.platUsersVerificationProxy.api_user_var_plat_users_verification_show();
            }
        }
    }
}
