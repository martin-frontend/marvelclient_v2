import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookRemarkMediator from "../mediator/DialogAddressBookRemarkMediator";
import DialogAddressBookRemarkProxy from "../proxy/DialogAddressBookRemarkProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogAddressBookRemark extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookRemarkProxy = this.getProxy(DialogAddressBookRemarkProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogAddressBookRemarkMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
        }
    }
}
