import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPerformanceDetailProxy from "./proxy/DialogPerformanceDetailProxy";
import DialogPerformanceDetail from "./views/DialogPerformanceDetail.vue";
const proxy: DialogPerformanceDetailProxy = getProxy(DialogPerformanceDetailProxy);

function show() {
    DialogMount(DialogPerformanceDetail);
    proxy.pageData.bShow = true;
    hidden(false);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
