import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRegisterProxy from "./proxy/DialogRegisterProxy";
import DialogRegister from "./views/DialogRegister.vue";

function show() {
    DialogMount(DialogRegister);
    const proxy: DialogRegisterProxy = getProxy(DialogRegisterProxy);
    proxy.show();
}

export default { show };
