import Vue from "vue";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import GameConfig from "@/core/config/GameConfig";
import GlobalVar from "@/core/global/GlobalVar";
import NotificationName from "@/core/NotificationName";
import Timezone from "@/core/Timezone";

export default class GameProxy extends AbstractProxy {
    static NAME = "GameProxy";

    public onRegister(): void {
        this.coin_name_unique = window.localStorage.getItem("coin_name_unique") || "";
    }

    /**大厅菜单 */
    lobbyIndex: core.PlatLobbyIndexVO[] = [];
    lobbyMenuIndex: core.PlatLobbyIndexVO[] = [];
    lobbyCategory: core.PlatLobbyCategoryIndexVO[] = [];
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
    }
    setGameCategory(body: any) {
        this.lobbyCategory = body;
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
        if (GameConfig.timezoneChange) {
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
        this.api_vendor_var_ori_product_show_var(this.currGame);
    }
}
