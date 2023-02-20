import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogLoginProxy from "./proxy/DialogLoginProxy";
import DialogLogin from "./views/DialogLogin.vue";
const proxy: DialogLoginProxy = getProxy(DialogLoginProxy);

function show() {
    DialogMount(DialogLogin);
    hidden(false);
    proxy.resetForm();
    proxy.show();
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
