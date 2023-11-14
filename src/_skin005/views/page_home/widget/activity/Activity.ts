import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import { moneyFormat } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";

@Component
export default class Activity extends AbstractView {
    @Prop({ default: 0 }) showDataType!: number;
    /**是否需要区别 手机版与 pc 版 */
    @Prop({ default: true }) isChangePhone!: boolean;
    LangUtil = LangUtil;
    //proxy
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    selfProxy = PanelUtil.getProxy_selfproxy;

    moneyFormat = moneyFormat;

    is_show_commission = GamePlatConfig.config.is_show_commission;

    /**判断登入 */
    get isUserLogin() {
        return this.selfProxy.userInfo.user_id ? true : false;
    }

    public get viewWidth(): number {
        if (SkinVariable.adjustBannerHeightFor08Skin) return this.viewWidthFor08Skin;

        if (this.$mobile) {
            if (this.$vuetify.breakpoint.width < 360) {
                return 80;
            }
            if (this.$vuetify.breakpoint.width < 500) {
                return 90;
            }
            if (this.$vuetify.breakpoint.width < 800) {
                return 130;
            }
            return 180;
        }
        if (this.$vuetify.breakpoint.width > 1700) {
            return 350;
        } else if (this.$vuetify.breakpoint.width > 1280) {
            return 265;
        }
        return 350;
        // return 240;
    }

    get viewWidthFor08Skin(): number {
        if (this.$mobile) {
            return this.$vuetify.breakpoint.width / (1440 / 450);
        } else if (this.$vuetify.breakpoint.width > 1700) {
            return 450;
        } else {
            return 340;
        }
    }

    public get box_height(): number {
        return this.$vuetify.breakpoint.width * (240 / 1048);
        return 180;
    }

    public get getShowData(): any {
        if (!this.showDataType || this.showDataType == 0) return this.noticeProxy.data.listType1;

        switch (this.showDataType) {
            case 2:
                return this.noticeProxy.data.listType4;
            case 8:
                return this.noticeProxy.data.listType5;
            case 16:
                return this.noticeProxy.data.listType6;
            case 32:
                return this.noticeProxy.data.listType7;
            case 64:
                return this.noticeProxy.data.listType8;
            case 4:
                return this.noticeProxy.data.listType9;
            case 128:
                return this.noticeProxy.data.listType10;
            case 216:
                return this.noticeProxy.data.listType16;
            case 217:
                return this.noticeProxy.data.listType17;
            case 20:
                return this.noticeProxy.data.listType20;
            default:
                break;
        }

        return [];
    }

    get resetData(): any {
        if (!this.isChangePhone) return this.getShowData;

        const list = <core.PlatNoticeVO[]>[];
        for (let index = 0; index < this.getShowData.length; index++) {
            const element = this.getShowData[index];
            if (this.$xsOnly) {
                if (element.img_url_phone && element.img_url_phone.trim()) {
                    list.push(element);
                }
            } else {
                if (element.img_url && element.img_url.trim()) {
                    list.push(element);
                }
            }
        }
        return list;
    }
    onBigItemClick(item: any) {
        PanelUtil.jumpTo(item);
    }

    goPageBouns() {
        PanelUtil.openpage_bonus();
    }

    goExtension() {
        PanelUtil.openpage_extension();
    }

    /**游戏挖矿 */
    goMine() {
        PanelUtil.openpage_mine();
    }

    goActivity() {
        PanelUtil.openpanel_activity();
    }

    goPageSwap() {
        PanelUtil.openpage_swap();
    }
}
