import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPerformanceProxy from "./proxy/DialogPerformanceProxy";
import DialogPerformance from "./views/DialogPerformance.vue";
const proxy: DialogPerformanceProxy = getProxy(DialogPerformanceProxy);

function show() {
    DialogMount(DialogPerformance);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
