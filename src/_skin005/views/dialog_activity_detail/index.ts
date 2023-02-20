import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityDetailProxy from "./proxy/DialogActivityDetailProxy";
import DialogActivityDetail from "./views/DialogActivityDetail.vue";

const proxy: DialogActivityDetailProxy = getProxy(DialogActivityDetailProxy);
function show(data: any) {
    DialogMount(DialogActivityDetail);
  
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}



export default { show ,hidden };
