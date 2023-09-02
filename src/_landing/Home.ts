import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch, Vue } from "vue-property-decorator";

@Component
export default class Home extends AbstractView {
    constructor() {
        super();
    }
}
