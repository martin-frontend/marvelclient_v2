import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class AdvertiseInLogin extends AbstractView {
    @Prop({ default: 654 }) height!: number;
    advertiseData = [
        { img: "https://staticff.kvwuua.com/group1/M00/00/24/rBQVwGIOFBSAevwYAAC2QEz_gcA41.webp", url: "" },
        { img: "https://staticff.kvwuua.com/group2/M00/02/C0/rBQVwWJWlC6AfNqpAADqlBkQuZ041.webp", url: "" },
    ];
}
