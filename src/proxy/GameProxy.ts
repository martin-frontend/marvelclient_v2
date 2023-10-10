import Vue from "vue";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";
import GlobalVar from "@/core/global/GlobalVar";
import NotificationName from "@/core/NotificationName";
import Timezone from "@/core/Timezone";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

export default class GameProxy extends AbstractProxy {
    static NAME = "GameProxy";

    public onRegister(): void {
        this.coin_name_unique = window.localStorage.getItem("coin_name_unique") || "";
    }

    /**大厅菜单 */
    lobbyIndex: core.PlatLobbyIndexVO[] = [];
    lobbyMenuIndex: core.PlatLobbyIndexVO[] = [];
    lobbyCategory: core.PlatLobbyCategoryIndexVO[] = []; //首页游戏
    lobbyCategory_0: core.PlatLobbyCategoryIndexVO[] = []; //全部的数据
    lobbyCategory_2: core.PlatLobbyCategoryIndexVO[] = []; // 棋牌
    lobbyCategory_4: core.PlatLobbyCategoryIndexVO[] = []; // 彩票
    lobbyCategory_8: core.PlatLobbyCategoryIndexVO[] = []; // 捕鱼
    lobbyCategory_16: core.PlatLobbyCategoryIndexVO[] = []; // 电子
    lobbyCategory_32: core.PlatLobbyCategoryIndexVO[] = []; // 真人
    lobbyCategory_64: core.PlatLobbyCategoryIndexVO[] = []; // 体育电竞
    lobbyCategory_128: core.PlatLobbyCategoryIndexVO[] = []; // 链游
    /**当前正在玩的游戏 */
    currGame: any = {
        vendor_id: 0,
    };
    /**当前选择的钱包类型 */
    coin_name_unique: string = "";
    // /**进入游戏页面的上一个路由 */
    // lastRouter = "";
    // /**游戏跳转前，历史页面数量 */
    // historyLength = 0;
    /**游戏跳转前，页面的状态 */
    gamePreData = {
        lastRouter: "",
        historyLength: 0,
        scrollY: 0,
    };

    loading = false;

    coin_name_unique_list_obj = <any>{};

    isFirstGetGameCategory = false;
    /**保存到本地 */
    save_coin_to_localStorage() {
        if (core.user_id) {
            if (!this.coin_name_unique_list_obj) {
                this.coin_name_unique_list_obj = <any>{};
            }
            if (!this.coin_name_unique_list_obj[core.user_id]) {
                this.read_coin_to_localStorage();
            }
            this.coin_name_unique_list_obj[core.user_id] = this.coin_name_unique;

            window.localStorage.setItem("coin_name_unique_list", JSON.stringify(this.coin_name_unique_list_obj));
        }
    }
    /**从本地读取 */
    read_coin_to_localStorage() {
        const data = window.localStorage.getItem("coin_name_unique_list") || null;
        if (!data) {
            this.coin_name_unique_list_obj = <any>{};
        } else {
            this.coin_name_unique_list_obj = JSON.parse(data);
        }
    }
    /**获取当前id存储的usd信息 */
    get_coin_from_localstorage() {
        if (core.user_id) {
            if (!this.coin_name_unique_list_obj[core.user_id]) {
                this.read_coin_to_localStorage();
            }
            if (!this.coin_name_unique_list_obj[core.user_id]) {
                return "";
            }
            return this.coin_name_unique_list_obj[core.user_id];
        }
        return "";
    }

