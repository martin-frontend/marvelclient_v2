import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordExchangeProxy from "./proxy/DialogRecordExchangeProxy";
import DialogRecordExchange from "./views/DialogRecordExchange.vue";
const proxy: DialogRecordExchangeProxy = getProxy(DialogRecordExchangeProxy);

function show() {
    DialogMount(DialogRecordExchange);
    hidden(false);
    proxy.show();
}



function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
