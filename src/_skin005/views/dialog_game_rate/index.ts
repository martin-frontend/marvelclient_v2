import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGameRateProxy from "./proxy/DialogGameRateProxy";
import DialogGameRate from "./views/DialogGameRate.vue";
const proxy: DialogGameRateProxy = getProxy(DialogGameRateProxy);

function show() {
    DialogMount(DialogGameRate);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
