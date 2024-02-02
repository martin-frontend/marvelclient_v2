import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
// import DialogMarqueeMediator from "../mediator/DialogMarqueeMediator";
import DialogMarqueeProxy from "../proxy/DialogMarqueeProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PageBlur from "@/_skin005/core/PageBlur";
import Marquee1Proxy from "@/_skin005/views/widget/marquee1/Marquee1Proxy";
@Component
export default class DialogMarquee extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogMarqueeProxy = this.getProxy(DialogMarqueeProxy);
    marqueeProxy: Marquee1Proxy = this.getProxy(Marquee1Proxy);
    core = core;
    pageData = this.myProxy.pageData;
    marqueeData = this.marqueeProxy.pageData;

    marqueeDataIndex = -1;
    marqueeText = "";

    constructor() {
        // super(DialogMarqueeMediator);
        super();
    }

    mounted() {
        this.$nextTick(() => {
            this.initData();
        });
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    initData() {
        this.marqueeDataIndex = this.marqueeData.index;
        if (this.marqueeDataIndex >= this.marqueeData.org_list) {
            this.marqueeDataIndex = this.marqueeDataIndex % this.marqueeData.org_list.length;
        }
        this.marqueeText = this.marqueeData.text;
    }
    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.initData();
        }
    }
    @Watch("pageData.bHidden")
    onWatchHidden() {
        if (!this.pageData.bHidden) {
            this.$nextTick(() => {
                this.resetCardScale();
            });
        }
    }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        this.resetCardScale();
    }
    @Watch("$vuetify.breakpoint.height")
    onWatchScreen_height() {
        this.resetCardScale();
    }
    resetCardScale() {
        // const bodyW = document.body.clientWidth;
        // if (!this.$mobile) {
        //     let scale = bodyW / 340;
        //     scale = Math.min(scale, 1.2);
        //     if (this.$refs.card_node) {
        //         //@ts-ignore
        //         this.$refs.card_node.$el.style.zoom = scale;
        //     }
        // } else {
        const bodyW = document.body.clientWidth;
        const bodyH = document.body.clientHeight;
        let scale = bodyW / 340;
        scale = Math.min(scale, 1);
        if (this.$refs.card_node) {
            //@ts-ignore
            this.$refs.card_node.$el.style.zoom = scale;
        }
        // }
    }

    onPhoneClose() {
        this.onClose();
    }
    onPhoneCardClick() {
        console.log("截断点击");
    }

    @Watch("marqueeDataIndex")
    onWatchMarqueeIndex() {
        // console.warn("--序号变化----", this.marqueeDataIndex);
        // console.warn("--序号变化--list--", this.marqueeData.org_list);
        this.marqueeText = this.marqueeData.org_list[this.marqueeDataIndex].content;
        this.scrollToItem();
    }
    onBtnClickPageItem(index: number) {
        // console.warn("---点击了序号--", index);
        this.marqueeDataIndex = index;
    }

    onBtneClickPageLeft() {
        this.nextPageIndex(-1);
    }
    onBtneClickPageRight() {
        this.nextPageIndex(1);
    }
    nextPageIndex(offset: number = 1) {
        this.marqueeDataIndex = this.marqueeDataIndex + offset;
        if (this.marqueeDataIndex >= this.marqueeData.org_list.length) {
            this.marqueeDataIndex = 0;
        }
        if (this.marqueeDataIndex < 0) {
            this.marqueeDataIndex = this.marqueeData.org_list.length - 1;
        }
    }
    scrollToItem() {
        setTimeout(() => {
            if (!this.$refs.scroll_node) return;

            if (!this.$refs[`marquee_${this.marqueeDataIndex}`]) return;
            //@ts-ignore
            if (!this.$refs.scroll_node.scrollToItem) return;
            //@ts-ignore
            this.$refs.scroll_node.scrollToItem(this.$refs[`marquee_${this.marqueeDataIndex}`][0].$el);
        }, 300);
    }
}
