import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogOrderProxy from "./proxy/DialogOrderProxy";
import DialogOrder from "./views/DialogOrder.vue";
const proxy: DialogOrderProxy = getProxy(DialogOrderProxy);

function show(data: any, game_info: any = null) {
    DialogMount(DialogOrder);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.api_vendor_var_bet_log_detail(data.order_no, data.vendor_id);
    proxy.pageData.itemData = JSON.parse(JSON.stringify(data));

    proxy.setGameinfo(game_info);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
