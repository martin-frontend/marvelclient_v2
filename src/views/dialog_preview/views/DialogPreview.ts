import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogPreviewMediator from "../mediator/DialogPreviewMediator";
import DialogPreviewProxy from "../proxy/DialogPreviewProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogPreview extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogPreviewProxy = this.getProxy(DialogPreviewProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogPreviewMediator);
    }

    @Watch("pageData.url")
    onWatchImage() {
        this.onResize();
    }

    @Watch("$vuetify.breakpoint.width")
    onWatchWidth() {
        this.onResize();
    }

    @Watch("$vuetify.breakpoint.height")
    onWatchHeight() {
        this.onResize();
    }

    onResize() {
        this.$nextTick(() => {
            const img: any = this.$refs.img;
            const imgL = new Image();
            imgL.src = img.src;
            imgL.onload = function () {
                const imgW = imgL.naturalWidth;
                const imgH = imgL.naturalHeight;
                const bodyW = document.body.clientWidth;
                const bodyH = document.body.clientHeight;

                if (imgW > bodyW && imgH > bodyH) {
                    if (imgW / bodyW > imgH / bodyH) {
                        img.style.width = "100vw";
                        img.style.height = "auto";
                    } else {
                        img.style.height = "100vh";
                        img.style.width = "auto";
                    }
                } else {
                    if (imgW <= bodyW) {
                        img.style.width = "auto";
                    } else {
                        img.style.width = "100vw";
                    }
                    if (imgH <= bodyH) {
                        img.style.height = "auto";
                    } else {
                        img.style.height = "100vh";
                    }
                }
            };
        });
    }

    getImgSize(img: any) {
        const nWidth = img.naturalWidth;
        const nHeight = img.naturalHeight;
        return [nWidth, nHeight];
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if(!this.pageData.bShow){
            this.pageData.url = "";
        }
    }

    onClose() {
        this.pageData.bShow = false;
    }
}
