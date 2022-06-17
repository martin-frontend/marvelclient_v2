import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import dialog_message from "@/views/dialog_message";
import { Watch, Component } from "vue-property-decorator";
import PageGamePlayMediator from "../mediator/PageGamePlayMediator";
import PageGamePlayProxy from "../proxy/PageGamePlayProxy";

@Component
export default class PageGamePlay extends AbstractView {
    myProxy: PageGamePlayProxy = this.getProxy(PageGamePlayProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageGamePlayMediator);
    }

    mounted() {
        this.$nextTick(() => {
            const that = this;
            const oDiv: any = this.$refs.btnFlow;
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
    }

    onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                dialog_message.warn("Fullscreen not supported");
            });
        }
    }

    onBack() {
        const gameProxy: GameProxy = getProxy(GameProxy);
        const len = gameProxy.historyLength - window.history.length;
        this.$router.go(len);
    }
}
