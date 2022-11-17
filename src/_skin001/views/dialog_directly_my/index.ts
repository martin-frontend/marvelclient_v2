import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyMyProxy from "./proxy/DialogDirectlyMyProxy";
import DialogDirectlyMy from "./views/DialogDirectlyMy.vue";

function show() {
    DialogMount(DialogDirectlyMy);
    const proxy: DialogDirectlyMyProxy = getProxy(DialogDirectlyMyProxy);
    proxy.pageData.bShow = true;
}

export default { show };
