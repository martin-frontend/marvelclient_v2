import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch, Vue } from "vue-property-decorator";

@Component
export default class APP extends AbstractView {
    constructor() {
        super();
    }
}
