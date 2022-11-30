import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDirectlyAdduserProxy from "./proxy/DialogDirectlyAdduserProxy";
import DialogDirectlyAdduser from "./views/DialogDirectlyAdduser.vue";
import SelfProxy from "@/proxy/SelfProxy";

function show() {
    DialogMount(DialogDirectlyAdduser);
    const proxy: DialogDirectlyAdduserProxy = getProxy(DialogDirectlyAdduserProxy);
    proxy.pageData.bShow = true;
    const selfProxy: SelfProxy = getProxy(SelfProxy);
    proxy.setData(selfProxy.userInfo);

   
}

export default { show };
