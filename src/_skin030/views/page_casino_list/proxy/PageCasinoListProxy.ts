import PanelUtil from "@/_skin030/core/PanelUtil";
import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";
export default class PageCasinoListProxy extends puremvc.Proxy {
    static NAME = "PageCasinoListProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }
    isInit = false;
    isVendor = false; /**是否为厂商列表 */
    isReady = false;
    pageData = {
        loading: false,
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 30,
            pageTotal: 1,
        },
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
    /**设置游戏列表 */
    setGameList(data: any) {
        PanelUtil.showAppLoading(false);
        const { list, pageInfo } = data;
        if (pageInfo.pageCurrent == 1) {
            Object.assign(this.pageData, data);
        } else {
            Object.assign(this.pageData.pageInfo, pageInfo);
            this.pageData.list.push(...list);
        }
    }
    /**重置请求 */
    init() {
        if (this.isInit) return;
        if (!this.isReady) return;
        this.isInit = true;
        if (this.isVendor) return;

        if (!this.listQuery.vendor_type && !this.listQuery.vendor_id) {
            const curPath = Vue.router.history.current.path;
            if (curPath.includes("vendor")) {
                this.isVendor = true;
                return;
            }
        }
        this.filterVenderArr = [];
        for (let index = 0; index < this.curVendorData.length; index++) {
            const element = this.curVendorData[index];
            if (element.vendor_id) {
                this.filterVenderArr.push(element.vendor_id);
            }
        }

        this.api_plat_var_game_all_index();
        window.scrollTo(0, 0);
    }
    get gameHistoryList() {
        const gameProxy = PanelUtil.getProxy_gameproxy;
        return gameProxy.gameHistoryList;
    }
    /**获取当前页面的 厂商信息 */
    get curVendorData() {
        if (this.isVendor) return [];
        const gameProxy = PanelUtil.getProxy_gameproxy;
        return gameProxy.getVendorData_by_vendor(this.listQuery.vendor_type);
    }
    filterVenderArr = <any>[];

    /**请求游戏信息 */
    api_plat_var_game_all_index() {
        PanelUtil.showAppLoading(true);
        this.listQuery.plat_id = core.plat_id;

        const sendobj = JSON.parse(JSON.stringify(this.listQuery));
        if (!sendobj.vendor_id && this.curVendorData && this.curVendorData.length > 1) {
            // const vendor_ids = [];
            // //console.log(" 当前的所有的 厂商", this.gameMenuData);
            // for (let index = 0; index < this.curVendorData.length; index++) {
            //     const element = this.curVendorData[index];
            //     if (element.vendor_id) {
            //         vendor_ids.push(element.vendor_id);
            //     }
            // }
            // sendobj.vendor_ids = JSON.stringify(vendor_ids);
            sendobj.vendor_ids = JSON.stringify(this.filterVenderArr);
        }

        console.warn("发送 列表数据");
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, sendobj);
    }

    onClearHistory() {
        const gameProxy = PanelUtil.getProxy_gameproxy;
        PanelUtil.message_confirm({
            message: LangUtil("是否清除游戏记录"),
            okFun: () => {
                gameProxy.deleteGameHistoryAll();
            },
            okTxt: LangUtil("清除"),
        });
    }
}
