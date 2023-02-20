import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyMyProxy from "./proxy/DialogDirectlyMyProxy";
import DialogDirectlyMy from "./views/DialogDirectlyMy.vue";
const proxy: DialogDirectlyMyProxy = getProxy(DialogDirectlyMyProxy);

function show() {
    DialogMount(DialogDirectlyMy);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
