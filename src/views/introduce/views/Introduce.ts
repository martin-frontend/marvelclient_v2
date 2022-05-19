import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import IntroduceMediator from "../mediator/IntroduceMediator";
import IntroduceProxy from "../proxy/IntroduceProxy";

@Component
export default class Introduce extends AbstractView {
    myProxy: IntroduceProxy = this.getProxy(IntroduceProxy);
    pageData = this.myProxy.pageData;
    pageImage = this.myProxy.pageImage;

    constructor() {
        super(IntroduceMediator);
    }

    handleTest() {
        // console.log("CLICK!!!", this.pageImage.cat);
    }
}
