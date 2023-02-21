import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPerformanceDetailProxy from "./proxy/DialogPerformanceDetailProxy";
import DialogPerformanceDetail from "./views/DialogPerformanceDetail.vue";

function show() {
    DialogMount(DialogPerformanceDetail);
    const proxy: DialogPerformanceDetailProxy = getProxy(DialogPerformanceDetailProxy);
    proxy.pageData.bShow = true;
}

export default { show };
