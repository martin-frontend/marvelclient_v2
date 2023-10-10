import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageCasinoLobbyMediator from "../mediator/PageCasinoLobbyMediator";
import PageCasinoLobbyProxy from "../proxy/PageCasinoLobbyProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import Assets from "@/_skin030/assets/Assets";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class PageCasinoLobby extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageCasinoLobbyProxy = this.getProxy(PageCasinoLobbyProxy);
    pageData = this.myProxy.pageData;

    CategoryIcon = Assets.CategoryIcon;
    core = core;
    casinoPageGameList = GameConfig.config.casinoPageGameList;
    constructor() {
        super(PageCasinoLobbyMediator);
    }
    destroyed() {
        super.destroyed();
    }

    mounted() {
        PanelUtil.showAppLoading(false);
        this.myProxy.init();
    }
    onTimeChange(val: any) {
        console.log("点击的值 为", val);
    }
    //体育/真人/彩票 使用 game/menu里面的数据
    public isUseMenuData(vendor_type: number): boolean {
        if (!this.casinoPageGameList) {
            this.casinoPageGameList = [1, 2, 4, 8, 16, 128, 256, 512];
        }
        if (vendor_type == 3) return false;
        if (this.casinoPageGameList.includes(vendor_type)) {
            return false;
        } else {
            return true;
        }
    }
    /** 返回分类的数据 */
    getCategoryData(type: number) {
        if (this.isUseMenuData(type)) {
            return this.myProxy.getCategoryDataByMenu(type);
        }
        /**获取分类中的数据 */
        return this.myProxy.getCategoryDataByCategory(type);
        // return this.myProxy.gameListAll[type].list;
    }
    getCategoryPageInfo(type: number) {
        if (this.isUseMenuData(type)) {
            return null;
        }
        return this.myProxy.gameListAll[type].pageInfo;
    }
    getMore(vendor_type: number, pageInfo: any) {
        const page = Number(pageInfo.pageCurrent) + 1;
        this.myProxy.api_plat_var_game_all_index(vendor_type, page);
    }
    getAllGame(vendor_type: number) {
        if (this.$mobile) {
            PanelUtil.showNovigation(false);
        }

        PanelUtil.openpanel_gamelist(vendor_type);
    }
    /**分类数据 */
    get categoryData() {
        const list = [0, 2, 4, 8, 16, 32, 64, 128];

        const newList = <any>[];
        for (let index = 0; index < list.length; index++) {
            const data = this.myProxy.getCategoryDataByCategory(list[index]);
            if (data.length > 0) {
                const tempData = this.myProxy.lobbyMenuIndex.filter((item: core.PlatLobbyIndexVO) => {
                    return item.vendor_type == list[index];
                });
                if (tempData && tempData.length > 0) {
                    newList.push(...tempData);
                }
            }
        }
        return newList;
    }
    get homeData() {
        const categoryData = this.myProxy.gameProxy.lobbyCategory;
        if (!categoryData || categoryData.length < 1) return [];

        const dataList = <any>{};

        //现将数据排序
        const sort_category = categoryData.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
            return b.tag_sort - a.tag_sort;
        });

        //将数据分组
        for (let index = 0; index < sort_category.length; index++) {
            const element = sort_category[index];

            if (!dataList[element.category]) {
                dataList[element.category] = <any>[];
            }
            dataList[element.category].push(element);
        }
        // // 将数据 排序
        const keys = Object.keys(dataList);
        for (let index = 0; index < keys.length; index++) {
            const element = dataList[keys[index]];
            element.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
                return b.index_no - a.index_no;
            });
        }
        console.log("重新分组的数据为", dataList);
        return dataList;
        // return this.myProxy.gameProxy.lobbyCategory;
    }
}
