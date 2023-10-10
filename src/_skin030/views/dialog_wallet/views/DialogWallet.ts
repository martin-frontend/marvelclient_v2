import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogWalletMediator from "../mediator/DialogWalletMediator";
import DialogWalletProxy from "../proxy/DialogWalletProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogWallet extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogWalletProxy = this.getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    core = core;
    listQuery = this.pageData.listQuery;
    listOptions = this.pageData.listOptions;

    constructor() {
        super(DialogWalletMediator);
    }
    typechange = 0;

    get walletType(): number[] {
        let list = [0, 1, 2];
        //@ts-ignore
        const myWalletTab = GameConfig.config["myWalletTab"];
        if (myWalletTab && myWalletTab.length > 0) {
            list = myWalletTab;
        }
        return list;
    }

    isShowTip(idx: number): boolean {
        return this.walletType.includes(idx);
    }
    /**图标时间选择 */
    onBtnChange(val: any) {
        this.pageData.tabIndex = parseInt(val);
        this.onTabClick(this.pageData.tabIndex);
    }

    onTabClick(tabIndex: number) {
        this.pageData.tabIndex = tabIndex;
        if (tabIndex == 2) {
            this.myProxy.api_user_show_var_gold();
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
            if (!this.isShowTip(this.pageData.tabIndex)) {
                this.myProxy.pageData.tabIndex = this.walletType[0];
            }
        } else {
            this.typechange = this.myProxy.pageData.tabIndex;
        }
    }

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
}
