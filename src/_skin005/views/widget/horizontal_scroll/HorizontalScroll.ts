import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import ScrollUtil from "@/core/global/ScrollUtil";
import gsap, { Linear } from "gsap";

@Component
export default class HorizontalScroll extends AbstractView {
    LangUtil = LangUtil;

    @Prop({ default: 0 }) offsetx!: number;

    //拖动参数
    dragData = {
        isMoving: false,
        x: 0,
        left: 0,
    };
    mounted() {
        const buttons = this.$el.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                this.scrollToButton(button, <any>this.$refs.divbox);
            });
        });
    }

    onMouseDown(event: any) {
        this.dragData.isMoving = true;
        this.dragData.x = event.pageX;
        //@ts-ignore
        const divbox: HTMLElement = this.$refs.divbox;
        this.dragData.left = divbox.scrollLeft;
    }

    onMouseout(event: any) {
        this.dragData.isMoving = false;
    }
    onMouseUp(event: any) {
        this.dragData.isMoving = false;
    }
    onMouseMove(event: any) {
        if (this.dragData.isMoving) {
            //@ts-ignore
            const divbox: HTMLElement = this.$refs.divbox;
            const distanceX = event.pageX - this.dragData.x;
            divbox.scrollLeft = this.dragData.left - distanceX;
        }
    }
    scrollToButton(button: HTMLElement, container: HTMLElement) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const distanceLeft = buttonRect.left - containerRect.left - 30;
        const distanceRight = buttonRect.right - containerRect.right + 30;

        if (buttonRect.left < containerRect.left) {
            gsap.to(container, {
                duration: 0.2,
                scrollLeft: container.scrollLeft + distanceLeft,
                ease: Linear.easeNone,
            });
        } else if (buttonRect.right > containerRect.right) {
            gsap.to(container, {
                duration: 0.2,
                scrollLeft: container.scrollLeft + distanceRight,
                ease: Linear.easeNone,
            });
        }
    }
}
