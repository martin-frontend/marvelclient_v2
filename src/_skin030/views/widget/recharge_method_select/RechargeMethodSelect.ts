import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { amountFormat } from "@/core/global/Functions";

interface MethodFace {
    explain: string;
    is_fixed_gold: number;
    max_gold: string;
    min_gold: string;
    name: string;
    payemthod_id: number;
    paymethod_enname: string;
    recharge_channel_id: number;
    subtitle: string;
}

@Component
export default class GoldInfoUtil extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    GamePlatConfig = GamePlatConfig;
    selfProxy = PanelUtil.getProxy_selfproxy;
    @Prop({ default: {} }) methodOptions!: Record<string, MethodFace>; // 支付通道的数据
    @Prop({ default: {} }) curChannel!: string; // 当前选择 或者 当前显示的 支付通道的编号
    @Prop({ default: 40 }) items_min_height!: number | string; //每个对象的 最小高度
    @Prop({ default: 14 }) font_size!: number | string; //文字的字号
    @Prop({ default: 14 }) font_size_icon!: number | string; //后面 上下变化的 图标的 字号
    @Prop({ default: 23 }) img_size!: number | string; //前面显示的图标的大小

    @Prop() inside_str!: string; //插入里面的字
    @Prop({ default: true }) is_show_coin_icon!: boolean; //是否需要显示币种 的 图片
    @Prop({ default: true }) is_show_money!: boolean; //是否需要显示币种的金额

    @Prop({ default: false }) is_center!: boolean; //是否剧中

    @Prop() balanceStrColor!: string;
    @Prop({ default: "bgBanner" }) bgColor!: string;

    @Prop({ default: false }) is_recharge!: boolean; //是否为 充值中的 金币

    @Prop({ default: true }) formatNumber!: boolean;

    public get fontsize_str(): string {
        return "text-" + this.font_size;
    }

    public get userGoldInfo(): any {
        return this.selfProxy.userInfo.gold_info;
    }

    //点击事件
    onItemClick(item: any) {
        this.$emit("onItemClick", item);
    }

    get isDisabled() {
        if (!this.methodOptions) return true;
        const keys = Object.keys(this.methodOptions);

        return keys.length < 2;
    }
}
