import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogNoticeDetailMediator from "../mediator/DialogNoticeDetailMediator";
import DialogNoticeDetailProxy from "../proxy/DialogNoticeDetailProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import OpenLink from "@/core/global/OpenLink";

@Component
export default class DialogNoticeDetail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNoticeDetailProxy = this.getProxy(DialogNoticeDetailProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogNoticeDetailMediator);
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
