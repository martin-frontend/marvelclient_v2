import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyTransferProxy from "./proxy/DialogDirectlyTransferProxy";
import DialogDirectlyTransfer from "./views/DialogDirectlyTransfer.vue";

function show(agent_user: any = null ,addModeData:boolean = false) {
    DialogMount(DialogDirectlyTransfer);
    const proxy: DialogDirectlyTransferProxy = getProxy(DialogDirectlyTransferProxy);
    proxy.resetQuery();
    proxy.pageData.bShow = true;
    proxy.pageData.isAddMode = addModeData;

    proxy.setData(agent_user);
}

export default { show };
