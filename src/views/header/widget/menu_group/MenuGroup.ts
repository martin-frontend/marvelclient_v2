import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class MenuGroup extends AbstractView {
    @Prop() icon!: string;
    @Prop() title!: string;
    bShow = false;
}
