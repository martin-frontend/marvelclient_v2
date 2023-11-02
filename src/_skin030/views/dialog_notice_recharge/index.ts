import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNoticeRechargeProxy from "./proxy/DialogNoticeRechargeProxy";
import DialogNoticeRecharge from "./views/DialogNoticeRecharge.vue";

const proxy: DialogNoticeRechargeProxy = getProxy(DialogNoticeRechargeProxy);
function show(data: any) {
    DialogMount(DialogNoticeRecharge);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
