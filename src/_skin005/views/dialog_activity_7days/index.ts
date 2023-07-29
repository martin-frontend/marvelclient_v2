import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivity7daysProxy from "./proxy/DialogActivity7daysProxy";
import DialogActivity7days from "./views/DialogActivity7days.vue";

const proxy: DialogActivity7daysProxy = getProxy(DialogActivity7daysProxy);
function show(data:any) {
    DialogMount(DialogActivity7days);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
    proxy.resetRechargeActivityData();
    // proxy.api_plat_activity_var_rule_id_var();
    if (proxy.isRechargeActivity) {
        proxy.api_plat_activity_daily_rewards_var();
    }
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
