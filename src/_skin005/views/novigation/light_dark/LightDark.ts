/*
 * @Author: custer
 * @Date: 2023-04-12 09:57:51
 * @LastEditors: custer
 * @LastEditTime: 2023-10-19 20:45:24
 */
import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class LightDark extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: true }) mini!: boolean;

    mounted() {
        //this.$vuetify.theme.dark = true;
    }

    onDark() {
        this.$vuetify.theme.dark = true;
        localStorage.setItem("theme", "dark");
    }

    onLight() {
        this.$vuetify.theme.dark = false;
        localStorage.setItem("theme", "light");
    }
    onChange() {
        console.log("切换");
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$emit("onChange");
        localStorage.setItem("theme", this.$vuetify.theme.dark ? "dark" : "light");
    }
}
