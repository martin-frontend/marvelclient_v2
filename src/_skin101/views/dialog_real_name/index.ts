import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRealNameProxy from "./proxy/DialogRealNameProxy";
import DialogRealName from "./views/DialogRealName.vue";

function show() {
    DialogMount(DialogRealName);
    const proxy: DialogRealNameProxy = getProxy(DialogRealNameProxy);
    proxy.pageData.bShow = true;
}

export default { show };
