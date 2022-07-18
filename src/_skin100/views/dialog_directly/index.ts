import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyProxy from "./proxy/DialogDirectlyProxy";
import DialogDirectly from "./views/DialogDirectly.vue";

function show() {
    DialogMount(DialogDirectly);
    const proxy: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);
    proxy.pageData.bShow = true;
}

export default { show };
