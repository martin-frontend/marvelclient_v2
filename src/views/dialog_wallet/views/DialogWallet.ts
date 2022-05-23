import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogWalletMediator from "../mediator/DialogWalletMediator";
import DialogWalletProxy from "../proxy/DialogWalletProxy";

@Component
export default class DialogWallet extends AbstractView {
    myProxy: DialogWalletProxy = this.getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogWalletMediator);
    }

    onTabClick(tabIndex:number){
        this.pageData.tabIndex = tabIndex;
        if(tabIndex == 2){
            this.myProxy.api_user_show_var_gold();
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
}
