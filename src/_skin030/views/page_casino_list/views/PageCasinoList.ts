import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageCasinoListMediator from "../mediator/PageCasinoListMediator";
import PageCasinoListProxy from "../proxy/PageCasinoListProxy";
import LangUtil from "@/core/global/LangUtil";
import Constant from "@/core/global/Constant";
import PanelUtil from "@/_skin030/core/PanelUtil";

const challengeImages = [
    require("@/_skin030/assets/challenges/challenges_1.png"),
    require("@/_skin030/assets/challenges/challenges_2.png"),
    require("@/_skin030/assets/challenges/challenges_3.png"),
    require("@/_skin030/assets/challenges/challenges_4.png"),
];
@Component
export default class PageCasinoList extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageCasinoListProxy = this.getProxy(PageCasinoListProxy);
    pageData = this.myProxy.pageData;
    onClearHistory = this.myProxy.onClearHistory;
    challengeImages = challengeImages;

    menu = false;
    constructor() {
        super(PageCasinoListMediator);
    }
    destroyed() {
        super.destroyed();
    }

    mounted() {
        this.$nextTick(() => {
            this.myProxy.isReady = true;
            this.myProxy.init();
        });
    }
    /** 显示的标题 */
    getTittle() {
        if (this.myProxy.isVendor) {
            return LangUtil("游戏提供商");
        }
        if (this.myProxy.listQuery.vendor_type == 0 && this.myProxy.listQuery.vendor_id != 0) {
            const fitterArr = this.vendorData.filter((ele: any) => {
                return ele.category == this.myProxy.listQuery.vendor_id + "";
            });
            if (fitterArr && fitterArr.length > 0) {
                return fitterArr[0].name;
            }
            console.warn("没有找对对应的数据", this.myProxy.listQuery.vendor_id);
            console.warn("没有找对对应的数据", this.vendorData);
            return "";
        }
        const name = Constant.GameTypeText(this.myProxy.listQuery.vendor_type + "");
        return name;
    }
    /**当前路由显示的背景图片 */
    getRouteImg() {
        if (this.myProxy.listQuery.vendor_type == 0 && this.myProxy.listQuery.vendor_id != 0) {
            return require(`@/_skin030/assets/pagehome/category_vendor.png`);
            // const fitterArr = PanelUtil.getProxy_gameproxy.menu_vendor_data.filter((ele: any) => {
            //     return ele.vendor_id == this.myProxy.listQuery.vendor_id;
            // });
            // if (fitterArr && fitterArr.length > 0) {
            //     return fitterArr[0].vendor_icon;
            // }
            // return "";
        }
        if (this.myProxy.isVendor) {
            return require(`@/_skin030/assets/pagehome/category_vendor.png`);
        }
        if (!this.myProxy.listQuery.vendor_type) {
            return require(`@/_skin030/assets/pagehome/category_vendor.png`);
        }
        return require(`@/_skin030/assets/pagehome/category_${this.myProxy.listQuery.vendor_type}.png`);
    }

    /**显示的游戏列表 */
    get listData() {
        return this.myProxy.pageData.list || [];
    }
    /**厂商列表 */
    get vendorData() {
        return PanelUtil.getProxy_noticeProxy.data.listType19;
        // return PanelUtil.getProxy_gameproxy.menu_vendor_data;
    }
    /**获取更多 */
    getMore(vendor_type: number, pageInfo: any) {
        const page = Number(pageInfo.pageCurrent) + 1;
        this.myProxy.listQuery.page_count = page;
        this.myProxy.api_plat_var_game_all_index();
    }
    get img_width() {
        if (this.myProxy.listQuery.vendor_type == 0 && this.myProxy.listQuery.vendor_id != 0) {
            return !this.$mobile ? 388 : 317;
        }
        return !this.$mobile ? 388 : 317;
    }
    challengeImageHeight = 755;
    get mobileChallengesHeight() {
        const rowGap = 16;
        return this.challengeImages.length * (this.challengeImageHeight + rowGap);
    }
    @Watch("menu")
    onWatchFitleMenu() {
        if (!this.menu) {
            this.myProxy.api_plat_var_game_all_index();
        }
    }

    get isVendorPage() {
        return !this.myProxy.listQuery.vendor_type && this.myProxy.listQuery.vendor_id;
    }
}
