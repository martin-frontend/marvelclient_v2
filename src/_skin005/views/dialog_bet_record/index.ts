import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBetRecordProxy from "./proxy/DialogBetRecordProxy";
import DialogBetRecord from "./views/DialogBetRecord.vue";
const proxy: DialogBetRecordProxy = getProxy(DialogBetRecordProxy);

function show(agent_user_id: any = null, start_date: string = "", end_date: string = "", bShowOptions = true, msg: any = null) {
    DialogMount(DialogBetRecord);
    hidden(false);
    proxy.initShowType()
    proxy.pageData.listQuery.agent_user_id = agent_user_id;
    proxy.pageData.listQuery.start_date = start_date;
    proxy.pageData.listQuery.end_date = end_date;
    proxy.pageData.bShowOptions = bShowOptions;
    //proxy.pageData.bShowOptions = true;
    if (msg) {
        if (msg.coin_name_unique) {
            proxy.pageData.listQuery.coin_name_unique = msg.coin_name_unique;
            proxy.listOptions.moneySelect = msg.coin_name_unique;
        }
        if (msg.bShowOptions != null) {
            proxy.pageData.bShowOptions = msg.bShowOptions;
        }
        if (msg.bShowMoneyType != null) {
            proxy.pageData.bShowMoneyType = msg.bShowMoneyType;
        }
        if (msg.bShowUserId != null) {
            proxy.pageData.bShowUserId = msg.bShowUserId;
        }
        if (msg.bShowTimeText != null) {
            proxy.pageData.bShowTimeText = msg.bShowTimeText;
        }
        if (msg.bShowIsMine != null) {
            proxy.pageData.bShowIsMine = msg.bShowIsMine;
        }
        if (msg.filterBtnInfo != null) {
            proxy.setFilterInfo(msg.filterBtnInfo);
        }
    }
    else {
        proxy.listOptions.moneySelect = 0;
    }
    if (agent_user_id) {
        proxy.listOptions.betTimeSelect = 1;
        proxy.pageData.listQuery.order_by = JSON.stringify({ settlement_at: "DESC" });
    } else {
        proxy.listOptions.betTimeSelect = 0;
        proxy.pageData.listQuery.order_by = JSON.stringify({ bet_at: "DESC" });
    }
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
