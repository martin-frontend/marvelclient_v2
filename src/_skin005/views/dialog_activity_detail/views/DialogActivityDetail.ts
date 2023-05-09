import AbstractView from "@/core/abstract/AbstractView";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
import PanelUtil from "@/_skin005/core/PanelUtil";
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
    handleLinkClick(event: any) {
        // 检查点击的目标元素是否是超链接
        if (event.target.tagName === "U" || event.target.tagName === "A") {
            const targetLink = event.target.closest("a") || event.target.parentNode.closest("a");
            if (targetLink) {
                // 在这里执行您的点击事件处理逻辑
                console.log("超链接被点击了", event.target);
                // 取消默认的链接跳转行为
                event.preventDefault();
                const targetUrl = targetLink.href;
                console.log("超链接被点击了，目标 URL:", targetUrl);
                OpenLink(targetUrl);
            }
        }
    }
}
