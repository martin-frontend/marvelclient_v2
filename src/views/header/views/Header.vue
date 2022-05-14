<template>
    <v-app-bar height="156" color="accent" elevation="0" :app="routerPath != '/gameplay'">
        <v-container class="ma-auto pa-0">
            <div class="d-none d-md-flex align-center" style="height: 96px">
                <v-img src="@/assets/header/j9logo.svg" max-width="236" min-width="236" height="56" class="mr-5"></v-img>
                <v-img src="@/assets/header/Sponsor-fiba-cn.png" max-width="258"></v-img>
                <v-img src="@/assets/header/AmbassadorsNew-cn.png" max-width="269"></v-img>
                <v-spacer />
                <v-btn v-if="core.user_id == 0" width="106" height="48" color="#ffb01b" class="text-14" @click="handlerLogin">登录</v-btn>
                <v-btn v-if="core.user_id == 0" width="106" height="48" color="white" class="text-14 mx-4 black--text" @click="handlerRegister"
                    >注册</v-btn
                >

                <Wallet v-if="core.user_id"/>
                <User v-if="core.user_id"/>

            </div>
            <div class="d-flex d-md-none ml-3">
                <v-img src="@/assets/header/Header-CN.png" max-width="400" height="60"></v-img>
            </div>
            <div class="d-flex d-md-none ml-5 my-1 pb-1 align-center" style="height: 25px">
                <v-img src="@/assets/header/J9logoMobile.png" max-width="100" min-width="100" height="22"></v-img>
                <v-spacer />
                <v-btn v-if="!isLogin" width="70" height="28" color="#ffb01b" class="text-14" @click="handlerLogin">登录</v-btn>
                <v-btn v-if="!isLogin" width="70" height="28" color="white" class="text-14 mx-4 black--text" @click="handlerRegister"
                    >注册</v-btn
                >
                <Wallet v-if="isLogin"/>
                <User v-if="isLogin"/>
                <!-- <v-btn width="38" height="38" icon class="mt-n1 mr-4">
                    <img src="@/assets/header/avatar.gif" width="38" alt="" />
                </v-btn> -->
            </div>
            <div class="d-flex">
                <button class="nav-button" :class="routerPath == '/' ? 'active' : ''" @click="goHome">
                    <svg
                        class="d-none d-md-flex"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#8A8C8D"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.7627 20.6345H15.2503C13.6629 20.6345 12.377 19.3472 12.377 17.7612V12.3754H17.7627C19.3487 12.3754 20.636 13.6627 20.636 15.2487V17.7612C20.636 19.3472 19.3487 20.6345 17.7627 20.6345V20.6345ZM6.23956 20.6345H8.75376C10.34 20.6345 11.6262 19.3472 11.6262 17.7612V12.3754H6.23956C4.65331 12.3754 3.36713 13.6627 3.36713 15.2487V17.7612C3.36713 19.3472 4.65331 20.6345 6.23956 20.6345V20.6345ZM17.7627 3.36558H15.2503C13.6629 3.36558 12.377 4.65176 12.377 6.238V11.6246H17.7627C19.3487 11.6246 20.636 10.3384 20.636 8.7522V6.238C20.636 4.65176 19.3487 3.36558 17.7627 3.36558V3.36558ZM17.5486 4.86722C18.4248 4.86831 19.1334 5.57689 19.1345 6.45303V8.53606C19.1345 9.4122 18.4248 10.1219 17.5486 10.123H13.8787V6.45303C13.8798 5.57689 14.5906 4.86722 15.4667 4.86722H17.5486ZM6.23961 3.36555H8.75381C10.3401 3.36555 11.6262 4.65173 11.6262 6.23797V11.6246H6.23961C4.65337 11.6246 3.36719 10.3384 3.36719 8.75217V6.23797C3.36719 4.65173 4.65337 3.36555 6.23961 3.36555V3.36555Z"
                        ></path>
                    </svg>
                    <div>首页</div>
                </button>
                <button
                    class="nav-button d-none d-md-flex"
                    v-for="item of lobbyIndex"
                    :key="item.category"
                    @click="goAnchor(item.category)"
                >
                    <v-icon class="mr-1">{{ gameProxy.categoryIcon[item.category] }}</v-icon>
                    <div>{{ item.category_name }}</div>
                </button>

                <!-- <a v-for="item of lobbyIndex" :key="item.category" :href="'#'+item.category">
                    <button class="nav-button d-none d-md-flex" >
                    <v-icon class="mr-1">{{gameProxy.categoryIcon[item.category]}}</v-icon>
                    <div>{{item.category_name}}</div>
                </button>
                </a> -->
                <!-- <button class="nav-button d-none d-md-flex">
                    <svg
                        class="d-none d-md-flex"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#8A8C8D"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.72882 8.81934C3.72882 9.17151 4.01283 9.45552 4.365 9.45552C4.71716 9.45552 5.00117 9.17151 5.00117 8.81934C5.00117 8.46717 4.71716 8.18317 4.365 8.18317C4.01283 8.18317 3.72882 8.46717 3.72882 8.81934ZM7.6167 18.9339C7.77 19.171 8.00952 19.3418 8.29696 19.4081L11.3629 20.0909L10.2228 20.6789C9.93534 20.8307 9.60958 20.9066 9.28382 20.9066C8.49816 20.9066 7.77958 20.4799 7.42507 19.778L2.05005 9.22263C1.79136 8.72947 1.75303 8.16994 1.92549 7.64833C2.09795 7.12673 2.46204 6.69996 2.96026 6.45339L2.96984 6.4439L9.22633 3.31428C9.88743 2.98236 10.6443 3.03926 11.2384 3.39015C10.9701 3.53241 10.7593 3.78847 10.6922 4.10143L7.47298 18.1183C7.41549 18.4028 7.4634 18.6874 7.6167 18.9339ZM16.4555 19.0607C16.4897 19.403 16.7977 19.6654 17.1513 19.6311C17.5049 19.5969 17.7559 19.2889 17.7217 18.9352C17.6875 18.593 17.3795 18.3306 17.0258 18.3648C16.6836 18.399 16.4212 18.707 16.4555 19.0607ZM16.1177 14.5361C16.8496 14.4689 17.484 13.9504 17.6499 13.2207C17.7475 12.827 17.8061 12.3565 17.4547 11.6268C17.1717 11.0699 15.942 9.43758 15.5711 8.9479C15.4833 8.82307 15.3076 8.78467 15.171 8.85188C15.1661 8.85188 15.1636 8.85428 15.1612 8.85668C15.1588 8.85908 15.1563 8.86148 15.1514 8.86148C14.2828 9.31276 12.7603 10.1193 12.2918 10.4746C11.6477 10.9739 11.4915 11.4251 11.4037 11.8188C11.3061 12.2605 11.3842 12.7214 11.6379 13.1054C11.6867 13.1918 11.7453 13.2687 11.8136 13.3359C12.4675 14.0464 13.5899 14.104 14.3121 13.4511C14.6049 14.1712 15.3369 14.6129 16.1177 14.5361ZM13.2682 6.2106C13.2333 5.86216 12.9198 5.60664 12.5713 5.64149C12.2229 5.67633 11.9674 5.97831 12.0022 6.33836C12.037 6.6868 12.3506 6.94232 12.6991 6.90747C13.0475 6.87263 13.303 6.55904 13.2682 6.2106ZM11.4346 4.49649C11.5611 3.95748 12.1159 3.62651 12.6708 3.7589L21.3923 5.79201C21.9374 5.91494 22.2781 6.45395 22.1516 6.9835L19.0465 19.967C18.8713 20.6195 18.1996 21.0261 17.5182 20.8748L8.77723 18.9552C8.35867 18.8512 8.10559 18.454 8.20293 18.0474L11.4346 4.49649Z"
                        ></path>
                    </svg>
                    <div>真人游戏</div>
                </button>
                <button class="nav-button d-none d-md-flex">
                    <svg
                        class="d-none d-md-flex"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#8A8C8D"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.9451 18.0382H20.1638H20.1648V9.51612H15.9451V18.0382ZM9.89021 18.0382H14.1089H14.1103V9.51612H9.89021V18.0382ZM8.05404 18.0382H3.8339V9.51612H8.05404V18.0382ZM2.42319 7.77737H15.9746H21.5759C21.8096 7.77737 21.9991 7.95705 21.9991 8.17897V19.3753C21.9991 19.5972 21.8096 19.7769 21.5759 19.7769H2.42319C2.18955 19.7769 2 19.5972 2 19.3753V8.17897C2 7.95705 2.18955 7.77737 2.42319 7.77737ZM15.6421 6.40567L15.8899 4.98045L14.8368 3.97077C14.6796 3.82054 14.7663 3.55813 14.9833 3.52683L16.4399 3.31834L17.0909 2.0212C17.1879 1.82764 17.468 1.82764 17.565 2.0212L18.216 3.31834L19.6721 3.52635C19.8891 3.55716 19.9758 3.81958 19.8191 3.97028L18.7655 4.98045L19.0139 6.40567C19.0511 6.61801 18.8243 6.77979 18.6298 6.67964L17.328 6.00652L16.0261 6.67964C15.8316 6.77979 15.6043 6.61801 15.6421 6.40567ZM6.73149 6.00644L5.42959 6.67956C5.23563 6.77972 5.00836 6.61793 5.04559 6.4056L5.29392 4.98038L4.20166 3.93313C4.06059 3.79832 4.13847 3.56238 4.33341 3.53446L5.84347 3.31827L6.49344 2.02113C6.59091 1.82757 6.87108 1.82757 6.96855 2.02065L7.62097 3.31827L9.07715 3.52627C9.29414 3.55709 9.38083 3.8195 9.2236 3.97021L8.17004 4.98038L8.41837 6.4056C8.45559 6.61842 8.22832 6.7802 8.03436 6.67956L6.73149 6.00644ZM12.0303 4.35254L10.7274 5.02614C10.533 5.1263 10.3062 4.96403 10.3434 4.75169L10.5917 3.32648L9.53818 2.31679C9.38145 2.16656 9.46814 1.90415 9.68512 1.87333L11.1413 1.66533L11.7927 0.367709C11.8897 0.174631 12.1704 0.174631 12.2674 0.367709L12.9188 1.66437L14.375 1.87333C14.592 1.90415 14.6787 2.16608 14.5214 2.31679L13.4679 3.32648L13.7162 4.75169C13.7534 4.96403 13.5262 5.1263 13.3322 5.02566L12.0303 4.35254ZM18.0579 12.4765H17.383V12.8453H16.4885V11.5558H19.333L17.4329 16.2222L16.7158 15.6302L18.0579 12.4765ZM12.1023 12.4765H11.4266V12.8453H10.5329V11.5558H13.377L11.4778 16.2222L10.7598 15.6302L12.1023 12.4765ZM6.23562 12.4765H5.56031V12.8453H4.6667V11.5558H7.51078L5.61061 16.2222L4.89354 15.6302L6.23562 12.4765Z"
                        ></path>
                    </svg>
                    <div>电子游戏</div>
                </button> -->
                <v-spacer />
                <button class="nav-button" :class="routerPath == '/introduce' ? 'active' : ''" @click="goIntroduce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#8A8C8D" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 1C5.92496 1 1 5.92497 1 12C1 18.075 5.92496 23 12 23C18.075 23 23 18.075 23 12C23 5.92497 18.075 1 12 1ZM19.1973 7.38044C19.5042 7.73736 19.7298 8.16706 19.8559 8.63519C19.9999 9.16372 20.0366 9.71975 19.9633 10.2651C19.9085 10.6386 19.8217 11.0058 19.7039 11.3619C19.5907 11.6847 19.4552 11.9978 19.2986 12.2986C19.1505 12.5911 18.9832 12.8719 18.7982 13.1387L18.2511 13.9372L15.5339 17.7059H12.4561L15.2037 13.9569H15.0132C14.5593 13.9652 14.1094 13.8641 13.6962 13.6608C13.3256 13.4746 13.0012 13.1957 12.7499 12.847C12.4988 12.4902 12.3243 12.0773 12.2393 11.6383C12.1433 11.158 12.1309 10.6625 12.2028 10.1773C12.2694 9.61084 12.4439 9.06551 12.7155 8.57596C12.9763 8.10905 13.311 7.69547 13.7043 7.35411C14.1005 7.0099 14.5488 6.74271 15.0294 6.56441C15.528 6.37809 16.052 6.28391 16.5795 6.28581C17.0836 6.28206 17.5842 6.37796 18.0566 6.56879C18.4879 6.74402 18.8776 7.02132 19.1973 7.38044ZM16.4235 11.4913C16.4235 11.4913 16.9138 12.1187 17.5338 11.8269C17.7397 11.7378 17.9109 11.5747 18.0187 11.3649C18.1264 11.1552 18.1641 10.9116 18.1255 10.6753C18.1247 10.6599 18.1247 10.6445 18.1255 10.6292C18.0911 10.4188 18.0136 10.2194 17.8985 10.0457L17.8742 10.004C17.3675 9.17479 16.7649 8.41916 16.081 7.75555C16.081 7.75555 14.7924 9.04759 14.225 10.1444L14.2068 10.1817C14.1022 10.3703 14.0404 10.5831 14.0264 10.8025V10.8749C14.0248 11.0531 14.0674 11.2285 14.1497 11.3829C14.232 11.5372 14.3511 11.6648 14.4945 11.7523C14.686 11.8756 14.9118 11.9212 15.1314 11.881C15.3511 11.8408 15.5505 11.7175 15.694 11.533C15.7143 11.5135 15.7397 11.5016 15.7667 11.4988C15.7936 11.496 15.8207 11.5026 15.844 11.5176C15.9128 11.5768 15.9189 11.68 15.844 11.9103C15.7456 12.2238 15.5548 12.4935 15.3009 12.6781H16.8976C16.7539 12.5613 16.6304 12.418 16.5329 12.2547L16.5065 12.2086C16.4121 12.025 16.3269 11.8361 16.2512 11.6427C16.2439 11.6254 16.2358 11.6086 16.2269 11.5922C16.1846 11.4905 16.119 11.4021 16.0364 11.3353C15.9538 11.2685 15.8569 11.2256 15.7548 11.2105C15.3516 11.2105 15.1854 11.1447 15.2097 10.9517C15.2195 10.9073 15.2331 10.8639 15.2503 10.8222C15.2566 10.8096 15.2605 10.7957 15.2617 10.7814C15.263 10.7672 15.2616 10.7527 15.2576 10.739C15.2537 10.7253 15.2472 10.7126 15.2386 10.7017C15.2301 10.6907 15.2196 10.6817 15.2077 10.6753C15.1571 10.6336 15.155 10.6182 15.1692 10.5722C15.1834 10.5261 15.2361 10.5261 15.2786 10.5261C15.2786 10.5261 15.153 10.4888 15.153 10.3901C15.1515 10.3779 15.1531 10.3654 15.1578 10.3542C15.1624 10.343 15.1699 10.3334 15.1794 10.3265L15.1814 10.3248C15.2178 10.2947 15.3198 10.2104 15.2482 10.1071C15.2482 10.1071 15.2624 10.1049 15.1753 10.0589C15.0882 10.0128 15.0679 9.93163 15.1753 9.85485L15.1789 9.85227C15.2863 9.77548 15.4472 9.66046 15.4853 9.54116C15.5101 9.45288 15.5237 9.36138 15.5258 9.26915C15.5258 9.26915 15.5319 9.0103 15.8602 8.58912C15.9004 8.54043 15.9444 8.49566 15.9919 8.45532L15.9797 8.50796C15.9635 8.55622 15.9554 8.60448 15.9554 8.65274C15.9298 8.81128 15.921 8.97245 15.9291 9.13315C15.9397 9.41764 16.0232 9.69334 16.1702 9.92943C16.2845 10.0852 16.4091 10.2318 16.543 10.3682C16.6736 10.4964 16.7582 10.6704 16.7821 10.8595C16.776 11.0456 16.7034 11.2218 16.5795 11.3509C16.5305 11.4015 16.4784 11.4485 16.4235 11.4913ZM8.40253 13.3469L9.94448 6.81204L12.5603 6.8274L10.9515 13.6847C10.8362 14.1871 10.6838 14.6786 10.4956 15.1544C10.3067 15.6322 10.0435 16.0715 9.71754 16.4531C9.36993 16.8502 8.94874 17.1635 8.48156 17.3722C7.90986 17.6159 7.29846 17.7315 6.68431 17.7122C5.85356 17.7122 5.19504 17.4972 4.70064 17.0541C4.20625 16.611 3.96715 15.92 4.00363 15.0009L4.07251 14.1366L6.58705 14.1454L6.55057 14.4656C6.53507 14.5531 6.53872 14.6434 6.56124 14.7291C6.58376 14.8148 6.62452 14.8936 6.68025 14.9592C6.73667 15.0272 6.80621 15.0809 6.88395 15.1165C6.96168 15.1522 7.04572 15.1688 7.13008 15.1654C7.30841 15.1763 7.48505 15.1231 7.63257 15.014C7.77732 14.9037 7.90056 14.7636 7.99526 14.6016C8.09838 14.4144 8.17939 14.214 8.23638 14.005L8.25976 13.9144L8.25977 13.9144L8.25979 13.9143C8.31331 13.7071 8.36179 13.5195 8.40253 13.3469Z"
                        ></path></svg
                    >J9币介绍
                </button>
            </div>
        </v-container>
        <LoginDialog />
        <RegisterDialog />
    </v-app-bar>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import LoginProxy from "@/views/login/proxy/LoginProxy";
