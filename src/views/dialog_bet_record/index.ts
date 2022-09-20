import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";

function show(user_id: any = core.user_id) {
    DialogMount(DialogBetRecord);
    const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
    proxy.pageData.listQuery.user_id = user_id;
    proxy.pageData.bShow = true;
}

export default { show };
