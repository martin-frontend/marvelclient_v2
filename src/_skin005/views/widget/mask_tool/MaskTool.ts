import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GlobalVar from "@/core/global/GlobalVar";
import LoginEnter from "@/_skin005/core/global/LoginEnter";

@Component
export default class MaskTool extends AbstractView {
    LangUtil = LangUtil;

    GlobalVar  = GlobalVar;

    onClickItem()
    {
        console.log("点击 锁定 按钮");
        LoginEnter(()=>{});
    }
}
