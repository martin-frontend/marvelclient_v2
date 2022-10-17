import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameSoccerMediator from "../mediator/PageGameSoccerMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";
import dialog_message_box from "@/views/dialog_message_box";
import { EnumPostMessage } from "@/core/enum/EnumPostMessage";
import dialog_recharge from "@/views/dialog_recharge";

@Component
export default class PageGameSoccer extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageGameSoccerProxy = this.getProxy(PageGameSoccerProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageGameSoccerMediator);
    }

    mounted() {
        if (!this.myProxy.pageData.isAction) {
            this.$router.replace("/");
        }
        // this.onWatchHeight();
        // if (self != top) scrollControl(false);
        // inobounce.enable();
        const body = document.querySelector("html");
        if (body && this.$vuetify.breakpoint.mobile) {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                body.style.overflow = "hidden";
            }
        }

        //接受iframe消息
        // window.addEventListener("message", function (e: any) {
        //     if ((e.data = EnumPostMessage.TOPUP)) {
        //         dialog_recharge.show();
        //     }
        // }, false);
    }

    // @Watch("$vuetify.breakpoint.height")
    // onWatchHeight() {
    //     if (this.$vuetify.breakpoint.mobile) {
    //         const gameFrame: any = this.$refs.gameFrame;
    //         const bodyH = document.body.clientHeight;
    //         gameFrame.style.height = bodyH - 75 + "px";
    //     }
    // }

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

    destroyed() {
        super.destroyed();
        // if (self != top) scrollControl(true);
        // inobounce.disable();

        const body = document.querySelector("html");
        if (body) {
            body.style.overflow = "auto";
        }
    }
}