import LoginDialog from "@/views/login/views/LoginDialog.vue";
import RegisterDialog from "@/views/login/views/RegisterDialog.vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import HeaderMediator from "../mediator/HeaderMediator";
import ScrollUtil from "@/core/global/ScrollUtil";
import SelfProxy from "@/proxy/SelfProxy";
import Wallet from "./components/Wallet.vue";
import User from "./components/User.vue";
import dialog_login from "@/views/dialog_login";

@Component({
    components: {
        LoginDialog,
        RegisterDialog,
        Wallet,
        User
    },
})
export default class Header extends AbstractView {
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    private gameProxy: GameProxy = this.getProxy(GameProxy);
    private lobbyIndex: any[] = this.gameProxy.lobbyIndex;
    private routerPath = "/";

    private core = core;

    isLogin(): boolean {
        const { userInfo } = this.selfProxy;
        return !!(userInfo && userInfo.user_id);
    }

    constructor() {
        super(HeaderMediator);
    }

    setLobbyIndex(data: any) {
        this.lobbyIndex = data;
    }

    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    private goHome() {
        if (this.$router.app.$route.path != "/") {
            router.push("/");
        }
        ScrollUtil(0);
    }

    private goIntroduce() {
        router.push("/introduce");
    }

    private handlerLogin() {
        dialog_login.show();
    }
    private handlerRegister() {
        const loginProxy: LoginProxy = this.getProxy(LoginProxy);
        loginProxy.showRegister();
    }

