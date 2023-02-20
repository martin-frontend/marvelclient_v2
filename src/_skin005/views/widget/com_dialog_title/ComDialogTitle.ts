import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class ComDialogTitle extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: "" }) title!: String;
    @Prop({ default: false }) isDialog!: boolean;
    @Prop({ default: true }) isNeedClose!: boolean;
    @Prop({ default: null }) isSetChange!: boolean | undefined;


    onClose(){
        this.$emit("onClose");
    }

    //检测是否需要切换，
    public get isMoble() : boolean {
        if (this.isSetChange == null)
        {
            return this.$vuetify.breakpoint.xsOnly;
        } 
        else
        {
            return this.isSetChange;
        }
    }
    
}
