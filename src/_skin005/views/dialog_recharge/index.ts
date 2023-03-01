import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "./proxy/DialogRechargeProxy";
import DialogRecharge from "./views/DialogRecharge.vue";
import DialogMount from "@/core/global/DialogMount";
import GlobalVar from "@/core/global/GlobalVar";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

const proxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
function show(tabIndex: number = 0) {
    DialogMount(DialogRecharge);
    hidden(false);
    proxy.show();

    proxy.exchangeProxy.pageData.form.account = "";
    proxy.exchangeProxy.pageData.form.amount = "";

    //三个都不显示 则关闭当前界面
    if (!GlobalVar.instance.isShowRecharge && !GlobalVar.instance.isShowExchange && !GlobalVar.instance.isShowTransfer) {
        proxy.pageData.bShow = false
        MultDialogManager.onClosePanel();
        return
    }
    proxy.exchangeProxy.api_user_var_exchange_method_list();
    proxy.rechargeProxy.api_user_var_recharge_method_list();

    if (tabIndex == 0) {
        if (!GlobalVar.instance.isShowRecharge) {
            tabIndex = 1;
        }

        if (!GlobalVar.instance.isShowExchange) {
            tabIndex = 11;
        }
    }
    else if (tabIndex == 1) {
        if (!GlobalVar.instance.isShowExchange) {
            tabIndex = 0;
        }

        if (!GlobalVar.instance.isShowRecharge) {
            tabIndex = 11;
        }
    }
    else if (tabIndex == 11) {
        if (!GlobalVar.instance.isShowTransfer) {
            tabIndex = 0;
        }

        if (!GlobalVar.instance.isShowRecharge) {
            tabIndex = 1;
        }
    }
    proxy.pageData.tabIndex = tabIndex;

}



function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
