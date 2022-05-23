import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import Constant from "@/core/global/Constant";
import getProxy from "@/core/global/getProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";

@Component
export default class TabAccountDetail extends AbstractView {
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    commonIcon = Assets.commonIcon;

    get timeOptions() {
        return Constant.TIME_TYPE;
    }

    get coinOptions() {
        const keys = Object.keys(GamePlatConfig.config.plat_coins);
        keys.unshift("全部币种");
        return keys;
    }

    get typeOptions() {
        const types = {
            0: "全部类型",
        };
        Object.assign(types, GamePlatConfig.enums.user_gold_log_type);
        return types;
    }

    timeSelect = 0;
    coinSelect = 0;
    typeSelect = 0;

    onTimeChange() {
        switch (this.timeSelect) {
            case 0:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
            case 1:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-1), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(0, 1), "yyyy-MM-dd");
                break;
            case 2:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
            case 3:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-29), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
        }
        this.myProxy.api_user_show_var_gold();
    }

    onCoinChange() {
        if (this.coinSelect == 0) {
            this.listQuery.coin_name_unique = null;
        } else {
            this.listQuery.coin_name_unique = this.coinOptions[this.coinSelect];
        }
        this.myProxy.api_user_show_var_gold();
    }

    onTypeChange() {
        if (this.typeSelect == 0) {
            this.listQuery.type = 0;
        } else {
            this.listQuery.type = this.typeSelect;
        }
        this.myProxy.api_user_show_var_gold();
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_show_var_gold();
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 255;
        } else {
            return 368;
        }
    }
}
