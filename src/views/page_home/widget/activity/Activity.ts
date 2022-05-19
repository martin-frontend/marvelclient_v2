import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import router from "@/router";

@Component
export default class Activity extends AbstractView {
    goExtension() {
        router.push("/page_extension");
    }
}
