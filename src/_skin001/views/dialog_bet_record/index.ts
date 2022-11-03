import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";

function show(agent_user_id: any = null, start_date:string = "", end_date:string = "", bShowOptions = true) {
    DialogMount(DialogBetRecord);
    const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
    proxy.pageData.listQuery.agent_user_id = agent_user_id;
    proxy.pageData.listQuery.start_date = start_date;
    proxy.pageData.listQuery.end_date = end_date;
    proxy.pageData.bShowOptions = bShowOptions;
    proxy.pageData.bShow = true;
}

export default { show };
