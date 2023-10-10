import PanelUtil from "@/_skin030/core/PanelUtil";
import LangUtil from "@/core/global/LangUtil";

export default class PageCasinoLobbyProxy extends puremvc.Proxy {
    static NAME = "PageCasinoLobbyProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
    };

    //所有游戏的列表
    gameListAll = <any>{
        0: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        1: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        2: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        3: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        4: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        8: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        16: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        32: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        64: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        128: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
        256: {
            list: <any>[],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 30,
                pageTotal: 1,
            },
        },
    };
    gameProxy = PanelUtil.getProxy_gameproxy;
    //分类的标签
    tabIndex = 0;
    isInit = false;
    addGameList(data: any) {
        if (!data || !data.list || data.list.length == 0) return;
        const curItem = data.list[0];
        if (data.pageInfo.pageCurrent == 1) {
            this.gameListAll[curItem.vendor_type].list.length = 0;
        }
        Object.assign(this.gameListAll[curItem.vendor_type].pageInfo, data.pageInfo);
        this.gameListAll[curItem.vendor_type].list.push(...data.list);

        // console.warn(" 设置的游戏数据为", this.gameListAll);
    }
    //添加 分类的游戏列表
    setGameList(data: any) {
        this.addGameList(data);
    }
    init() {
        setTimeout(() => {
            if (this.lobbyMenuIndex.length > 1 && !this.isInit) {
                this.isInit = true;
            } else {
                return;
            }
            // console.warn("重置，请求所有游戏列表数据");
            //请求所有的游戏类型的数据
            // for (let index = 0; index < this.lobbyMenuIndex.length; index++) {
            //     const element = this.lobbyMenuIndex[index];
            //     if (element.vendor_type != 0 && element.vendor_type != 3) {
            //         this.api_plat_var_game_all_index(element.vendor_type);
            //     }
            // }
        }, 100);
    }

    /**返回分类数据，包括了 全部游戏分类 */
    public get lobbyMenuIndex(): core.PlatLobbyIndexVO[] {
        const newList: core.PlatLobbyIndexVO[] = [];
        newList.push(...this.gameProxy.lobbyMenuIndex);
        const isHave = newList.some((ele: any, index: any, arr: any) => {
            return ele.vendor_type == 0;
        });
        if (!isHave) {
            const obj = <core.PlatLobbyIndexVO>{
                /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
                category: 0,
                /** 分类名字 */
                category_name: LangUtil("全部游戏"),
                list: [],
                /** 第几个 */
                index: 0,
                id: 0,
                vendor_type: 0,
                vendor_type_name: LangUtil("全部游戏"),
            };
            newList.unshift(obj);
        }
        return newList;
    }

    getCategoryDataByCategory(vendor_type: number) {
        switch (vendor_type) {
            case 0:
                return this.gameProxy.lobbyCategory;
            case 2:
                return this.gameProxy.lobbyCategory_2;
            case 4:
                return this.gameProxy.lobbyCategory_4;
            case 8:
                return this.gameProxy.lobbyCategory_8;
            case 16:
                return this.gameProxy.lobbyCategory_16;
            case 32:
                return this.gameProxy.lobbyCategory_32;
            case 64:
                return this.gameProxy.lobbyCategory_64;
            case 128:
                return this.gameProxy.lobbyCategory_128;
        }
        return [];
    }
    /**从menu中获取 对应的游戏数据 */
    getCategoryDataByMenu(vendor_type: number) {
        if (!this.gameProxy.lobbyMenuIndex || this.gameProxy.lobbyMenuIndex.length == 0) {
            return [];
        }
        //从列表中找出 不是厂商的 游戏
        const fitterArr = this.gameProxy.lobbyMenuIndex.filter((ele: any) => {
            ele.vendor_type == vendor_type;
        });
        if (!fitterArr || fitterArr.length < 1) {
            return [];
        }
        // const newList: core.PlatLobbyIndexVO[] = [];
        return fitterArr[0].list.filter((ele: any) => {
            return ele.entrance_type != 1;
        });
    }
    //所有厂商的数据
    public get tableMenu(): any {
        return this.gameProxy.lobbyMenuIndex;
    }

    //所有 图片的数据
    public get imgData(): any {
        return PanelUtil.getProxy_noticeProxy.data.listType19;
        // return this.gameProxy.menu_vendor_data;
    }

    api_plat_var_game_all_index(vendor_type: number, page_count: number = 1) {
        const sendObj = {
            plat_id: core.plat_id,
            vendor_type: vendor_type,
            vendor_id: 0,
            page_count: page_count,
            page_size: 30,
        };
        console.warn("发送 列表数据");
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, sendObj);
    }
    api_plat_var_game_all_index_by_vendor(vendor_id: number, page_count: number = 1) {
        const sendObj = {
            plat_id: core.plat_id,
            vendor_type: 0,
            vendor_id: vendor_id,
            page_count: page_count,
            page_size: 30,
        };
        console.warn("发送 列表数据--厂商");
        this.sendNotification(net.HttpType.api_plat_var_game_all_index, sendObj);
    }
}
