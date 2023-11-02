import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class ListNodata extends AbstractView {
    LangUtil = LangUtil;

    @Prop() height!: number;
    @Prop({ default: LangUtil("暂无记录") }) title!: string;

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
    public get nodataimg(): string {
        return require(`@/_skin030/assets/nodata.png`);
    }
}
