import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogTestProxy from "./proxy/DialogTestProxy";
import DialogTest from "./views/DialogTest.vue";

function show() {
    DialogMount(DialogTest);
    const proxy: DialogTestProxy = getProxy(DialogTestProxy);
    proxy.pageData.bShow = true;
}

export default { show };
