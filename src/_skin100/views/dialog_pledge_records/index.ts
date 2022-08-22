import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPledgeRecordsProxy from "./proxy/DialogPledgeRecordsProxy";
import DialogPledgeRecords from "./views/DialogPledgeRecords.vue";

function show() {
    DialogMount(DialogPledgeRecords);
    const proxy: DialogPledgeRecordsProxy = getProxy(DialogPledgeRecordsProxy);
    proxy.pageData.bShow = true;
}

export default { show };
