import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import gsap, { Linear } from "gsap";

@Component
export default class HorizontalScroll extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: 0 }) offsetx!: number;
    @Prop({ default: false }) isNeedArrow!: boolean;
    @Prop({ default: 100 }) moveStep!: number;

    @Prop() updateCount!: number;
    isLeft = false;
    isRight = false;
    isCanScroll = true;
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

        const scroll_button_item = this.$el.querySelectorAll(".scroll_button_item");
        scroll_button_item.forEach((button) => {
            button.addEventListener("click", () => {
                //@ts-ignore
                this.scrollToButton(button, <any>this.$refs.divbox);
            });
        });
        this.refreshState();
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
        this.refreshState();
    }
    onMouseUp(event: any) {
        this.dragData.isMoving = false;
        this.refreshState();
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
                onComplete: () => {
                    this.refreshState();
                },
            });
        } else if (buttonRect.right > containerRect.right) {
            gsap.to(container, {
                duration: 0.2,
                scrollLeft: container.scrollLeft + distanceRight,
                ease: Linear.easeNone,
                onComplete: () => {
                    this.refreshState();
                },
            });
        }
    }
    scrollToItem(item: HTMLElement) {
        this.scrollToButton(item, <any>this.$refs.divbox);
    }
    refreshState() {
        this.$nextTick(() => {
            const container = <any>this.$refs.divbox;
            // const width = container.scrollWidth - container.clientWidth;
            this.isCanScroll = container.scrollWidth > container.clientWidth;
            console.warn("--->>>", this.isCanScroll);
            this.isLeft = Math.abs(container.scrollLeft) < 10;
            this.isRight = Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) < 10;
        });
    }
    /**向左滑动 */
    scrollTo(value: number) {
        const container = <any>this.$refs.divbox;
        gsap.to(container, {
            duration: 0.2,
            scrollLeft: container.scrollLeft + value,
            ease: Linear.easeNone,
            onComplete: () => {
                this.refreshState();
            },
        });
    }
    onLeft() {
        if (this.isLeft) return;
        this.scrollTo(-1 * this.moveStep);
    }
    onRight() {
        if (this.isRight) return;
        this.scrollTo(this.moveStep);
    }
    @Watch("updateCount")
    onWatchScreen() {
        this.refreshState();
    }
}
