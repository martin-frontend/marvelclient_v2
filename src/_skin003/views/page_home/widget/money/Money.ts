import AbstractView from "@/core/abstract/AbstractView";
import { moneyFormat } from "@/core/global/Functions";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear, Elastic } from "gsap";

@Component
export default class Money extends AbstractView {
    @Prop() value!: any;
    @Prop({ default: 40 }) fontSize!: number;
    @Prop({ default: 22 }) itemWidth!: number;
    @Prop({ default: 60 }) itemHeight!: number;
    money = "$";

    mounted() {
        if (this.value != 0) {
            const m = moneyFormat(this.value);
            this.money = m.substring(0, m.length - 3);
            this.animate();
        }
    }

    @Watch("value")
    onValueChange() {
        const m = moneyFormat(this.value);
        this.money = m.substring(0, m.length - 3);
        this.animate();
    }

    animate() {
        this.$nextTick(() => {
            //@ts-ignore
            const divArr: any = Array.from(this.$refs.nums);
            divArr.sort((a: any, b: any) => {
                const da = a.getAttribute("idx");
                const db = b.getAttribute("idx");
                return parseInt(da) < parseInt(db) ? -1 : 1;
            });

            const len = divArr.length;
            for (let i = 0; i < len; i++) {
                const item = divArr[i];
                const data = item.getAttribute("data");
                gsap.fromTo(
                    item,
                    { y: this.itemHeight * 5 },
                    {
                        y: -this.itemHeight * 5,
                        duration: 1,
                        repeat: i,
                        ease: Linear.easeNone,
                        onComplete: this.onCompleteEnd(item, parseInt(data)),
                    }
                );
            }
        });
    }

    onCompleteEnd(item: any, data: any) {
        return () => {
            gsap.fromTo(
                item,
                { y: this.itemHeight * 5 },
                { y: this.itemHeight * 5 - this.itemHeight * data, duration: 1, ease: "elastic.out(1, 0.3)" }
            );
        };
    }

    checkNum(value: string) {
        return /[0-9]/.test(value);
    }
}
