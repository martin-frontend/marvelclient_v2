import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Question extends AbstractView {
    @Prop() questions!: any;
    LangUtil = LangUtil;
}
