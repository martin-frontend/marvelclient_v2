import AbstractView from "@/core/abstract/AbstractView";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityDetailMediator from "../mediator/DialogActivityDetailMediator";
import DialogActivityDetailProxy from "../proxy/DialogActivityDetailProxy";
import OpenLink from "@/core/global/OpenLink";

@Component
export default class DialogActivityDetail extends AbstractView {
    myProxy: DialogActivityDetailProxy = this.getProxy(DialogActivityDetailProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogActivityDetailMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.$nextTick(() => {
                const mainNode = document.getElementById("main_node");
                if (mainNode) {
                    //console.log("回到顶部");
                    mainNode.scrollTop = 0;
                }
            });
        }
    }
}
