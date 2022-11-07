import GameConfig from "@/core/config/GameConfig";

export default class HeaderProxy extends puremvc.Proxy {
    static NAME = "HeaderProxy";

    isOpenWalletMenu: boolean = false;
    isShowWalletTip: boolean = false;
    //当前活动的分类
    categoryActive = 1;

    public onRegister(): void {
        if (GameConfig.config) {
            this.api_plat_var_lobby_index();
        }
    }

    pageData = {
        bShowUserPanel: false,
        lobbyIndex: <core.PlatLobbyIndexVO[]>[],
    };

    setLobbyIndex(body: any) {
        this.pageData.lobbyIndex = Object.freeze(body.class);
    }

    /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
    api_plat_var_lobby_index() {
        this.sendNotification(net.HttpType.api_plat_var_lobby_index, { plat_id: core.plat_id });
    }

    openMenu() {
        setTimeout(() => {
            this.isOpenWalletMenu = true;
            this.isShowWalletTip = true;
        }, 300);
    }
}
