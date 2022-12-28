import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPerformanceProxy from "./proxy/DialogPerformanceProxy";
import DialogPerformance from "./views/DialogPerformance.vue";

function show() {
    DialogMount(DialogPerformance);
    const proxy: DialogPerformanceProxy = getProxy(DialogPerformanceProxy);
    proxy.pageData.bShow = true;
}

export default { show };
