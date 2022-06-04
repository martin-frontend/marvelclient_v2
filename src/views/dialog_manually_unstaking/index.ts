import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogManuallyUnstakingProxy from "./proxy/DialogManuallyUnstakingProxy";
import DialogManuallyUnstaking from "./views/DialogManuallyUnstaking.vue";

function show() {
    DialogMount(DialogManuallyUnstaking);
    const proxy: DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);
    proxy.resetForm();
    proxy.pageData.bShow = true;
}

export default { show };
