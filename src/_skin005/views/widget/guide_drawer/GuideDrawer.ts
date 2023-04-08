import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import LangConfig from "@/core/config/LangConfig";

@Component
export default class GuideDrawer extends AbstractView {
    LangUtil = LangUtil;

    core = core;
    onClose() {
        console.log("关闭");
        this.$emit("onClose");
        //this.isShow = false;
    }

    get guideImg() {
        return LangConfig.getRouterLang().includes("zh") ? require("@/assets/guide/img03.png") : require("@/assets/guide/img04.png");
    }
}
