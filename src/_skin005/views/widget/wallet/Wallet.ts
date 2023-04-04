import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import router from "@/router";
import PageBlur from "@/_skin005/core/PageBlur";
import PanelUtil from "@/_skin005/core/PanelUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Wallet extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    GlobalVar = GlobalVar;
    GamePlatConfig = GamePlatConfig;

    onItemClick(key: string) {
        this.gameProxy.setCoin(key);
        //PanelUtil.openpage_game_play();
        if (this.$route.path.includes( "page_game_play")   ) {
            this.gameProxy.api_vendor_var_ori_product_show_var(this.gameProxy.currGame);
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        console.log("  user 修改值" ,this);
        // PageBlur.blur_mainpage(this.isFilterChange,false );
        PageBlur.blur_novigation(this.isFilterChange,false );
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }
    
    onCoinIn() {
        PanelUtil.openpanel_recharge();
    }

    handlerGameRate() {
        PanelUtil.openpanel_game_rate();
    }
    
    
    public get content_class() : string {
        if (this.$vuetify.breakpoint.mobile) {
            return "menu transform_mob";
        }
        else {
            return "menu";
        } 
    }
    
    public get isShowTips() : boolean {

        // if (this.$vuetify.breakpoint.xsOnly) {
        //     return false;
        // }
        // else {
            return true;
        // }
    }
    
    public get isShowRecharge() : boolean {
        return GlobalVar.instance.isShowRecharge || (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98 );
    } 
}
