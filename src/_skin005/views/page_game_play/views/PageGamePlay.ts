import AbstractView from "@/core/abstract/AbstractView";
import { judgeClient } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import ScrollUtil from "@/core/global/ScrollUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Watch, Component } from "vue-property-decorator";
import PageGamePlayMediator from "../mediator/PageGamePlayMediator";
import PageGamePlayProxy from "../proxy/PageGamePlayProxy";

@Component
export default class PageGamePlay extends AbstractView {
    myProxy: PageGamePlayProxy = this.getProxy(PageGamePlayProxy);
    LangUtil = LangUtil;
    pageData = this.myProxy.pageData;
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    constructor() {
        super(PageGamePlayMediator);
    }

    // get gameFrameClass() {
    //     if (this.$mobile) {
    //         //@ts-ignore
    //         if (window.navigator.standalone) {
    //             return "frame-mobile-standalone";
    //         } else {
    //             return "frame-mobile";
    //         }
    //     } else {
    //         return "frame";
    //     }
    // }
    isLoadEnd = false;
    autoCloseTime = 0;
    autoCloseHandle = 0;
    mounted() {
        const that = this;
        this.isLoadEnd = false;
        this.restartAutoClose(5);
        this.$nextTick(() => {
            const iframe = document.getElementById("gameFrame");
            if (iframe) {
                iframe.addEventListener("load", this.onIframeLoadEnd);
            }

            {
                const img = document.querySelector("#imgNode");
                const a = document.querySelector("#cardNode");
                if (img && a) {
                    // 在图片加载完成后获取图片宽度并设置A元素宽度
                    img.addEventListener("load", function () {
                        that.resetImgSize(img, a);
                    });
                }
            }

            const that = this;
            const oDiv: any = this.$refs.btnFlow;
            if (!oDiv) return;
            let flag = 0; //标记是拖曳还是点击
            let disX: number,
                disY: number,
                moveX: any,
                moveY: any,
                L: any,
                T: any,
                starX: number,
                starY: number,
                starXEnd: number,
                starYEnd: number;
            oDiv.addEventListener("touchstart", function (e: any) {
                flag = 0;
                e.preventDefault(); //阻止触摸时页面的滚动，缩放
                disX = e.touches[0].clientX - oDiv.offsetLeft;
                disY = e.touches[0].clientY - oDiv.offsetTop;
                //手指按下时的坐标
                starX = e.touches[0].clientX;
                starY = e.touches[0].clientY;
                //console.log(disX);
            });
            oDiv.addEventListener("touchmove", function (e: any) {
                flag = 1;
                L = e.touches[0].clientX - disX;
                T = e.touches[0].clientY - disY;
                //移动时 当前位置与起始位置之间的差值
                starXEnd = e.touches[0].clientX - starX;
                starYEnd = e.touches[0].clientY - starY;
                //console.log(L);
                if (L < 0) {
                    //限制拖拽的X范围，不能拖出屏幕
                    L = 0;
                } else if (L > document.documentElement.clientWidth - oDiv.offsetWidth) {
                    L = document.documentElement.clientWidth - oDiv.offsetWidth;
                }
                if (T < 0) {
                    //限制拖拽的Y范围，不能拖出屏幕
                    T = 0;
                } else if (T > document.documentElement.clientHeight - oDiv.offsetHeight) {
                    T = document.documentElement.clientHeight - oDiv.offsetHeight;
                }
                moveX = L + "px";
                moveY = T + "px";
                //console.log(moveX);
                oDiv.style.left = moveX;
                oDiv.style.top = moveY;
            });
            oDiv.addEventListener("touchend", function (e: any) {
                //alert(parseInt(moveX))
                // 判断滑动方向
                if (flag === 0) {
                    //点击
                    console.log("click");
                    that.onBack();
                }
            });
        });
        this.onWatchHeight();
    }

