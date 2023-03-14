import router from "@/_skin101/router";
import SelfProxy from "@/proxy/SelfProxy";
import getProxy from "@/core/global/getProxy";

function show() {
    router.push("/page_mine");
    // const selfProxy: SelfProxy = getProxy(SelfProxy);
    // selfProxy.api_user_show_var([3, 4, 5, 6]);
}

export default { show };
