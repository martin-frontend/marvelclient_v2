import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPledgeRecordsProxy from "./proxy/DialogPledgeRecordsProxy";
import DialogPledgeRecords from "./views/DialogPledgeRecords.vue";
const proxy: DialogPledgeRecordsProxy = getProxy(DialogPledgeRecordsProxy);

function show() {
    DialogMount(DialogPledgeRecords);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
