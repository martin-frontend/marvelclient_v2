import AbstractView from "@/core/abstract/AbstractView";
import { moneyFormat } from "@/core/global/Functions";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear, Elastic } from "gsap";

@Component
export default class Money extends AbstractView {
    @Prop() value!: any;
    money = "$";

    mounted() {
        this.money = moneyFormat(this.value);
        this.animate();
    }

    @Watch("value")
    onValueChange() {
        this.money = moneyFormat(this.value);
        this.animate();
    }

    animate() {
        this.$nextTick(() => {
            let i = 0;
            //@ts-ignore
            for (const item of this.$refs.nums) {
                const data = item.getAttribute("data");
                gsap.fromTo(
                    item,
                    { y: 360 },
                    { y: -360, duration: 1, repeat: i, ease: Linear.easeNone, onComplete: this.onCompleteEnd(item, parseInt(data)) }
                );
                i++;
            }
        });
    }

    onCompleteEnd(item: any, data: any) {
        return () => {
            gsap.fromTo(item, { y: 360 }, { y: 360 - 72 * data, duration: 1, ease: "elastic.out(1, 0.3)" });
        };
    }

    checkNum(value: string) {
        return /[0-9]/.test(value);
    }
}
