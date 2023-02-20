import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class GoldInfoUtil extends AbstractView {
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    @Prop({ default: {} }) goldInfoData!: any; // 金币的数据
    @Prop({ default: {} }) coin_name_unique!: string; // 当前选择 或者 当前显示的 币种的名字
    @Prop({ default: 40 }) items_min_height!: number | string; //每个对象的 最小高度
    @Prop({ default: 14 }) font_size!: number | string; //文字的字号
    @Prop({ default: 14 }) font_size_icon!: number | string; //后面 上下变化的 图标的 字号
    @Prop({ default: 30 }) img_size!: number | string; //前面显示的图标的大小

    @Prop() inside_str!: string; //插入里面的字
    @Prop({ default: false }) is_need_coin_name!: boolean; //是否需要显示币种的名字
    @Prop({ default: true }) is_show_coin_icon!: boolean; //是否需要显示币种 的 图片
    @Prop({ default: true }) is_show_money!: boolean; //是否需要显示币种的金额

    @Prop({ default: false }) is_center!: boolean; //是否剧中




    public get iconfontsize_str(): string {
        return "text-" + this.font_size_icon;
        //return "text-24" ;
    }
    
    public get fontsize_str() : string {
        return "text-" + this.font_size; 
    }
    //
    public get detail_class() : string {
        let str = this.fontsize_str;
        if (this.is_need_coin_name)
        {
            str = str + " ml-auto";
        }
        return str
    }
    
    public get coin_class() : string {
        let str = this.fontsize_str;
        if (!this.is_show_money)
        {
            str = str + " mr-auto";
        }
        return str
    }
    

    //点击事件
    onItemClick(item: any) {
        this.$emit("onItemClick", item);
    }

}
