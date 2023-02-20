import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogNickNameProxy from "./proxy/DialogNickNameProxy";
import DialogNickName from "./views/DialogNickName.vue";
const proxy: DialogNickNameProxy = getProxy(DialogNickNameProxy);

function show() {
    DialogMount(DialogNickName);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
