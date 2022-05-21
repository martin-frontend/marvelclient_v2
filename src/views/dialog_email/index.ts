import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEmailProxy from "./proxy/DialogEmailProxy";
import DialogEmail from "./views/DialogEmail.vue";

function show() {
    DialogMount(DialogEmail);
    const proxy: DialogEmailProxy = getProxy(DialogEmailProxy);
    proxy.pageData.bShow = true;
}

export default { show };
