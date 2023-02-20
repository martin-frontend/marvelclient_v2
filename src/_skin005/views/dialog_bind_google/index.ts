import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBindGoogleProxy from "./proxy/DialogBindGoogleProxy";
import DialogBindGoogle from "./views/DialogBindGoogle.vue";
const proxy: DialogBindGoogleProxy = getProxy(DialogBindGoogleProxy);

function show() {
    DialogMount(DialogBindGoogle);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
