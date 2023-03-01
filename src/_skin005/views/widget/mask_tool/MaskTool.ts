import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class MaskTool extends AbstractView {
    LangUtil = LangUtil;

    GlobalVar  = GlobalVar;

}
