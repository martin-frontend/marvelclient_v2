import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Advertise extends AbstractView {
    listData = [
        {
            name: "CF SWAP正式上线",
            img_min: require("@/assets/ad/ad1.min.webp"),
            img: require("@/assets/ad/ad1.webp"),
        },
        {
            name: "寻CF赌神，分亿元CFBC",
            img_min: require("@/assets/ad/ad2.min.webp"),
            img: require("@/assets/ad/ad2.webp"),
        },
        {
            name: "三重洗码百万奖池分红",
            img_min: require("@/assets/ad/ad3.min.webp"),
            img: require("@/assets/ad/ad3.webp"),
        },
        {
            name: "全球百家乐锦标赛",
            img_min: require("@/assets/ad/ad4.min.webp"),
            img: require("@/assets/ad/ad4.webp"),
        },
        {
            name: "集奖券领路虎卫士",
            img_min: require("@/assets/ad/ad5.min.webp"),
            img: require("@/assets/ad/ad5.webp"),
        },
    ];
    selectIndex = 0;

    onItemClick(item: any) {
        this.selectIndex = this.listData.indexOf(item);
    }
}
