import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class LightDark extends AbstractView {
    LangUtil = LangUtil;
    @Prop({default: true}) mini!:boolean;

    mounted(){
        //this.$vuetify.theme.dark = true;
    }

    onDark(){
        this.$vuetify.theme.dark = true;
    }

    onLight(){
        this.$vuetify.theme.dark = false;
    }
    onChange()
    {
        console.log("切换");
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$emit("onChange");
    }
}
