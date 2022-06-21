import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/assets/Assets";

@Component
export default class ListNodata extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    @Prop() height!: number;

    boxHeight = 0;

    mounted() {
        if (this.height) {
            this.boxHeight = this.height;
        } else {
            this.$nextTick(() => {
                const nodata: any = this.$refs.nodata;
                this.boxHeight = (window.screen.height - nodata.offsetTop) / 2 + 50;
            });
        }
    }
}
