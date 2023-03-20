import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogBankcardInfoMediator from "../mediator/DialogBankcardInfoMediator";
import DialogBankcardInfoProxy from "../proxy/DialogBankcardInfoProxy";
import LangUtil from "@/core/global/LangUtil";
import DialogAddressBookRemarkProxy from "../../dialog_address_book_remark/proxy/DialogAddressBookRemarkProxy";
import dialog_address_book_remark from "../../dialog_address_book_remark";
import DialogRechargeProxy from "@/_skin101/views/dialog_recharge/proxy/DialogRechargeProxy";

@Component
export default class DialogBankcardInfo extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogBankcardInfoProxy = this.getProxy(DialogBankcardInfoProxy);
    pageData = this.myProxy.pageData;
    addressBookRemark: DialogAddressBookRemarkProxy = this.getProxy(DialogAddressBookRemarkProxy);
    rechargeProxy: DialogRechargeProxy = this.getProxy(DialogRechargeProxy);

    constructor() {
        super(DialogBankcardInfoMediator);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }

    onEdit(item: any) {
        this.addressBookRemark.setRemark(item);
        dialog_address_book_remark.show();
    }

    onDelete(item: any) {
        this.pageData.loading = true;
        this.addressBookRemark.onDelete(item.id);
    }
    onAddress(item: any) {
        this.myProxy.pageData.bShow = false;
        //设置  姓名 和   卡号
        this.rechargeProxy.exchangeProxy.pageData.form.account = item.payment_method.account;
        this.rechargeProxy.exchangeProxy.pageData.form.account_name = item.payment_method.account_name;
        //设置 银行名字 和银行id
        this.rechargeProxy.exchangeProxy.setCurBankInfo(item.payment_method.bank_id);
    }
}