    private goAnchor(id: string) {
        this.goHome();
        setTimeout(() => {
            var anchor: any = document.getElementById(id);
            if (anchor) {
                ScrollUtil(anchor.offsetTop);
            }
        }, 100);
    }
}
</script>

<style scoped lang="scss">
@import "@/style/fontsize.scss";
a {
    text-decoration: none;
}
::v-deep .v-toolbar__content {
    padding: 0px;
}
.nav-button {
    display: flex;
    padding: 0 32px;
    font-size: 18px;
    font-weight: 500;
    line-height: 60px;
    transition: color 0.2s ease-in-out;
    color: rgba(157, 177, 216, 0.6);
    white-space: nowrap;
    height: 60px;
    svg {
        max-height: 22px;
        max-width: 22px;
        transition: all 0.2s ease-in-out;
        margin-right: 4px;
        fill: rgba(157, 177, 216, 0.6);
    }
    i {
        color: rgba(157, 177, 216, 0.6);
    }
}
.nav-button.active {
    border-radius: 8px;
    color: #ffcc68;
    background-image: linear-gradient(0deg, #2c4a7ab2 0%, #2c4a7a00 100%);
    svg {
        fill: #ffcc68;
    }
    i {
        color: #ffcc68;
    }
}
.nav-button:hover {
    border-radius: 8px;
    color: #ffcc68;
    background-image: linear-gradient(0deg, #2c4a7ab2 0%, #2c4a7a00 100%);
    svg {
        fill: #ffcc68;
    }
    i {
        color: #ffcc68;
    }
}

</style>
