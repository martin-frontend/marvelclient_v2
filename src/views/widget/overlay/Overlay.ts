import AbstractView from "@/core/abstract/AbstractView";
import { Prop } from "vue-property-decorator";

export default class Overlay extends AbstractView {
    @Prop() loading!:boolean;
}
