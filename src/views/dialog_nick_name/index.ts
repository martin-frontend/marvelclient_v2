import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNickNameProxy from "./proxy/DialogNickNameProxy";
import DialogNickName from "./views/DialogNickName.vue";

function show() {
    DialogMount(DialogNickName);
    const proxy: DialogNickNameProxy = getProxy(DialogNickNameProxy);
    proxy.pageData.bShow = true;
}

export default { show };
