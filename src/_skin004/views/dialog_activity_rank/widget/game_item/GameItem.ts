import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import gsap, { Linear, Elastic } from "gsap";

@Component
export default class GameItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() item!: any;

    onItemClick() {
        this.$emit("onItemClick", this.item);
    }
    mounted() {
        this.$nextTick(() => {
            this.anim_round();
        });
    }
    anim_round() {
        if (!this.$refs.text_node) return;
        //@ts-ignore
        const obj = this.$refs.text_node.$el;
        const tl = gsap.timeline();

        tl.to(obj, {
            duration: 0,
            x: 23,
            y: -9,
            rotate: 45,
        });
        tl.play();
    }
}
