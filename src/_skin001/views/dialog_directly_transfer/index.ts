import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyTransferProxy from "./proxy/DialogDirectlyTransferProxy";
import DialogDirectlyTransfer from "./views/DialogDirectlyTransfer.vue";

function show(agent_user: any = null) {
    DialogMount(DialogDirectlyTransfer);
    const proxy: DialogDirectlyTransferProxy = getProxy(DialogDirectlyTransferProxy);
    proxy.pageData.bShow = true;
    if (agent_user)
    {
        proxy.setData(agent_user)
        
    }
}

export default { show };
