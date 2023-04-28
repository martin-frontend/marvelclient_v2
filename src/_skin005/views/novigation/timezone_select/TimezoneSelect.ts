import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import PageBlur from "@/_skin005/core/PageBlur";
import Timezone from "@/core/Timezone";
import GameProxy from "@/proxy/GameProxy";

@Component
export default class TimezoneSelect extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    Timezone = Timezone.Instance;
    //@Prop() options!: any;
    @Prop() icons!: any;
    @Prop({ default: "100%" }) width!: string;
    @Prop({ default: "40" }) height!: string;
    @Prop({ default: 16 }) fontSize!: number;
    @Prop({ default: 22 }) iconSize!: number;
    @Prop({ default: true }) mini!: boolean;

    get options() {
        return this.Timezone.timezonename;
    }

    mounted() {}
    private onChange(value: any) {
        this.Timezone.setTimezone(value);
        if (
            this.$route.path.includes("page_game_play") ||
            this.$route.path.includes("page_game_soccer") ||
            this.$route.path.includes("cricket")
        ) {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.api_vendor_var_ori_product_show_var(gameProxy.currGame);
        }
        //Timezone.Instance.curTimezoneItem = value;
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        if (this.$mobile) {
            PageBlur.blur_page(this.isFilterChange);
        } else PageBlur.blur_mainpage(this.isFilterChange);
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }
}
