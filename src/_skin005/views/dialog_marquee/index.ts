import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogMarqueeProxy from "./proxy/DialogMarqueeProxy";
import DialogMarquee from "./views/DialogMarquee.vue";

const proxy: DialogMarqueeProxy = getProxy(DialogMarqueeProxy);
function show() {
    DialogMount(DialogMarquee);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
