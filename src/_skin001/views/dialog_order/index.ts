import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogOrderProxy from "./proxy/DialogOrderProxy";
import DialogOrder from "./views/DialogOrder.vue";

function show(data: any) {
    DialogMount(DialogOrder);
    const proxy: DialogOrderProxy = getProxy(DialogOrderProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

export default { show };
