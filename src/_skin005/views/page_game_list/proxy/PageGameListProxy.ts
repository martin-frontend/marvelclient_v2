import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Constant from "@/core/global/Constant";

export default class PageGameListProxy extends puremvc.Proxy {
    static NAME = "PageGameListProxy";
    gameProxy = PanelUtil.getProxy_gameproxy;
    public onRegister(): void {
        this.readData();
        this.pageData.loading = true;
        this.api_plat_var_game_all_config();
    }
    tableData = <any>{};
    noticeData = <any>{};
    isMultChange = false; //多个变化
    curItemIndex = -1;
    curMenuIndex = -1;
    pageData = {
        loading: false,
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 51,
            pageSize: 30,
            pageTotal: 1006,
        },
        updateCount: 0,
    };

    /**配置 */
    config = {
        loaded: false,
        vendor_type: {},
        vendor_type_vendor_id: {},
    };

    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 30,
    };

    init() {
        this.getFirstMenuIndex();
        this.getFirstItemVendor();
        const vendor_type = Constant.getVendorByRouter(Vue.router.history.current.path);
        if (vendor_type != -1) {
            this.listQuery.vendor_type = vendor_type;
        }
        this.getCurItemIndex();
        this.getCurMenuIndex();
        //PanelUtil.getProxy_novigation.categoryActive = 1;
        PanelUtil.getProxy_novigation.categoryActive = this.listQuery.vendor_type;
    }
    setConfig(data: any) {
        this.config.loaded = true;
        Object.assign(this.config, data.all_game);
        this.api_plat_var_game_all_index();
    }
    clearData() {
        Object.assign(this.pageData, {
            loading: false,
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 51,
                pageSize: 30,
                pageTotal: 1006,
            },
            updateCount: 0,
        });
        this.listQuery.page_count = 1;
    }
    setGameList(data: any) {
        //this.pageData.loading = false;
        PanelUtil.showAppLoading(false);
        const { list, pageInfo } = data;
        if (pageInfo.pageCurrent == 1) {
            Object.assign(this.pageData, data);
        } else {
            Object.assign(this.pageData.pageInfo, pageInfo);
            this.pageData.list.push(...list);
        }
        this.pageData.updateCount++;
    }
    setTableData(data: any) {
        this.tableData = <any>[];
        const keys = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            const element = data[keys[index]];
            element.src = require(`@/_skin004/assets/categoryicon/${element.vendor_type}.png`);
        }
    }

    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
        this.sendNotification(net.HttpType.api_plat_var_game_menu, { plat_id: core.plat_id });
    }

    // api_plat_var_game_menu() {
    //     this.sendNotification(net.HttpType.api_plat_var_game_menu, { plat_id: core.plat_id });
    // }

    api_plat_var_game_all_config() {
        this.saveData();
        this.sendNotification(net.HttpType.api_plat_var_game_all_config, { plat_id: core.plat_id });
    }

    api_plat_var_game_all_index() {
        this.saveData();
        //this.pageData.loading = true;
        PanelUtil.showAppLoading(true);
        this.listQuery.plat_id = core.plat_id;
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, this.listQuery);
    }

    /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
    api_vendor_var_ori_product_show_var(data: core.VendorVO | core.VendorProductVO) {
        //this.pageData.loading = true;
        PanelUtil.showAppLoading(true);
        const { vendor_id, ori_product_id, ori_vendor_extend } = data;
        this.sendNotification(net.HttpType.api_vendor_var_ori_product_show_var, {
            user_id: core.user_id,
            vendor_id,
            ori_product_id,
            ori_vendor_extend,
            daynight_type: Vue.vuetify.framework.theme.dark ? "2" : "1",
        });
    }

    getCurMenuIndex() {
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                this.curMenuIndex = index;
                return;
            }
        }
        return;
    }
    getFirstMenuIndex() {
        const keys = Object.keys(this.tableMenu);
        this.listQuery.vendor_type = this.tableMenu[keys[0]].vendor_type;
        this.curMenuIndex = 0;
    }

    getCurItemIndex() {
        if (!this.gameMenuData) {
            this.curItemIndex = -1;
            return;
        }
        for (let index = 0; index < this.gameMenuData.length; index++) {
            const item = this.gameMenuData[index];
            if (this.isCurItem(item)) {
                this.curItemIndex = index;

                return;
            }
        }
        this.curItemIndex = -1;
    }
    getFirstItemVendor() {
        if (this.gameMenuData && this.gameMenuData.length > 0) {
            this.listQuery.vendor_id = this.gameMenuData[0].vendor_id;
        }
    }
    saveData() {
        const obj = {
            listQuery: this.listQuery,
            curIndex: this.curItemIndex,
            curMenuIndex: this.curMenuIndex,
        };
        window.localStorage.setItem("gameListItem", JSON.stringify(obj));
    }
    readData() {
        // const obj = window.localStorage.getItem("gameListItem");
        // if (obj) {
        //     const obj_json = JSON.parse(obj);
        //     this.listQuery = obj_json.listQuery;
        //     this.listQuery.page_count = 1;
        //     this.curItemIndex = obj_json.curIndex;
        //     this.curMenuIndex = obj_json.curMenuIndex;
        //     PanelUtil.getProxy_novigation.categoryActive = this.listQuery.vendor_type;
        //     console.log("设置  导航 的标签---",this.listQuery.vendor_type);
        //     //this.curMenuIndex =
        // }
        console.log("---- init-----");
    }
    //判断是否点击的当前的对象
    isCurItem(item: any) {
        return this.listQuery.vendor_id == item.vendor_id;
    }
    //获取出当前游戏分类下面的 游戏厂商数据
    public get gameMenuData(): any {
        return this.getCurMenuData(true);
    }
    //获取当前的菜单的数据
    getCurMenuData(isVendor: boolean = false) {
        if (!this.curTotleData) return null;
        if (isVendor) {
            const list = <any>[];
            for (let n = 0; n < this.curTotleData.list.length; n++) {
                if (this.curTotleData.list[n].entrance_type == 1) {
                    list.push(this.curTotleData.list[n]);
                }
            }
            if (list.length > 0) {
                const obj = {
                    vendor_id: 0,
                    alias: LangUtil("全部厂商"),
                };
                list.unshift(obj);
            }

            return list;
        } else {
            return this.curTotleData.list;
        }
    }
    public get curTotleData(): any {
        if (!this.tableMenu) return null;
        if (!this.listQuery.vendor_type) {
            return null;
        }
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                return element;
            }
        }
        return null;
    }
    public get tableMenu(): any {
        return this.gameProxy.lobbyMenuIndex;
    }
}
