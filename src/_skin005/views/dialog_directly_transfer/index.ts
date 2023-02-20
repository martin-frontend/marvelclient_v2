import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyTransferProxy from "./proxy/DialogDirectlyTransferProxy";
import DialogDirectlyTransfer from "./views/DialogDirectlyTransfer.vue";
const proxy: DialogDirectlyTransferProxy = getProxy(DialogDirectlyTransferProxy);

function show(agent_user: any = null ,addModeData:boolean = false) {
    DialogMount(DialogDirectlyTransfer);
    hidden(false);
    proxy.resetQuery();
    proxy.pageData.bShow = true;
    proxy.pageData.isAddMode = addModeData;

    proxy.setData(agent_user);
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
