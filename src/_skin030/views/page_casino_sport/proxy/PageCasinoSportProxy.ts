import PanelUtil from "@/_skin030/core/PanelUtil";
import Constant from "@/core/global/Constant";
import Vue from "vue";
export default class PageCasinoSportProxy extends puremvc.Proxy {
    static NAME = "PageCasinoSportProxy";

    public onRegister(): void {
    }
    isVendor = false;
    isInit = false;
    pageData = {
        loading: false,
    };
    gameList = [];
    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 30,
    };

    clearListQuery() {
        this.isInit = false;
        Object.assign(this.listQuery, {
            plat_id: core.plat_id,
            vendor_type: 0,
            vendor_id: 0,
            page_count: 1,
            page_size: 30,
        });
    }
    /**设置请求条件的数据 */
    setQueryData(vendor_type: number, vendor_id: number = 0) {
        this.clearListQuery();

        this.listQuery.vendor_type = vendor_type;
        this.listQuery.vendor_id = vendor_id;
    }
    /**重置请求 */
    init() {
        console.log("---init------");
        if (this.isInit) return;
        this.isInit = true;
        if (!this.listQuery.vendor_type && !this.listQuery.vendor_id) {
            const curPath = Vue.router.history.current.path;
            this.listQuery.vendor_type = Constant.getVendorByRouter(curPath);
        }
        window.scrollTo(0, 0);
    }
    public get tableMenu(): any {
        return PanelUtil.getProxy_gameproxy.lobbyMenuIndex;
    }
    get getCurMenuData() {
        if (!this.tableMenu) return [];
        if (!this.listQuery.vendor_type) {
            return [];
        }
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                return element.list;
            }
        }
        return [];
    }
}
