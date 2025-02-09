import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogNoticeRechargeMediator from "../mediator/DialogNoticeRechargeMediator";
import DialogNoticeRechargeProxy from "../proxy/DialogNoticeRechargeProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import PanelUtil from "@/_skin030/core/PanelUtil";
@Component
export default class DialogNoticeRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNoticeRechargeProxy = this.getProxy(DialogNoticeRechargeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogNoticeRechargeMediator);
    }

    /**当前正在显示的 通知的 数据 */
    public get curNoticeData(): any {
        return this.pageData.noticeArr[this.pageData.curIndex];
    }

    onClose(isChick: boolean = true) {
        if (isChick) {
            const index = this.pageData.curIndex + 1;
            //已经是最后一个数据了，  需要关闭 窗口
            if (index < this.pageData.noticeArr.length) {
                this.myProxy.pageData.curIndex++;
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
                return;
            }
        }
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    item_img_src(data: any) {
        if (!data) return "";
        if (this.$xsOnly) {
            if (data.img_url_phone && data.img_url_phone.trim()) {
                return data.img_url_phone;
            } else {
                return "";
            }
        }
        if (!data.img_url || !data.img_url.trim()) {
            return "";
        }
        return data.img_url;
    }
    get img_src() {
        if (!this.curNoticeData) return "";
        if (this.$xsOnly) {
            if (this.curNoticeData.img_url_phone && this.curNoticeData.img_url_phone.trim()) {
                return this.curNoticeData.img_url_phone;
            } else {
                return "";
            }
        }
        if (!this.curNoticeData.img_url || !this.curNoticeData.img_url.trim()) {
            return "";
        }
        return this.curNoticeData.img_url;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            // this.myProxy.api_xxx();

            this.$nextTick(() => {
                if (!this.img_src) {
                    this.onClose();
                }
            });
        }
    }
    onImgClick() {
        PanelUtil.jumpTo(this.curNoticeData);
        this.onClose(false);
    }
}
