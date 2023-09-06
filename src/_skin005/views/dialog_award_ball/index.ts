import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAwardBallProxy from "./proxy/DialogAwardBallProxy";
import DialogAwardBall from "./views/DialogAwardBall.vue";

const proxy: DialogAwardBallProxy = getProxy(DialogAwardBallProxy);
function show(data: any, onCloseFun: Function | null = null) {
    DialogMount(DialogAwardBall);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.onCloseFun = onCloseFun;
    proxy.setData(data);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
