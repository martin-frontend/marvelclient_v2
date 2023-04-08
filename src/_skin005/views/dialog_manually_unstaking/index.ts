import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogManuallyUnstakingProxy from "./proxy/DialogManuallyUnstakingProxy";
import DialogManuallyUnstaking from "./views/DialogManuallyUnstaking.vue";
const proxy: DialogManuallyUnstakingProxy = getProxy(DialogManuallyUnstakingProxy);

function show() {
    DialogMount(DialogManuallyUnstaking);
    hidden(false);
    proxy.resetForm();
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
