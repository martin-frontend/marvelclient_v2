import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";

function show() {
    DialogMount(DialogBetRecord);
    const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
    proxy.pageData.bShow = true;
}

export default { show };
