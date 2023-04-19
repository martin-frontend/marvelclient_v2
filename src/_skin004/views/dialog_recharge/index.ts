import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "./proxy/DialogRechargeProxy";
import DialogRecharge from "./views/DialogRecharge.vue";
import DialogMount from "@/core/global/DialogMount";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";
import dialog_safety_center from "@/_skin004/views/dialog_safety_center";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

function show(tabIndex: number = 0) {
    const selfProxy: SelfProxy = getProxy(SelfProxy);
    const is_bind_phone_recharge = GamePlatConfig.config.is_bind_phone_recharge;
    if (is_bind_phone_recharge && is_bind_phone_recharge.is_open == 1 && !selfProxy.userInfo.phone) {
        dialog_message_box.confirm({ message: LangUtil("该账号未绑定手机，不能打开充值页面"), okFun: dialog_safety_center.show });
        return;
    }
    DialogMount(DialogRecharge);
    const proxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    proxy.pageData.tabIndex = tabIndex;
    proxy.pageData.bShow = true;

    if (
        (selfProxy.userInfo.is_recharge != 1 && tabIndex == 0) ||
        (selfProxy.userInfo.is_exchange != 1 && tabIndex == 1) ||
        (selfProxy.userInfo.is_gold_transfer != 1 && tabIndex == 2)
    ) {
        if (selfProxy.userInfo.is_recharge == 1) {
            proxy.pageData.tabIndex = 0;
        } else if (selfProxy.userInfo.is_exchange == 1) {
            proxy.pageData.tabIndex = 1;
        } else if (selfProxy.userInfo.is_gold_transfer == 1) {
            proxy.pageData.tabIndex = 2;
        } else {
            proxy.pageData.tabIndex = -1;
        }
    }
    console.log(".>>>>>>>>>>>>>>>", proxy.pageData.tabIndex);

    proxy.exchangeProxy.pageData.form.account = "";
    proxy.exchangeProxy.pageData.form.amount = "";
    proxy.exchangeProxy.api_user_var_exchange_method_list();
    proxy.rechargeProxy.api_user_var_recharge_method_list();
}

export default { show };
