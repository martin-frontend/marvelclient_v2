import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBindInviteProxy from "./proxy/DialogBindInviteProxy";
import DialogBindInvite from "./views/DialogBindInvite.vue";

function show() {
    DialogMount(DialogBindInvite);
    const proxy: DialogBindInviteProxy = getProxy(DialogBindInviteProxy);
    proxy.pageData.bShow = true;
}

export default { show };
