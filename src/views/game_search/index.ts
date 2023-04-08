import getProxy from "@/core/global/getProxy";
import GameSearchProxy from "./proxy/GameSearchProxy";

function show() {
    const myProxy: GameSearchProxy = getProxy(GameSearchProxy);
    myProxy.pageData.bShow = true;
}

export default { show };
