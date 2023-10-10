import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin030/assets/Assets";
import Constant from "@/core/global/Constant";

@Component
export default class GameList extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: null }) data!: any;
    @Prop() pageInfo!: any;
    @Prop({ default: false }) isSingle!: boolean; //是否为单一展开显示
    @Prop({ default: 0 }) vendor_type!: number; //类型
    @Prop({ default: true }) isNeedTitle!: boolean; //是否需要标题
    @Prop({ default: false }) isShowAllGames!: boolean; //是否需要标题
    @Prop({ default: 0 }) autoOffset!: number; //自定宽度的偏移量
    @Prop() category_name!: string; //

    CategoryIcon = Assets.CategoryIcon;

    itemWidth = 150;
    get categoryName() {
        
        return this.category_name || Constant.GameTypeText(this.vendor_type + "");
    }
    mounted() {
        this.$nextTick(() => {
            this.resetItemWidth();
        });
    }
    resetItemWidth() {
        //return this.$mobile ? 132 : 181;
        const baseWidth = this.$mobile ? 132 : 150;
        // if (!this.$mobile) return baseWidth;

        if (!this.$refs.game_list_card) {
            this.itemWidth = baseWidth;
            return baseWidth;
        }
        //@ts-ignore
        const card_width = this.$refs.game_list_card.$el.offsetWidth;
        const offset = 0;
        // const boxWidth = document.documentElement.clientWidth - offset;
        const boxWidth = card_width - offset - this.autoOffset;
        // console.warn("card -宽度---", boxWidth);
        const aaa = Math.round(boxWidth / baseWidth);
        const itemWidth = boxWidth / aaa;
        // console.warn("card -宽度-aaa--", aaa);
        // console.warn("card -宽度-itemWidth--", itemWidth);
        this.itemWidth = itemWidth;
        return itemWidth;
    }
    @Watch("data")
    onWatchData() {
        console.warn("---数据变化----");
        this.$nextTick(() => {
            this.resetItemWidth();
        });
    }
    // @Watch("autoOffset")
    // onWatchAutoOffset() {
    //     // console.warn("---数据变化----", this.data);
    //     this.$nextTick(() => {
    //         this.resetItemWidth();
    //     });
    // }
    get isShow() {
        return this.data && this.data.length > 0;
    }
    getMore() {
        this.$emit("getMore", this.vendor_type, this.pageInfo);
    }

    getAllGame() {
        this.$emit("getAllGame", this.vendor_type);
    }
}
