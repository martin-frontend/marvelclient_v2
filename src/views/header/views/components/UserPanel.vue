<template>
    <v-sheet class="bg rounded-lg pa-3 pt-4" elevation="0" color="#16233B" width="288">
        <v-img class="rounded-pill mx-auto" src="@/assets/avatar/Avatar0.png" max-width="56" max-height="56"></v-img>
        <div class="mx-auto mt-2 text-16 font-weight-medium">{{userInfo.nick_name}}</div>

        <v-sheet class="rounded-lg mt-3 py-1" color="#24314A">
            <div class="d-flex align-center ml-2 item" v-for="item of menuList" :key="item.id">
                <v-icon small>{{ item.icon }}</v-icon>
                <div class="ml-2">{{ item.name }}</div>
                <v-spacer />
                <div class="icon-box iconfont mx-3 mr-4 text-14" style="transform: rotate(-90deg)"></div>
            </div>
        </v-sheet>

        <MenuGroup :title="activityGroup.title">
            <div class="d-flex align-center ml-2 item" v-for="item of activityGroup.list" :key="item.id">
                <v-icon small>{{ item.icon }}</v-icon>
                <div class="ml-2">{{ item.name }}</div>
                <v-spacer />
            </div>
        </MenuGroup>

        <div class="d-flex flex-wrap mt-2">
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
            <v-img
                class="ma-1"
                src="https://hx1web.hstax1tic.com/static/media/glamor-zh.e5b5ba24.png"
                max-width="124"
                max-height="64"
            ></v-img>
        </div>

        <MenuGroup title="中文简体" :icon="require(`@/assets/icon/lang/icon_zh.png`)">
            <div class="d-flex align-center ml-2 item1" v-for="item of langGroup" :key="item.id">
                <v-img :src="item.icon" max-width="15" max-height="15"></v-img>
                <div class="ml-2">{{ item.name }}</div>
                <v-spacer />
                <div class="circle mr-5">
                    <v-img class="img" :src="require(`@/assets/header/icon_xuanzhong.svg`)"></v-img>
                </div>
            </div>
        </MenuGroup>

        <div class="d-flex colorBlue--text mt-3 ml-1 cursor-pointer" @click="onLoginOut">
            <div>登出</div>
            <v-spacer />
        </div>
    </v-sheet>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import SelfProxy from "@/proxy/SelfProxy";
import Component from "vue-class-component";
import MenuGroup from "./MenuGroup.vue";
@Component({
    components: {
        MenuGroup,
    },
})
export default class UserPanel extends AbstractView {
    private menuList = [
        { id: 0, name: "安全中心", icon: "mdi-shield-check" },
        { id: 1, name: "历史记录", icon: "mdi-clock" },
        { id: 2, name: "消息中心", icon: "mdi-bell" },
        { id: 3, name: "J9币介绍", icon: "mdi-bell" },
        { id: 4, name: "J9BC记录", icon: "mdi-bell" },
    ];
    private activityGroup = {
        title: "优惠活动",
        list: [
            { id: 0, name: "安全中心", icon: "mdi-shield-check" },
            { id: 1, name: "历史记录", icon: "mdi-clock" },
            { id: 2, name: "消息中心", icon: "mdi-bell" },
        ],
    };
    private langGroup = [
        { id: 0, name: "中文简体", icon: require(`@/assets/icon/lang/icon_zh.png`) },
        { id: 1, name: "English", icon: require(`@/assets/icon/lang/icon_en.png`) },
    ];

    private selfProxy:SelfProxy = this.getProxy(SelfProxy);
    private userInfo = this.selfProxy.userInfo;

    private onLoginOut(){
        this.selfProxy.api_user_logout();
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/params.scss";
.bg {
    background-color: #16233b;
    background-image: linear-gradient(175.8deg, #5199fd42 0%, #5199fd00 100px);
    text-align: center;
}

::v-deep.v-icon.v-icon {
    color: #9db1d8 !important;
}

.item {
    cursor: pointer;
    font-weight: 600;
    height: 38px;
    width: 100%;
    color: $colorBlue;
}
.item:hover {
    color: white;
    i {
        color: white !important;
    }
}
.item-group-title {
    cursor: pointer;
    height: 38px;
    width: 100%;
    color: $colorBlue;
    .arrow {
        font-weight: 600;
    }
}
.item1 {
    cursor: pointer;
    height: 38px;
    width: 100%;
    color: $colorBlue;
}
.circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #9db1d8;
    box-sizing: border-box;
    position: relative;
    .img {
        display: none;
    }
}
.circle-active {
    border: 0px solid #9db1d8;
    .img {
        display: block;
    }
}
</style>
