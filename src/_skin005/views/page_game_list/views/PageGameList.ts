import Assets from "@/_skin005/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Watch, Component } from "vue-property-decorator";
import PageGameListMediator from "../mediator/PageGameListMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";
import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageGameList extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    gameProxy = PanelUtil.getProxy_gameproxy;
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    pageData = this.myProxy.pageData;
    listQuery = this.myProxy.listQuery;

    itemWidth = 181;
    public get viewWidth(): number {

        if (this.$vuetify.breakpoint.mobile) {
            return 100;
        }
        if (this.$vuetify.breakpoint.width > 1400) {
            return 340;
        }
        else if (this.$vuetify.breakpoint.width > 1280) {
            return 290;
        }
        return 240;
    }
    constructor() {
        super(PageGameListMediator);
    }

    mounted(){
        this.$nextTick(()=>{
            this.onWatchWidth();
        })
    }

    @Watch("$vuetify.breakpoint.width")
    onWatchWidth() {
        const pcItemBox = this.$refs.pcItemBox;
        if (pcItemBox) {
            const baseWidth = this.$vuetify.breakpoint.mobile ? 120 : 181;
            //@ts-ignore
            const boxWidth = pcItemBox.$el.getBoundingClientRect().width;
            console.warn("Math.round(boxWidth / 181): ", Math.round(boxWidth / baseWidth));
            this.itemWidth = boxWidth / Math.round(boxWidth / baseWidth);
            if(this.$vuetify.breakpoint.mobile){
                this.itemWidth += 5;
            }
            console.warn(">>>>>itemWidth: ", this.itemWidth);
        }
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
        if (this.listQuery.vendor_type == 4 || this.listQuery.vendor_type == 32 || this.listQuery.vendor_type == 64) return true;

        return false;
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
        if (this.listQuery.vendor_type == 4) {
            return 110;
        } else if (this.listQuery.vendor_type == 32) {
            return 110;
        } else if (this.listQuery.vendor_type == 64) {
            return 190;
        } else {
            return 110;
        }
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
        this.myProxy.listQuery.vendor_type = id;
        PanelUtil.getProxy_novigation.categoryActive = id;
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
        //console.log("类型呗修改");
        if (this.myProxy.isMultChange) {
            this.myProxy.isMultChange = false;
        } else {
            this.myProxy.getFirstItemVendor();
            this.listQuery.page_count = 1;
            if (!this.isUseMenuData)
            {
                console.log("------asdas");
                this.myProxy.api_plat_var_game_all_index();
            }
            
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
        //LoginEnter(game_search.show);
    }

    destroyed() {
        super.destroyed();
    }


}
