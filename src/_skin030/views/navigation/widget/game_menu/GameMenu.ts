import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class GameMenu extends AbstractView {
    LangUtil = LangUtil;
    @Prop() data!: any;
    @Prop({ default: false }) isShow!: boolean;
    /** 每个 游戏对象的大小 */
    @Prop({ default: () => ({ width: 160, height: 220 }) }) cardSize!: Object;
    /** 每个牌之间的间距 */
    @Prop({ default: () => ({ width: 8, height: 0 }) }) card_offset!: Object;

    reflush = false;
    mounted() {
        setTimeout(() => {
            this.reflush = true;
        }, 100);
    }

    getIcon(item: any) {
        if (!item || !item.menu_icon) {
            return "";
        }
        return item.menu_icon;
    }
    gameSelectIdx = 0;

    isNomalState(item: any) {
        return item.status == 1;
    }
    onClick(item: any) {
        PanelUtil.getProxy_navigation.closeMenu();
        if (!item) return;

        console.log(" 点击  ");
        if (item.entrance_type == 2) {
            //是游戏
            this.goGamePlay(item);
        } else if (item.entrance_type == 1) {
            PanelUtil.openpanel_gamelist(item.vendor_type, item.vendor_id);
        } else {
            console.log("无效--- ", item);
        }
    }

    public get text_detail(): string {
        const str = this.data.vendor_type + "选择描述信息";
        return LangUtil(str);
    }

    goGamePlay(item: any) {
        PanelUtil.openpage_soccer(item);
    }
    get getImgPath(): any {
        try {
            return require(`@/_skin030/assets/navigation/menu_icon_${this.data.vendor_type}.png`);
        } catch (error) {
            // Handle the exception/error here
            //console.error('An error occurred while requiring the image:', error);
            return "";
        }

        //return require(`@/_skin030/assets/navigation/menu_icon_16.png`);
        // return require(`@/_skin030/assets/navigation/menu_icon_${this.data.vendor_type}.png`);
    }

    public get cardMinheight(): number {
        const nub = Math.ceil(this.data.list.length / 8);
        //return nub * 100;
        return nub;
    }

    public get hangshu(): number {
        return Math.ceil(this.data.list.length / 2);
    }
}
