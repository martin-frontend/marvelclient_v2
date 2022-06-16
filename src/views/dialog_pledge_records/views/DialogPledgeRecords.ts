import AbstractView from "@/core/abstract/AbstractView";
import Assets from "@/assets/Assets";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import dialog_message from "@/views/dialog_message";
import { Watch, Component } from "vue-property-decorator";
import DialogPledgeRecordsMediator from "../mediator/DialogPledgeRecordsMediator";
import DialogPledgeRecordsProxy from "../proxy/DialogPledgeRecordsProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PageBonusProxy from "@/views/page_bonus/proxy/PageBonusProxy";
import LangUtil from "@/core/global/LangUtil";
import GlobalVar from "@/core/global/GlobalVar";
import { handleScroll } from "@/core/global/Functions";

@Component
export default class DialogPledgeRecords extends AbstractView {
    myProxy: DialogPledgeRecordsProxy = this.getProxy(DialogPledgeRecordsProxy);
    bonusProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    plat_stake_info = this.bonusProxy.plat_stake_info;
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    GamePlatConfig = GamePlatConfig;
    LangUtil = LangUtil;
    handleScroll = handleScroll;
    scrollStatus = GlobalVar.scrollStatus;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogPledgeRecordsMediator);
    }

    onTabClick(cate: number) {
        this.listQuery.page_count = 1;
        if (cate != this.listQuery.cate) {
            this.listQuery.cate = cate;
            this.myProxy.api_user_var_stake_log(cate);
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_stake_log(this.listQuery.cate);
        }
    }

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_stake_log(this.listQuery.cate);
        }
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 150;
        } else {
            return 450;
        }
    }

    get deListHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 150;
        } else {
            return 450;
        }
    }

    /**分页 */
    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_stake_log(this.listQuery.cate);
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    getDateTime(data: any) {
        // 2022-05-25 18:51:10
        const md = `${data.split(" ")[0].split("-")[1]}-${data.split(" ")[0].split("-")[2]}`;
        const ti = data.split(" ")[1];
        return `${md} ${ti}`;
    }
}