    /**
     * 大厅菜单
     */
    setLobbyIndex(body: any) {
        this.lobbyIndex = body.class;
    }
    setGameMenu(body: any) {
        this.lobbyMenuIndex = body;
        if (ModulesHelper.IsShow_GameHistory()) {
            this.gameHistoryList = this.readGameHistory();

            const obj = <core.PlatLobbyIndexVO>{
                vendor_type: 3,
                id: 3,
                vendor_type_name: "近期游戏",
                list: this.gameHistoryList,
            };
            if (GlobalVar.skin == "skin009") {
                this.lobbyMenuIndex.push(obj);
            } else this.lobbyMenuIndex.unshift(obj);
        }
        for (let index = 0; index < this.lobbyMenuIndex.length; index++) {
            const element = this.lobbyMenuIndex[index];
            if (!element.id) {
                element.id = element.vendor_type;
            }
        }
    }
    /**通过分类 获取 该分类下面的 厂商 信息 */
    getVendorData_by_vendor(vendor_type: any) {
        const newlist = [];
        const keys = Object.keys(this.lobbyMenuIndex);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.lobbyMenuIndex[keys[index]];
            if (element.vendor_type == vendor_type) {
                for (let n = 0; n < element.list.length; n++) {
                    const item = element.list[n];
                    if (item.entrance_type == 1) {
                        newlist.push(item);
                    }
                }
            }
        }
        // console.warn("--->>>", newlist);
        return newlist;
    }
    /**menu中的厂商数据 */
    public get menu_vendor_data(): any {
        const data = [];
        const keys = Object.keys(this.lobbyMenuIndex);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.lobbyMenuIndex[keys[index]];

            for (let n = 0; n < element.list.length; n++) {
                const ele = element.list[n];
                if (ele.vendor_icon && ele.vendor_icon != "" && ele.vendor_icon != "-") {
                    let ishave = false;
                    for (let p = 0; p < data.length; p++) {
                        if (data[p].vendor_id === ele.vendor_id) {
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave) {
                        data.push(ele);
                    }
                }
            }
        }
        return data;
    }

    resetGamehistory() {
        if (ModulesHelper.IsShow_GameHistory()) {
            this.gameHistoryList = this.readGameHistory();

            let obj: any;
            for (let index = 0; index < this.lobbyMenuIndex.length; index++) {
                const element = this.lobbyMenuIndex[index];
                if (element.vendor_type == 3) {
                    obj = element;
                    this.lobbyMenuIndex[index].list = JSON.parse(JSON.stringify(this.gameHistoryList));
                    break;
                }
            }
            if (!obj) {
                obj = <core.PlatLobbyIndexVO>{
                    vendor_type: 3,
                    vendor_type_name: "近期游戏",
                    list: this.gameHistoryList,
                };
                if (GlobalVar.skin == "skin009") {
                    this.lobbyMenuIndex.push(obj);
                } else this.lobbyMenuIndex.unshift(obj);
            }
        }
    }
    setGameCategory(body: any) {
        this.lobbyCategory_0 = body;

        this.lobbyCategory = <core.PlatLobbyCategoryIndexVO[]>[]; //首页游戏
        this.lobbyCategory_2 = <core.PlatLobbyCategoryIndexVO[]>[]; // 棋牌
        this.lobbyCategory_4 = <core.PlatLobbyCategoryIndexVO[]>[]; // 彩票
        this.lobbyCategory_8 = <core.PlatLobbyCategoryIndexVO[]>[]; // 捕鱼
        this.lobbyCategory_16 = <core.PlatLobbyCategoryIndexVO[]>[]; // 电子
        this.lobbyCategory_32 = <core.PlatLobbyCategoryIndexVO[]>[]; // 真人
        this.lobbyCategory_64 = <core.PlatLobbyCategoryIndexVO[]>[]; // 体育电竞
        this.lobbyCategory_128 = <core.PlatLobbyCategoryIndexVO[]>[]; // 链游

        //对结果进行筛选和分类
        for (let index = 0; index < body.length; index++) {
            switch (body[index].type) {
                case "1":
                case 1:
                    this.lobbyCategory.push(body[index]);
                    break;
                case "2":
                case 2:
                    this.lobbyCategory_2.push(body[index]);
                    break;
                case "4":
                case 4:
                    this.lobbyCategory_4.push(body[index]);
                    break;
                case "8":
                case 8:
                    this.lobbyCategory_8.push(body[index]);
                    break;
                case "16":
                case 16:
                    this.lobbyCategory_16.push(body[index]);
                    break;
                case "32":
                case 32:
                    this.lobbyCategory_32.push(body[index]);
                    break;
                case "64":
                case 64:
                    this.lobbyCategory_64.push(body[index]);
                    break;
                case "128":
                case 128:
                    this.lobbyCategory_128.push(body[index]);
                    break;
                default:
                    this.lobbyCategory.push(body[index]);
                    break;
            }
        }
        // console.warn("棋牌的分类", this.lobbyCategory_2);
        this.isFirstGetGameCategory = true;
    }
    setCoin(coin_name_unique: string) {
        const old_coin = this.coin_name_unique;
        window.localStorage.setItem("coin_name_unique", coin_name_unique);
        this.save_coin_to_localStorage();
        this.coin_name_unique = coin_name_unique;
        if (old_coin != this.coin_name_unique) this.sendNotification(NotificationName.UPDATE_COIN);
    }

    /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_game_menu, { plat_id: core.plat_id });
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
        this.sendNotification(net.HttpType.api_plat_var_game_category, { plat_id: core.plat_id });
    }

    /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
    api_vendor_var_ori_product_show_var(data: core.VendorVO | core.VendorProductVO) {
        this.loading = true;
        this.currGame = data;
        if (core.user_id && !this.coin_name_unique) {
            console.log("币种为空");
            this.sendNotification(NotificationName.GO_HOME);
            return;
        }
        const { vendor_id, ori_product_id, ori_vendor_extend } = data;
        const form: any = {
            user_id: core.user_id,
            vendor_id,
            ori_product_id,
            ori_vendor_extend,
            coin_name_unique: this.coin_name_unique,
            lobby_url: location.origin,
        };
        if (!Timezone.Instance.isNotUseTimezone) {
            form.timezone = Timezone.Instance.timezoneOffset;
        }
        if (GlobalVar.skin) form.daynight_type = Vue.vuetify.framework.theme.dark ? "2" : "1";
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_vendor_var_ori_product_show_var, form);
        } else {
            this.sendNotification(net.HttpType.api_vendor_var_ori_product_visitor_show_var, form);
        }
    }
    /**直接进入体育页面，skin001专用 */
    go_soccer(data: any = null) {
        if (data) {
            this.currGame = data;
        } else
            this.currGame = {
                app_type: 2,
                category: 64,
                icon: "http://sftpuser.testjj9.com/resource/load_page_domain/d8/a7/d8a7883ef7beb56973362b0ab85b2402.jpg",
                index_no: 6,
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
                vendor_id: GameConfig.config.SportVendorId,
                vendor_name: "金利体育-测试",
                vendor_product_id: 8271,
                vendor_product_name: "足球",
                vendor_type: 64,
                water_rate_accelerate: 0,
            };

        if (this.currGame && this.currGame.ori_vendor_extend) {
            if (typeof this.currGame.ori_vendor_extend == "object") {
                this.currGame.ori_vendor_extend = JSON.stringify(this.currGame.ori_vendor_extend);
            }
        }
        this.api_vendor_var_ori_product_show_var(this.currGame);
    }
    isLoadSearch = false; //是否正在加载
    /**--搜索--搜索游戏*/
    api_plat_var_game_search(search: string) {
        if (!search || !search.trim()) return;
        this.isLoadSearch = true;
        this.clearSearchResult();
        console.log("发送搜索游戏的消息");
        this.sendNotification(net.HttpType.api_plat_var_game_search, {
            plat_id: core.plat_id,
            uuid: core.device,
            game_name: search,
        });
    }
    searchList = {
        list: <any>{},
        params: {
            game_name: "",
        },
    }; //搜索结果
    setSearchResult(data: any) {
        this.isLoadSearch = false;
        //this.searchList = data;
        //Object.assign(this.searchList, data);
        this.searchList = JSON.parse(JSON.stringify(data));
    }
    clearSearchResult() {
        Object.assign(this.searchList, {
            list: <any>{},
            params: {
                game_name: "",
            },
        });
    }
    api_user_var_game_search_error_back() {
        console.log("返回错误  ");
        this.isLoadSearch = false;
    }

    //体育/真人/彩票 使用 game/menu里面的数据
    isUseMenuData(vendor_type: number): boolean {
        let casinoPageGameList = GameConfig.config.casinoPageGameList;
        if (!casinoPageGameList) {
            casinoPageGameList = [1, 2, 8, 16, 128, 256, 512];
        }
        if (casinoPageGameList.includes(vendor_type)) {
            return false;
        } else {
            return true;
        }
    }

    gameHistoryList = <any>[];
    saveGame() {
        if (!core.user_id) return [];
        if (this.currGame) {
            if (this.isUseMenuData(this.currGame.vendor_type)) return;
            this.gameHistoryList = this.gameHistoryList.filter(
                (el: any, idx: any, arr: any) => el.vendor_product_id != this.currGame.vendor_product_id
            );
            this.gameHistoryList.unshift(this.currGame);
            const maxHistoryLength = GameConfig.config.maxHistoryLength || 30;
            if (this.gameHistoryList.length > maxHistoryLength) {
                this.gameHistoryList.pop();
            }
            //console.log("添加游戏数据", this.gameHistoryList);
            window.localStorage.setItem("game_histoty_list" + core.user_id, JSON.stringify(this.gameHistoryList));
        }
    }
    readGameHistory() {
        if (!core.user_id) return [];
        const data = window.localStorage.getItem("game_histoty_list" + core.user_id) || "";
        let list = <any>[];
        if (data) {
            list = JSON.parse(data);
        }
        return list;
    }
    deleteGameHistoryAll() {
        if (!core.user_id) return;
        this.gameHistoryList = <any>[];
        window.localStorage.setItem("game_histoty_list" + core.user_id, JSON.stringify(this.gameHistoryList));
    }
}
