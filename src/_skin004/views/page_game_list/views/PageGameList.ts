import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import game_search from "@/views/game_search";
import { Watch, Component } from "vue-property-decorator";
import PageGameListMediator from "../mediator/PageGameListMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";
import HeaderProxy from "@/_skin004/views/header/proxy/HeaderProxy";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class PageGameList extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    gameProxy: GameProxy = getProxy(GameProxy);
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    headerProxy: HeaderProxy = getProxy(HeaderProxy);

    pageData = this.myProxy.pageData;
    listQuery = this.myProxy.listQuery;
    constructor() {
        super(PageGameListMediator);
    }

    //是否为新的 需要 菜单栏
    public get isNeetMenu(): boolean {
        return GameConfig.config.menuType == "1";
    }
    //是否需要显示 厂商 列表
    public get isNeedVendor(): boolean {
        return this.isNeetMenu;
    }
    //体育/真人/彩票 使用 game/menu里面的数据
    public get isUseMenuData(): boolean {
        if (!this.isNeetMenu)
            return false;
        if (this.listQuery.vendor_type == 4 || this.listQuery.vendor_type == 32 || this.listQuery.vendor_type == 64)
            return true;

        return false;
    }
    //判断是否点击的当前的对象
    isCurItem(item: any) {
        return this.vendor_id == item.vendor_id;
    }

    public get menudata(): any {
        return this.getCurMenuData(false);
    }
    getGameIcon(item: any) {
        if (!item || !item.entrance_icon) {
            return "";
        }
        return item.entrance_icon;
    }
    onClick( item:any) {
        if (item) {
            LoginEnter(() => {
                const gameProxy: GameProxy = this.getProxy(GameProxy);
                gameProxy.api_vendor_var_ori_product_show_var(item);
            });
        }
    }
    //手机版的时候 加载的本地图片地址
    getLocalIconPath(vendor_type: any) {
        return require(`@/_skin004/assets/categoryicon/${vendor_type}.png`);
    }

    public get tableMenu(): any {
        return this.headerProxy.pageData.lobbyMenuIndex;
    }

    public get curTotleData(): any {
        if (!this.tableMenu)
            return null;
        //console.log("当前查找的id 为", this.listQuery.vendor_type);
        if (!this.listQuery.vendor_type) {
            return null;
        }
        //console.log("当前查找的数组为", this.myProxy.gamemenuData);
        const keys = Object.keys(this.tableMenu)
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                return element;
            }
        }
        return null;
    }

    public get curMenuVendorTypeName(): string {
        if (!this.curTotleData) {
            return "";
        }
        return LangUtil(this.curTotleData.vendor_type_name);

    }


    //获取当前的菜单的数据
    getCurMenuData(isVendor: boolean = false) {
        if (!this.curTotleData)
            return null;
        if (isVendor) {
            const list = <any>[];
            for (let n = 0; n < this.curTotleData.list.length; n++) {
                if (this.curTotleData.list[n].entrance_type == 1) {
                    list.push(this.curTotleData.list[n]);
                }
            }
            return list;
        }
        else {
            return this.curTotleData.list;
        }
    }
    //获取出当前游戏分类下面的 游戏厂商数据
    public get gameMenuData(): any {
        return this.getCurMenuData(true);
    }
    isCurMenu(item: any) {
        return this.myProxy.listQuery.vendor_type == item.vendor_type;
    }
    getIcon(item: any) {
        //return require(`@/_skin004/assets/2211.png`);
        if (!item || !item.vendor_icon) {
            return ""
        }
        return item.vendor_icon;
    }
    onBtnClick(item: any) {
        if (!item) {
            return;
        }
        this.myProxy.listQuery.vendor_id = item.vendor_id;
    }

    goCategory(id: any) {
        this.myProxy.listQuery.vendor_type = id;
        //const headerProxy: HeaderProxy = getProxy(HeaderProxy);
        this.headerProxy.categoryActive = id;
    }
    get hotGame() {
        for (const item of this.gameProxy.lobbyIndex) {
            if (item.category == 1) {
                return item;
            }
        }
        return {};
    }
    getItemCategory(item: any) {
        if (item.category) {
            return item.category;
        }
        else {
            return item.vendor_type;
        }
    }
    getItemCategoryName(item: any) {
        if (item.category_name) {
            return item.category_name;
        }
        else {
            return item.vendor_type_name;
        }
    }

    public get vendor_id(): number {
        return this.myProxy.listQuery.vendor_id;
    }

    @Watch("listQuery.vendor_type")
    onWatchVendorType() {
        //console.log("类型呗修改");
        if (this.myProxy.isMultChange) {
            this.myProxy.isMultChange = false;
        } else {
            this.myProxy.getFirstItemVendor();
            this.listQuery.page_count = 1;
            this.myProxy.api_plat_var_game_all_index();
            this.myProxy.getCurItemIndex();
        }
    }

    @Watch("listQuery.vendor_id")
    onWatchVendorId() {
        this.listQuery.page_count = 1;
        //console.log(" 厂商ID被修改");
        this.myProxy.getCurItemIndex();
        this.myProxy.api_plat_var_game_all_index();
    }

    getMore() {
        this.listQuery.page_count++;
        this.myProxy.api_plat_var_game_all_index();
    }

    showGameSearch() {
        LoginEnter(game_search.show);
    }

    destroyed() {
        super.destroyed();
    }
}
