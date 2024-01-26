import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityPointSpinProxy from "./proxy/DialogActivityPointSpinProxy";
import DialogActivityPointSpin from "./views/DialogActivityPointSpin.vue";

const proxy: DialogActivityPointSpinProxy = getProxy(DialogActivityPointSpinProxy);
function show(index: any) {
    DialogMount(DialogActivityPointSpin);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.resetQuery();
    proxy.getDetailData(index);
    proxy.api_user_var_short_chain();
    // proxy.setData(data);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
