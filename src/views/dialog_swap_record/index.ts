import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogSwapRecordProxy from "./proxy/DialogSwapRecordProxy";
import DialogSwapRecord from "./views/DialogSwapRecord.vue";

function show() {
    DialogMount(DialogSwapRecord);
    const proxy: DialogSwapRecordProxy = getProxy(DialogSwapRecordProxy);
    proxy.pageData.bShow = true;
}

export default { show };
