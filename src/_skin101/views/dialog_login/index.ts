import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogLoginProxy from "./proxy/DialogLoginProxy";
import DialogLogin from "./views/DialogLogin.vue";

function show() {
    DialogMount(DialogLogin);
    const proxy: DialogLoginProxy = getProxy(DialogLoginProxy);
    proxy.resetForm();
    proxy.show();
}

export default { show };
