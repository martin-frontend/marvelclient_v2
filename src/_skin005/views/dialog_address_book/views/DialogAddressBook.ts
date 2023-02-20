import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookMediator from "../mediator/DialogAddressBookMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";


@Component
export default class DialogAddressBook extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookProxy = this.getProxy(DialogAddressBookProxy);
    //addressBookRemark: DialogAddressBookRemarkProxy = this.getProxy(DialogAddressBookRemarkProxy);
    addressBookRemark = PanelUtil.getProxy_address_book_remark;
    rechargeProxy = PanelUtil.getProxy_recharge
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    plat_coins = GamePlatConfig.config.plat_coins;

    constructor() {
        super(DialogAddressBookMediator);
    }

    onChange(value: any) {
        const keys = Object.keys(this.pageData.methodList[this.listQuery.coin_name_unique].options);
        this.listQuery.block_network_id = keys[0];
        this.listQuery.coin_name_unique = value;
        this.myProxy.api_user_var_payment_method_index();
    }

    onChangeSub(value: any) {
        this.listQuery.block_network_id = value;
        this.myProxy.api_user_var_payment_method_index();
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    onAddress(address: any) {
        this.myProxy.pageData.bShow = false;
        this.rechargeProxy.exchangeProxy.pageData.form.account = address;
    }

    @Watch("pageData.bShow")
    onWatchShow() {

        PageBlur.blur_page(this.pageData.bShow);

    }

    onEdit(item: any) {
        this.addressBookRemark.setRemark(item);
        //dialog_address_book_remark.show();
        PanelUtil.openpanel_address_book_remark();
    }

    onDelete(item: any) {
        this.pageData.loading = true;
        this.addressBookRemark.onDelete(item.id)
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
