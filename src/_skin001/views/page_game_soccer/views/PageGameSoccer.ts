import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import dialog_message_box from "@/views/dialog_message_box";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;

    get gameFrameClass() {
        if (this.$vuetify.breakpoint.mobile) {
            //@ts-ignore
            // if (window.navigator.standalone) {
                // return "frame-mobile-standalone";
            // } else {
                return "frame-mobile";
            // }
        } else {
            return "frame";
        }
    }

    constructor() {
        super(PageGameSoccerMediator);
    }

    mounted() {
        if (!this.myProxy.pageData.isAction) {
            this.$router.replace("/");
        }
        // const body = document.querySelector("html");
        // if (body && this.$vuetify.breakpoint.mobile) {
        //     if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //         body.style.overflow = "hidden";
        //     }
        // }
        //@ts-ignore
        if (window.navigator.standalone) {
            const gameFrame:HTMLElement = <any>this.$refs.gameFrame;
            if(gameFrame){
                gameFrame.style.height = (document.body.clientHeight - 55) + "px";
            }
        }
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
        dialog_message_box.confirm({
            message: LangUtil("确定要退出游戏吗"),
            okFun: () => {
                this.$router.replace("/");
            },
        });
    }

    scrollY = 0;
    clientY = 0;
    onTouchStart(e:any){
        this.clientY = e.touches[0].clientY;
        const obj = document.body.scrollTop ? document.body : document.documentElement;
        this.scrollY = obj.scrollTop;
    }

    onTouchMove(e:any){
        console.log(e);
        const cy = e.touches[0].clientY;
        const obj = document.body.scrollTop ? document.body : document.documentElement;
        obj.scrollTop = this.scrollY - (cy - this.clientY);
    }

    destroyed() {
        super.destroyed();
        // const body = document.querySelector("html");
        // if (body) {
        //     body.style.overflow = "auto";
        // }
    }
}
