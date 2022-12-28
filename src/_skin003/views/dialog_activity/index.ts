import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityProxy from "./proxy/DialogActivityProxy";
import DialogActivity from "./views/DialogActivity.vue";

function show() {
    DialogMount(DialogActivity);
    const proxy: DialogActivityProxy = getProxy(DialogActivityProxy);
    proxy.pageData.bShow = true;
}

export default { show };
