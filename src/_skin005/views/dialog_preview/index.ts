import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPreviewProxy from "./proxy/DialogPreviewProxy";
import DialogPreview from "./views/DialogPreview.vue";

const proxy: DialogPreviewProxy = getProxy(DialogPreviewProxy);

function show(url: string) {
    DialogMount(DialogPreview);

    proxy.pageData.bShow = true;
    proxy.pageData.url = url;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
