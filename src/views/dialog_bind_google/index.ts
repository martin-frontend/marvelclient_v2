import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBindGoogleProxy from "./proxy/DialogBindGoogleProxy";
import DialogBindGoogle from "./views/DialogBindGoogle.vue";

function show() {
    DialogMount(DialogBindGoogle);
    const proxy: DialogBindGoogleProxy = getProxy(DialogBindGoogleProxy);
    proxy.pageData.bShow = true;
}

export default { show };
