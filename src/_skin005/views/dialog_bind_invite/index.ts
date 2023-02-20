import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBindInviteProxy from "./proxy/DialogBindInviteProxy";
import DialogBindInvite from "./views/DialogBindInvite.vue";
const proxy: DialogBindInviteProxy = getProxy(DialogBindInviteProxy);

function show() {
    DialogMount(DialogBindInvite);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
