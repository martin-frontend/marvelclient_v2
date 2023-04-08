import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRegisterProxy from "./proxy/DialogRegisterProxy";
import DialogRegister from "./views/DialogRegister.vue";
const proxy: DialogRegisterProxy = getProxy(DialogRegisterProxy);

function show() {
    DialogMount(DialogRegister);
    hidden(false);
    proxy.show();
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
