import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookMediator from "../mediator/DialogAddressBookMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";

@Component
export default class DialogAddressBook extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookProxy = this.getProxy(DialogAddressBookProxy);
    //addressBookRemark: DialogAddressBookRemarkProxy = this.getProxy(DialogAddressBookRemarkProxy);
    addressBookRemark = PanelUtil.getProxy_address_book_remark;
    rechargeProxy = PanelUtil.getProxy_recharge;
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    plat_coins = GamePlatConfig.config.plat_coins;

    get payment_method_type() {
        return this.rechargeProxy.exchangeProxy.pageData.form.payment_method_type;
    }

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

    onAddress(payment_method: any) {
        //this.myProxy.pageData.bShow = false;
        this.onClose();
        if (this.payment_method_type == 8) {
            const index = this.rechargeProxy.exchangeProxy.pix_key_option.findIndex(({ key }) => key == payment_method.type);
            if (index !== -1) {
                this.rechargeProxy.exchangeProxy.pix_key_select = index;
                this.rechargeProxy.exchangeProxy.showRequires[0].inputValue = payment_method.name;
                this.rechargeProxy.exchangeProxy.curPixkeyItem.inputValue =
                    payment_method.type == 2 ? payment_method.pix_key.substring(3, payment_method.pix_key.length) : payment_method.pix_key;
                this.rechargeProxy.exchangeProxy.onBlurInput_option();
                this.rechargeProxy.exchangeProxy.onBlurInput(this.rechargeProxy.exchangeProxy.showRequires[0]);
            }
        } else {
            this.rechargeProxy.exchangeProxy.pageData.form.account = payment_method.account;
        }
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
        PanelUtil.message_confirm({
            message: LangUtil("是否删除纪录"),
            okFun: () => {
                this.pageData.loading = true;
                this.addressBookRemark.onDelete(item.id);
            },
        });
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    convertPixType(type: any) {
        const obj = this.rechargeProxy.exchangeProxy.pix_key_option.find(({ key }) => type == key);
        return obj ? obj.name : "";
    }
}
