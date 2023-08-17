import Assets from "@/_skin005/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import PageGameListMediator from "../mediator/PageGameListMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import ScrollUtil, { scrollUtil_div } from "@/core/global/ScrollUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";

@Component
export default class PageGameList extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    gameProxy = PanelUtil.getProxy_gameproxy;
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    pageData = this.myProxy.pageData;
    listQuery = this.myProxy.listQuery;
    SkinVariable = SkinVariable;
    casinoPageGameList = GameConfig.config.casinoPageGameList;
    timer = 0;
    itemWidth = 181;
    public get viewWidth(): number {
        if (this.$mobile) {
            return 100;
        }
        if (this.$vuetify.breakpoint.width > 1400) {
            return 340;
        } else if (this.$vuetify.breakpoint.width > 1280) {
            return 290;
        }
        return 240;
    }
    constructor() {
        super(PageGameListMediator);
    }

    mounted() {
        this.resetItemWidth();

        this.$nextTick(() => {
            this.resetSelectType();
            if (this.isUseCategoryData && this.curCategoryData) {
                this.categoryName = Object.keys(this.curCategoryData)[0];
            }
        });

        this.myProxy.api_plat_var_game_all_index();
    }

    @Watch("$vuetify.breakpoint.width")
    resetItemWidth() {
        const pcItemBox = this.$refs.pcItemBox;
        if (pcItemBox) {
            const baseWidth = this.$mobile ? 110 : 181;
            //@ts-ignore
            const boxWidth = pcItemBox.$el.getBoundingClientRect().width;
            this.itemWidth = boxWidth / Math.round(boxWidth / baseWidth);
            if (this.$mobile) {
                this.itemWidth += 5;
            }
        }
    }

    @Watch("pageData.updateCount")
    onWatchUpdate() {
        this.resetItemWidth();
    }

    //是否为新的 需要 菜单栏
    public get isNeetMenu(): boolean {
        return true;
        //return GameConfig.config.menuType == "1";
    }
    //是否需要显示 厂商 列表
    public get isNeedVendor(): boolean {
        return this.isNeetMenu;
    }
    //体育/真人/彩票 使用 game/menu里面的数据
    public get isUseMenuData(): boolean {
        if (!this.isNeetMenu) return false;
        if (!this.casinoPageGameList) {
            this.casinoPageGameList = [1, 2, 8, 16, 128, 256, 512];
        }
        if (this.listQuery.vendor_type == 3) return false;
        if (this.casinoPageGameList.includes(this.listQuery.vendor_type)) {
            return false;
        } else {
            return true;
        }
    }
    //判断是否点击的当前的对象
    isCurItem(item: any) {
        return this.myProxy.isCurItem(item);
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
    onClick(item: any) {
        if (item) {
            PanelUtil.openpage_soccer(item);
        }
    }
    //手机版的时候 加载的本地图片地址
    getLocalIconPath(vendor_type: any) {
        return require(`@/_skin005/assets/categoryicon/${vendor_type}.png`);
    }

    public get tableMenu(): any {
        return this.myProxy.tableMenu;
    }

    public get curTotleData(): any {
        return this.myProxy.curTotleData;
    }

    public get curMenuVendorTypeName(): string {
        if (!this.curTotleData) {
            return "";
        }
        return LangUtil(this.curTotleData.vendor_type_name);
    }

    public get img_width(): number {
        return this.isUseMenuData ? 110 : 190;
        // if (this.listQuery.vendor_type == 4) {
        //     return 110;
        // } else if (this.listQuery.vendor_type == 32) {
        //     return 110;
        // } else if (this.listQuery.vendor_type == 64) {
        //     return 190;
        // } else {
        //     return 110;
        // }
    }

    //获取当前的菜单的数据
    getCurMenuData(isVendor: boolean = false) {
        return this.myProxy.getCurMenuData(isVendor);
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
            return "";
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
        //this.myProxy.listQuery.vendor_type = id;
        //PanelUtil.getProxy_novigation.categoryActive = id;
        PanelUtil.openpanel_gamelist(id);
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
        } else {
            return item.vendor_type;
        }
    }
    getItemCategoryName(item: any) {
        if (item.category_name) {
            return item.category_name;
        } else {
            return item.vendor_type_name;
        }
    }

    public get vendor_id(): number {
        return this.myProxy.listQuery.vendor_id;
    }

    @Watch("listQuery.vendor_type")
    onWatchVendorType() {
        if (this.myProxy.isMultChange) {
            this.myProxy.isMultChange = false;
        } else {
            this.myProxy.getFirstItemVendor();
            this.listQuery.page_count = 1;
            if (!this.isUseMenuData) {
                this.myProxy.api_plat_var_game_all_index();
                this.myProxy.clearData();
            }

            if (this.$refs.scrollObj) {
                ScrollUtil(0);
            }
            this.myProxy.getCurItemIndex();
        }
        this.myProxy.pageData.list = <any>[];
        this.resetSelectType();
    }

    @Watch("listQuery.vendor_id")
    onWatchVendorId() {
        this.listQuery.page_count = 1;
        this.myProxy.getCurItemIndex();
        this.myProxy.api_plat_var_game_all_index();
        this.myProxy.clearData();
        // if (this.isUseCategoryData) {
        //     this.categoryName = Object.keys(this.curCategoryData)[0];
        // }
        this.categoryIndex = 0;
    }

    getMore() {
        this.listQuery.page_count++;
        this.myProxy.api_plat_var_game_all_index();
    }

    showGameSearch() {
        //LoginEnter(game_search.show);
    }

    destroyed() {
        PanelUtil.getProxy_novigation.categoryActive = 0;
        this.myProxy.clearData();
        clearInterval(this.timer);
        super.destroyed();
    }

    get categoryData() {
        switch (this.listQuery.vendor_type) {
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

    categoryIndex = 0;
    categoryName = "";
    onBtnClickCategory(item: any) {
        console.log("收到点击", item);
        this.categoryName = item;
    }
    isCurCategoryItem(item: any) {
        return false;
    }
    get isUseCategoryData() {
        return this.categoryData.length > 0;
    }
    get curListData() {
        return this.curCategoryData[this.categoryName] || [];
    }
    categoryTitle = <any>[];
    public get curCategoryData(): any {
        if (!this.categoryData || this.categoryData.length < 1) return [];

        const dataList = <any>{};

        //现将数据排序
        const sort_category = this.categoryData.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
            return b.tag_sort - a.tag_sort;
        });
        this.categoryTitle = <any>[];
        dataList[LangUtil("全部游戏")] = <any>[];
        this.categoryTitle.push(LangUtil("全部游戏"));

        //将数据分组
        for (let index = 0; index < sort_category.length; index++) {
            const element = sort_category[index];

            if (!dataList[element.category]) {
                dataList[element.category] = <any>[];
            }
            if (element.icon_name) {
                if (this.categoryTitle.indexOf(element.category) == -1) {
                    this.categoryTitle.push(element.category);
                }
            }
            dataList[element.category].push(element);
            dataList[LangUtil("全部游戏")].push(element);
        }

        // // 将数据 排序
        const keys = Object.keys(dataList);
        for (let index = 0; index < keys.length; index++) {
            const element = dataList[keys[index]];
            element.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
                return b.index_no - a.index_no;
            });
        }

        // console.log("重新分组的数据为", dataList);

        this.categoryName = LangUtil("全部游戏");
        this.categoryIndex = 0;
        return dataList;
    }
    get histpry_game_list() {
        //console.log("读取  游戏列表", this.gameProxy.gameHistoryList);
        return this.gameProxy.gameHistoryList;
    }
    onClearHistory() {
        PanelUtil.message_confirm({
            message: LangUtil("是否清除游戏记录"),
            okFun: () => {
                this.gameProxy.deleteGameHistoryAll();
            },
            okTxt: LangUtil("清除"),
        });
    }
    get selectType() {
        if (!this.isUseCategoryData) {
            return ["厂商分类"];
        }
        return ["标签分类", "厂商分类"];
    }
    curSelectType = 0;
    onChange() {
        console.log("---切换----", this.curSelectType);
    }
    resetSelectType() {
        if (!this.isUseCategoryData) {
            this.curSelectType = 1;
            return;
        }
        this.curSelectType = -1;
        if (SkinVariable.isUseVendorType) {
            this.curSelectType = 1;
            return;
        }
        if (this.isUseCategoryData) {
            this.curSelectType = 0;
            return;
        }
        if (!this.isUseMenuData) {
            this.curSelectType = 1;
            return;
        }
    }
    @Watch("gameProxy.isFirstGetGameCategory")
    initSelectType() {
        this.resetSelectType();
    }
}
