import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyGamesetProxy from "./proxy/DialogDirectlyGamesetProxy";
import DialogDirectlyGameset from "./views/DialogDirectlyGameset.vue";
const proxy: DialogDirectlyGamesetProxy = getProxy(DialogDirectlyGamesetProxy);

function show(data: any = null) {
    DialogMount(DialogDirectlyGameset);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
