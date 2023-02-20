import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogWalletMediator from "../mediator/DialogWalletMediator";
import DialogWalletProxy from "../proxy/DialogWalletProxy";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogWallet extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogWalletProxy = this.getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogWalletMediator);
    }
    typechange=0;

    /**图标时间选择 */
    onTimeChange(val: any) {
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
    }
}
