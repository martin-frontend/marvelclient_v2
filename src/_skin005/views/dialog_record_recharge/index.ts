import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordRechargeProxy from "./proxy/DialogRecordRechargeProxy";
import DialogRecordRecharge from "./views/DialogRecordRecharge.vue";
const proxy: DialogRecordRechargeProxy = getProxy(DialogRecordRechargeProxy);

function show() {
    DialogMount(DialogRecordRecharge);
    proxy.pageData.bShow = true;
    hidden(false);
}



function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};