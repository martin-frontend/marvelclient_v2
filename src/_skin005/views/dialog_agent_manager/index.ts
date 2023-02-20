import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAgentManagerProxy from "./proxy/DialogAgentManagerProxy";
import DialogAgentManager from "./views/DialogAgentManager.vue";
const proxy: DialogAgentManagerProxy = getProxy(DialogAgentManagerProxy);

function show() {
    DialogMount(DialogAgentManager);
    hidden(false);
    proxy.pageData.bShow = true;
}



function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
