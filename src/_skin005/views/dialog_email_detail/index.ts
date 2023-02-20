import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEmailDetailProxy from "./proxy/DialogEmailDetailProxy";
import DialogEmailDetail from "./views/DialogEmailDetail.vue";

const proxy: DialogEmailDetailProxy = getProxy(DialogEmailDetailProxy);

function show(data: any) {
    DialogMount(DialogEmailDetail);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
