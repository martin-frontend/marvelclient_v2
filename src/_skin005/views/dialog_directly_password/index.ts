import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyPasswordProxy from "./proxy/DialogDirectlyPasswordProxy";
import DialogDirectlyPassword from "./views/DialogDirectlyPassword.vue";

const proxy: DialogDirectlyPasswordProxy = getProxy(DialogDirectlyPasswordProxy);
function show(data: any) {
    DialogMount(DialogDirectlyPassword);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.setData(data);
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show };
