import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Constant from "@/core/global/Constant";
import { handleScroll } from "@/core/global/Functions";
import { Watch, Component } from "vue-property-decorator";
import DialogBetRecordMediator from "../mediator/DialogBetRecordMediator";
import DialogBetRecordProxy from "../proxy/DialogBetRecordProxy";

@Component
export default class DialogBetRecord extends AbstractView {
    myProxy: DialogBetRecordProxy = this.getProxy(DialogBetRecordProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    commonIcon = Assets.commonIcon;

    get typeOptions() {
        return {
            0: "全部类型",
            2: "棋牌",
            4: "彩票",
            8: "捕鱼",
            16: "电子",
            32: "真人",
            64: "体育",
            128: "电竞",
        };
    }

    get vendorOptions() {
        const options: any = { 0: "全部厂商" };
        for (const item of this.pageData.vendors) {
            options[item.vendor_id] = item.vendor_name;
        }
        return options;
    }

    get statusOptions() {
        return {
            0: "全部状态",
            1: "未结算",
            11: "已结算",
            2: "已取消",
        };
    }

    get timeOptions() {
        return Constant.TIME_TYPE;
    }

    typeSelect = 0;
    vendorSelect = 0;
    statusSelect = 0;
    timeSelect = 0;

    constructor() {
        super(DialogBetRecordMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.typeSelect = this.vendorSelect = this.statusSelect = this.timeSelect = 0;
            this.myProxy.resetQuery();
            this.myProxy.api_user_show_var_bet();
        }
    }

    @Watch("pageData.list.length")
    onWatchList() {
        if (this.pageData.list.length > 0) {
            this.handlerScroll();
        }
    }

    handlerScroll() {
        try {
            if (this.$vuetify.breakpoint.xsOnly) {
                this.$nextTick(() => {
                    const target = document.querySelector(".table_data") as HTMLElement;
                    target.removeEventListener("scroll", () => {});
                    target.addEventListener("scroll", () => {
                        handleScroll(target)
                            .then(() => {
                                // todo call api
                            })
                            .catch((err: any) => {
                                console.error(err);
                            });
                    });
                });
            }
        } catch (error) {
            console.log("-", error);
        }
    }

    onTypeChange() {
        if (this.typeSelect == 0) {
            this.listQuery.vendor_type = null;
        } else {
            this.listQuery.vendor_type = this.typeSelect;
        }
        this.myProxy.api_user_show_var_bet();
    }
    onVendorChange() {
        if (this.vendorSelect == 0) {
            this.listQuery.vendor_id = null;
        } else {
            this.listQuery.vendor_id = this.vendorSelect;
        }
        this.myProxy.api_user_show_var_bet();
    }
    onStatusChange() {
        if (this.statusSelect == 0) {
            this.listQuery.settlement_status = null;
        } else {
            this.listQuery.settlement_status = this.statusSelect;
        }
        this.myProxy.api_user_show_var_bet();
    }
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
        this.myProxy.api_user_show_var_bet();
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_show_var_bet();
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 280;
        } else {
            return 368;
        }
    }
}
