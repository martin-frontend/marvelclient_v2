import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import page_game_list from "@/views/page_game_list";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSlideGroup extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    @Prop() data!: any;
    @Prop() bShowAll!: boolean;
    onShowAll() {
        page_game_list.show(this.data.category);
    }

    mounted() {
        this.onWatchBreakPoint();
    }

    @Watch("$vuetify.breakpoint.width")
    onWatchBreakPoint() {
        this.$nextTick(() => {
            const box: any = this.$refs.box;
            const viewBtn: any = this.$refs.viewBtn;
            box.style.setProperty("--next-right", viewBtn.clientWidth + 22 + "px");
            box.style.setProperty("--prev-right", viewBtn.clientWidth + 22 + 35 + "px");
        });
    }
}
