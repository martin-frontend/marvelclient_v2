import GameConfig from "@/core/config/GameConfig";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Vue from "vue";
import PageGameSoccerProxy from "./proxy/PageGameSoccerProxy";

function show(url: string, isCricket: boolean = false) {
    // window["vm"].$router.push("/page_game_soccer");
    //Vue.router.push("/page_game_soccer");
    if (isCricket) {
        Vue.router.push("/cricket");
    }
    else {
        Vue.router.push("/page_game_soccer");
    }
    const proxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
    proxy.pageData.isAction = true;
    proxy.pageData.url = url;
}
/**打开足球页面 */
function open_sports() {
    _open(false);
}
/**打开 板球页面 */
function open_cricket() {
    _open(true);
}

function _open(isCricket: boolean = false) {
    console.warn("----open-----");
    const proxy: PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
    proxy.pageData.isAction = true;
    if (isCricket) {
        Vue.router.push("/cricket");
    }
    else {

        Vue.router.push("/page_game_soccer");
    }
    Init(isCricket);
}

function Init(isCricket: boolean = false) {
    console.warn("初始化------ 体育界面");
    const obj = {
        app_type: 2,
        category: 64,
        icon: "http://sftpuser.testjj9.com/resource/load_page_domain/d8/a7/d8a7883ef7beb56973362b0ab85b2402.jpg",
        index_no: 49,
        languages: ["zh_CN", "th_TH", "jp_JP", "es_ES", "ko_Kr", "vi_VN", "en_EN", "zh_TW"],
        list_type: 0,
        lobby_model_product_id: 369,
        lobby_product_id: 4857,
        open_mode: 1,
        ori_product_id: "1",
        ori_vendor_extend: '{"iframe_bad":false}',
        orientation: 1,
        plat_id: 30017,
        status: 1,
        tags: [],
        vendor_id: 0,
        vendor_name: "金利体育-测试",
        vendor_product_id: 8271,
        vendor_product_name: "足球",
        vendor_type: 64,
        visitor_allowed: 1,
        water_rate_accelerate: 0,
    };
    if (isCricket) {
        if (!GameConfig.config.CricketVendorId) {
            Vue.router.back();
            return;
        }
        obj.ori_product_id = "Cricket";
        obj.vendor_id = GameConfig.config.CricketVendorId;
        obj.vendor_name = "板球-测试";
        obj.vendor_product_name = "板球";
    }
    else {
        if (!GameConfig.config.SportVendorId) {
            Vue.router.back();
            return;
        }
        obj.vendor_id = GameConfig.config.SportVendorId;
    }
    PanelUtil.getProxy_gameproxy.go_soccer(obj);
    console.log("--当前游戏11111",PanelUtil.getProxy_gameproxy.currGame);
}

export default { show, open_sports, open_cricket };
