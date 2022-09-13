import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import GameSearchProxy from "./proxy/GameSearchProxy";
import GameSearch from "./views/GameSearch.vue";

function show() {
    DialogMount(GameSearch, false);
    const myProxy: GameSearchProxy = getProxy(GameSearchProxy);
    myProxy.pageData.bShow = true;
}

export default { show };
