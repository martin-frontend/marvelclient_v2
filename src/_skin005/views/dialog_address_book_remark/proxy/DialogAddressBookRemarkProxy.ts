import { objectRemoveNull } from "@/core/global/Functions";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
export default class DialogAddressBookRemarkProxy extends puremvc.Proxy {
    static NAME = "DialogAddressBookRemarkProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            id: 0,
            type: 4,
            coin_name_unique: "",
            block_network_id: "",
            account: "",
            account_name: "",
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    setRemark(data: any) {
        this.pageData.listQuery.id = data.id;
        this.pageData.listQuery.account = data.payment_method.account;
        this.pageData.listQuery.account_name = data.payment_method.account_name;
        this.pageData.listQuery.coin_name_unique = data.coin_name_unique;
        this.pageData.listQuery.block_network_id = data.block_network_id;
    }

    /**删除数据 */
    onDelete(id: any) {
        this.sendNotification(net.HttpType.api_user_var_payment_method_update_var, { user_id: core.user_id, id, is_delete: 1 });
    }

    api_user_var_payment_method_update_var() {
        const obj: any = {
            ...this.pageData.listQuery,
            user_id: core.user_id,
            id: this.pageData.listQuery.id,
        };
        this.sendNotification(net.HttpType.api_user_var_payment_method_update_var, objectRemoveNull(obj));
    }
}
