import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyProxy from "./proxy/DialogDirectlyProxy";
import DialogDirectly from "./views/DialogDirectly.vue";
const proxy: DialogDirectlyProxy = getProxy(DialogDirectlyProxy);

function show() {
    DialogMount(DialogDirectly);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
