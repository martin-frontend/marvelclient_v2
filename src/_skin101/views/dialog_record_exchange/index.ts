import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordExchangeProxy from "./proxy/DialogRecordExchangeProxy";
import DialogRecordExchange from "./views/DialogRecordExchange.vue";

function show() {
    DialogMount(DialogRecordExchange);
    const proxy: DialogRecordExchangeProxy = getProxy(DialogRecordExchangeProxy);
    proxy.show();
}

export default { show };
