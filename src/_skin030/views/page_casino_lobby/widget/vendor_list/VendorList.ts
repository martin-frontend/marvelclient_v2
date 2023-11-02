import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin030/assets/Assets";
import Constant from "@/core/global/Constant";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class VendorList extends AbstractView {
    LangUtil = LangUtil;
    @Prop() data!: any;
    @Prop({ default: false }) isSingle!: boolean; //是否为单一展开显示
    @Prop({ default: 0 }) vendor_type!: number; //类型
    @Prop({ default: true }) isNeedTitle!: boolean; //是否需要标题
    CategoryIcon = Assets.CategoryIcon;

    get categoryName() {
        return LangUtil("游戏提供商");
        // return Constant.GameTypeText(this.vendor_type + "");
    }
    get itemWidth(): number {
        //return this.$mobile ? 132 : 181;
        const baseWidth = this.$mobile ? 132 : 181;
        if (!this.$mobile) return baseWidth;

        const offset = -12;
        const boxWidth = document.documentElement.clientWidth - offset;
        const aaa = Math.round(boxWidth / baseWidth);
        const itemWidth = boxWidth / aaa;
        // console.log("计算出来的 每个对象的宽度为", itemWidth);
        return itemWidth;
    }
    get isShow() {
        return this.data && this.data.length > 0;
    }
    onClickItem(item: any) {
        console.log("---厂商查找按钮 --", item);
        // PanelUtil.getProxy_get_pageCasinoLobbyProxy.api_plat_var_game_all_index_by_vendor(item.vendor_id);
        PanelUtil.openpanel_gamelist(0, parseInt( item.category));
    }
    get_img_path(item: any) {
        if (this.$mobile) {
            if (item.img_url_phone && item.img_url_phone != "") {
                return item.img_url_phone;
            }
        } else {
            if (item.img_url && item.img_url != "") {
                return item.img_url;
            }
        }
    }
}