    resetImgSize(imgNode: any, cardNode: any) {
        const bodywidth = document.body.clientWidth * 0.8;
        const bodyH = document.body.clientHeight * 0.8;
        const scale = imgNode.height / imgNode.width;

        if (imgNode.width > bodywidth) {
            //imgNode.width = bodywidth;
            imgNode.style.width = `${bodywidth}px`;
            imgNode.style.height = `${bodywidth * scale}px`;
            //imgNode.height = bodywidth * scale;
        }

        if (imgNode.height > bodyH) {
            // imgNode.height = bodyH;
            // imgNode.width = bodyH / scale;
            imgNode.style.width = `${bodyH / scale}px`;
            imgNode.style.height = `${bodyH}px`;
        }
        console.log("重新设置之后的宽度", bodyH);

        console.log("重新设置之后的宽度", imgNode.width);
        console.log("重新设置之后的高度", imgNode.height);
        //@ts-ignore
        cardNode.style.width = `${imgNode.width}px`;
        //cardNode.style.height = `${imgNode.height + 20}px`;

        //@ts-ignore
        console.log("----重新设置宽度---", imgNode.width);
    }
    onCloseDown() {
        this.autoCloseTime--;
        if (this.autoCloseTime <= 0) {
            this.onClose();
        }
    }
    restartAutoClose(timer: number = 10) {
        if (this.autoCloseHandle) {
            clearTimeout(this.autoCloseHandle);
        }
        this.autoCloseTime = timer;
        this.autoCloseHandle = setInterval(this.onCloseDown.bind(this), 1000);
    }
    public get noticeData(): any {
        return this.noticeProxy.getListTypeDataFromType(13);
    }

    public get curShowLoadData(): any {
        if (this.noticeData.length < 1) return null;
        const index = Math.floor(Math.random() * this.noticeData.length);
        console.log("当前取出的随机数为 ", index);
        return this.noticeData[index];
    }

    get isShowLoadNode() {
        return this.isLoadEnd;
    }
    /**内置网页加载完成的时候 */
    onIframeLoadEnd() {
        console.log("  加载完成-----");
        //this.isLoadEnd = true;
    }
    onClose() {
        console.log("点击 关闭 ");
        this.isLoadEnd = true;
        if (this.autoCloseHandle) clearInterval(this.autoCloseHandle);
    }
    onclick_other() {
        console.log("  ----------onclick_other-----");
        this.onClose();
    }
    onclick_img() {
        console.log("  ----------onclick_img-----");
    }
    @Watch("$vuetify.breakpoint.height")
    onWatchHeight() {
        //@ts-ignore
        if (window.navigator.standalone) {
            const gameFrame: any = this.$refs.gameFrame;
            const bodyW = document.body.clientWidth;
            const bodyH = document.body.clientHeight;
            gameFrame.style.width = bodyW + "px";
            gameFrame.style.height = bodyH + "px";
        }
    }

    onResize() {
        this.$nextTick(() => {
            if (this.$mobile) {
                const gameFrame: any = this.$refs.gameFrame;
                const bodyW = document.body.clientWidth;
                const bodyH = document.body.clientHeight;

                if (judgeClient() == "iOS") {
                    gameFrame.style.width = bodyW + "px";
                    gameFrame.style.height = "100vh";
                    gameFrame.style.marginBottom = "20px";
                } else {
                    gameFrame.style.width = bodyW + "px";
                    gameFrame.style.height = bodyH + "px";
                }
            }
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 1000);
        });
    }

    onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                PanelUtil.message_warn("Fullscreen not supported");
            });
        }
    }

    onBack() {
        PanelUtil.message_confirm({
            message: LangUtil("确定要退出游戏吗"),
            okFun: () => {
                const gameProxy = PanelUtil.getProxy_gameproxy;
                if (gameProxy.currGame.ori_vendor_extend) {
                    const ori_vendor_extend = JSON.parse(gameProxy.currGame.ori_vendor_extend);
                    if (ori_vendor_extend.router_bad) {
                        // 导致路由混乱的游戏
                        this.$router.replace(gameProxy.gamePreData.lastRouter);
                        setTimeout(() => {
                            ScrollUtil(gameProxy.gamePreData.scrollY, 0);
                        });
                    } else {
                        this.$router.back();
                    }
                } else {
                    this.$router.back();
                }
            },
        });
    }

    destroyed() {
        super.destroyed();
    }
}
