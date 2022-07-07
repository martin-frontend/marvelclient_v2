import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogAddressBookMediator from "../mediator/DialogAddressBookMediator";
import DialogAddressBookProxy from "../proxy/DialogAddressBookProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import dialog_address_book_remark from "@/views/dialog_address_book_remark";

@Component
export default class DialogAddressBook extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogAddressBookProxy = this.getProxy(DialogAddressBookProxy);
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
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            BlurUtil(this.pageData.bShow);
        }
    }

    onEdit(item: any) {
        dialog_address_book_remark.show();
    }

    onDelete(item: any) {
        //
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
}
