import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class RulePanel extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    isShowDetail = false;
    onBtnClickRule() {
        this.isShowDetail = !this.isShowDetail;
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        if (this.pageData.bShow) {
            this.isShowDetail = false;
        }
    }
    include() {
        const list = <any>[];
        const included_class = document.querySelectorAll(".included_class");
        if (included_class) {
            list.push(...included_class);
        }
        return list;
    }
    onClickOutside() {
        this.isShowDetail = false;
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
                this.myProxy.onClose();
            } else {
                PanelUtil.jumpTo({
                    open_mode_url: targetUrl,
                });
            }
        }
    }
    onBtnClickTest() {
        // console.warn("测试按钮被点击");
    }
}
