import dialog_record_recharge from "@/_skin004/views/dialog_record_recharge";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
export default class DialogRechargeBankchargeProxy extends puremvc.Proxy {
    static NAME = "DialogRechargeBankchargeProxy";

    pageData = {
        loading: false,
        bShow: false,
        fixcontent: ["1234567894564654654", "小李子", "中国银行", "北京支行", "3000", ""],
        list: [],
        bankTransInfo: <any>{},
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    init() {
        const { account, account_name, bank, account_bank } = this.pageData.bankTransInfo.payment_method;
        this.pageData.fixcontent[0] = account;
        this.pageData.fixcontent[1] = account_name;
        this.pageData.fixcontent[2] = bank;
        this.pageData.fixcontent[3] = account_bank;
        this.pageData.fixcontent[4] = this.pageData.bankTransInfo.amount;
        this.pageData.fixcontent[5] = "";
    }
    set_user_var_coin_recharge_confirm(data: any) {
        this.pageData.bShow = false;
        dialog_record_recharge.show();
        // dialog_message.info(LangUtil("复制成功"));
    }
    api_user_var_coin_recharge_confirm() {
        const str = this.pageData.fixcontent[5];
        const reg = /^[\u4E00-\u9FA5]+$/;
        if (reg.test(str) && str.length > 1) {
            this.sendNotification(net.HttpType.api_user_var_coin_recharge_confirm, {
                user_id: core.user_id,
                order_no: this.pageData.bankTransInfo.order_no,
                user_recharge_certificate: str,
            });
        } else {
            dialog_message.info(LangUtil("请输入正确的支付凭证"));
        }
    }
}
