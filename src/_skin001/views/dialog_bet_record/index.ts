import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";

function show(agent_user_id: any = null, start_date: string = "", end_date: string = "", bShowOptions = true) {
    DialogMount(DialogBetRecord);
    const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);
    proxy.pageData.listQuery.agent_user_id = agent_user_id;
    proxy.pageData.listQuery.start_date = start_date;
    proxy.pageData.listQuery.end_date = end_date;
    proxy.pageData.bShowOptions = bShowOptions;
    if (agent_user_id) {
        proxy.listOptions.betTimeSelect = 1;
        proxy.pageData.listQuery.order_by = JSON.stringify({ settlement_at: "DESC" });
    } else {
        proxy.listOptions.betTimeSelect = 0;
        proxy.pageData.listQuery.order_by = JSON.stringify({ bet_at: "DESC" });
    }
    proxy.pageData.bShow = true;
}

export default { show };
