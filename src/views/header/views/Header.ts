import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import ScrollUtil from "@/core/global/ScrollUtil";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import dialog_login from "@/views/dialog_login";
import dialog_register from "@/views/dialog_register";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import HeaderProxy from "../proxy/HeaderProxy";

@Component
export default class Header extends AbstractView {
    gameProxy: GameProxy = getProxy(GameProxy);
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    CategoryIcon = Assets.CategoryIcon;
    routerPath = "/";
    core = core;

    constructor() {
        super(HeaderMediator);
    }

    @Watch("gameProxy.lobbyIndex")
    onWatchIndex() {
        console.log(this.gameProxy.lobbyIndex);
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    goHome() {
        if (this.$router.app.$route.path != "/") {
            router.push("/");
        }
        ScrollUtil(0);
    }

    goIntroduce() {
        router.push("/introduce");
    }

    handlerLogin() {
        dialog_login.show();
    }
    handlerRegister() {
        dialog_register.show();
    }

    goAnchor(id: string) {
        this.goHome();
        setTimeout(() => {
            const anchor: any = document.getElementById(id);
            if (anchor) {
                ScrollUtil(anchor.offsetTop);
            }
        }, 100);
    }
}
