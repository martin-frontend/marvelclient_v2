import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyAdduserProxy from "./proxy/DialogDirectlyAdduserProxy";
import DialogDirectlyAdduser from "./views/DialogDirectlyAdduser.vue";

function show() {
    DialogMount(DialogDirectlyAdduser);
    const proxy: DialogDirectlyAdduserProxy = getProxy(DialogDirectlyAdduserProxy);
    proxy.pageData.bShow = true;
}

export default { show };
