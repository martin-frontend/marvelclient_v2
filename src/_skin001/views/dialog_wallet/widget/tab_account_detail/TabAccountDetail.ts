import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";
@Component
export default class TabAccountDetail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    listOptions = this.pageData.listOptions;

    commonIcon = Assets.commonIcon;

    onTimeChange() {
        this.pageData.list = [];
        this.listQuery.page_count = 1;
        switch (this.listOptions.timeSelect) {
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
        this.pageData.list = [];
        this.listQuery.page_count = 1;
        if (this.listOptions.coinSelect == 0) {
            this.listQuery.coin_name_unique = null;
        } else {
            this.listQuery.coin_name_unique = this.listOptions.coinOptions()[this.listOptions.coinSelect];
        }
        this.myProxy.api_user_show_var_gold();
    }

    onTypeChange() {
        this.pageData.list = [];
        this.listQuery.page_count = 1;
        if (this.listOptions.typeSelect == 0) {
            this.listQuery.type = 0;
        } else {
            this.listQuery.type = this.listOptions.typeSelect;
        }
        this.myProxy.api_user_show_var_gold();
    }

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_show_var_gold();
        }
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_show_var_gold();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
