import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";

function show(agent_user_id: any = null) {
    DialogMount(DialogBetRecord);
    const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
    proxy.pageData.listQuery.agent_user_id = agent_user_id;
    proxy.pageData.bShow = true;
}

export default { show };
