import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import LoginEnter from "@/_skin030/core/global/LoginEnter";
import SkinVariable from "@/_skin030/core/SkinVariable";

@Component
export default class GameItem extends AbstractView {
    LangUtil = LangUtil;

    @Prop() item!: any;
    @Prop({ default: false }) useMenuData!: Boolean;
    @Prop() width!: number;
    @Prop() height!: number;

    @Prop({ default: false }) isPageHome!: Boolean;
    getIcon(item: any) {
        return this.useMenuData ? item.entrance_icon : item.icon;
    }

    get getTag() {
        if (!this.item.tags) return "";
        if (this.item.tags.length == 0) return "";
        // 1-新 2-火热
        return this.item.tags[0] == 1 ? require("@/assets/tag/new.png") : require("@/assets/tag/hot.png");
    }

    getBoxClass() {
        // if (this.$mobile) {
        //     return "";
        // } else {
            let classStr = "box";
            if (this.item) {
                classStr += " box-height";
                if (this.item.status != 1) {
                    classStr += " filter-gray";
                }
            }
            // if (!this.$mobile) {
            classStr += " box_margin";
            // } else {
            //     classStr += " box_margin_mob";
            // }
            return classStr;
        // }
    }
    get title_height() {
        if (!this.$mobile) {
            return 44;
        }
        if (!this.isPageHome) {
            return 30;
        }
        return 36;
    }
    get isNomalState() {
        if (!this.item) return true;
        return this.item.status == 1;
    }
    goGamePlay() {
        if (!this.item) {
            console.log("对象为空");
            return;
        }
        //从公告管理中配置跳转过来的
        if (this.item.jumpType == 1) {
            console.log("---收到点击 对象", this.item);
            if (!PanelUtil.jumpTo(this.item)) {
                console.log("不能跳转");
            }
            return;
        }
        if (this.item && this.item.path) {
            if (this.item.category) {
                PanelUtil.openpanel_gamelist(this.item.category);
            } else if (this.item.path == "/cricket") {
                PanelUtil.openpage_soccer_cricket();
            } else if (this.item.path == "/page_game_soccer") {
                PanelUtil.openpage_soccer();
            }
            return;
        }
        if (this.item) {
            if (this.isNomalState) {
                if (this.item.visitor_allowed == 1) {
                    PanelUtil.openpage_soccer(this.item);
                } else {
                    LoginEnter(() => {
                        PanelUtil.openpage_soccer(this.item);
                    });
                }
            } else {
                PanelUtil.message_alert(LangUtil("{0}正在维护", this.item.vendor_product_name));
            }
        }
    }

    @Watch("item")
    filterChange(val: boolean) {}

    onClickItem() {
        console.log("---dasd --");
    }
    get isNeetPlayBtn() {
        return SkinVariable.gameIconType == 1;
    }
}
