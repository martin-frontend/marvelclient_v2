import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPreviewProxy from "./proxy/DialogPreviewProxy";
import DialogPreview from "./views/DialogPreview.vue";

function show() {
    DialogMount(DialogPreview);
    const proxy: DialogPreviewProxy = getProxy(DialogPreviewProxy);
    proxy.pageData.bShow = true;
}

export default { show };
