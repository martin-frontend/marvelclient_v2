import AbstractView from "@/core/abstract/AbstractView";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import { Watch, Component } from "vue-property-decorator";
import DialogActivityDetailMediator from "../mediator/DialogActivityDetailMediator";
import DialogActivityDetailProxy from "../proxy/DialogActivityDetailProxy";
import OpenLink from "@/core/global/OpenLink";
import PanelUtil from "@/_skin030/core/PanelUtil";

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
    handleLinkClick(event: any) {
        // event.preventDefault();
        // 检查点击的目标元素是否是超链接
        let targetLink = event.target.closest("a") || event.target.parentNode.closest("a");

        if (!targetLink && event.target.tagName === "BUTTON") {
            const btn = event.target.closest("button");
            if (btn) targetLink = btn.querySelector("a");
        }
        if (targetLink) {
            // 取消默认的链接跳转行为
            event.preventDefault();
            const targetUrl = targetLink.href;
            //提取targetLink中的原始的值
            const targetUrlOrigin = targetLink.getAttribute("href");
            const obj = {
                open_mode_url: targetUrlOrigin,
            };
            if (PanelUtil.isCanJump(obj)) {
                PanelUtil.jumpTo(obj);
                this.onClose();
            } else {
                PanelUtil.jumpTo({
                    open_mode_url: targetUrl,
                });
            }
        }
    }
}
