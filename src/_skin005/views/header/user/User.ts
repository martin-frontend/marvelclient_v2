import AbstractView from "@/core/abstract/AbstractView";
import SelfProxy from "@/proxy/SelfProxy";
import Assets from "@/_skin005/assets/Assets";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import PageBlur from "@/_skin005/core/PageBlur";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class User extends AbstractView {
    @Prop({ default: false }) isShowFull!: boolean;
    commonIcon = Assets.commonIcon;
    //selfProxy = PanelUtil.getProxy_selfproxy;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;

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
    showUserPanel() {
        console.log("点击s-----s");
        PanelUtil.appproxy.setUserPanelShow(true);
    }
}
