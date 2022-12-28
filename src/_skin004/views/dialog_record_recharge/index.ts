import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordRechargeProxy from "./proxy/DialogRecordRechargeProxy";
import DialogRecordRecharge from "./views/DialogRecordRecharge.vue";

function show() {
    DialogMount(DialogRecordRecharge);
    const proxy: DialogRecordRechargeProxy = getProxy(DialogRecordRechargeProxy);
    proxy.pageData.bShow = true;
}

export default { show };
