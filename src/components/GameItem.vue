<template>
    <v-card width="224" height="280" class="rounded-lg card-gap" @click="goGamePlay">
        <v-img class="game-icon" :src="getIcon(item)">
            <div class="game-title font-weight-bold">{{ item.vendor_product_name }}</div>
            <div class="vendor-title">{{ item.vendor_name }}</div>
            <div class="egame__item__mask">
                <div class="egame__item__play-icon">
                    <div class="icon-box iconfont" style="font-size: 48px; --gap: 8px">
                        <div class="icon-chevron-right icon__icon mt-n1"></div>
                    </div>
                </div>
            </div>
        </v-img>
    </v-card>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class GameItem extends AbstractView {
    @Prop() item!:any;

    private getIcon(item: any) {
        if (item.icon.indexOf("http") != -1) {
            return item.icon;
        } else {
            if (item.list_type == 0) {
                return `img/productimage/${item.icon}`;
            } else {
                return `img/changlogo/${item.icon}`;
            }
        }
    }

    private goGamePlay(){
        const gameProxy:GameProxy = this.getProxy(GameProxy);
        gameProxy.api_vendor_var_ori_product_show_var(this.item);
    }
}
</script>

<style lang="scss" scoped>
.card-gap{
    // margin-left: 7px;
    // margin-right: 7px;
    margin: 7px;
}
.game-icon {
    cursor: pointer;
    .game-title {
        transition: all 0.3s ease-in-out 0s;
        position: absolute;
        bottom: 0;
        font-size: 30px;
        width: 100%;
        height: 61px;
        line-height: 61px;
        text-shadow: 0.1em 0.1em 0.2em black;
        margin-bottom: 30px;
    }
    .vendor-title {
        transition: all 0.3s ease-in-out 0s;
        position: absolute;
        bottom: -5px;
        font-size: 16px;
        width: 100%;
        height: 51px;
        letter-spacing: 2px;
        line-height: 51px;
        text-shadow: 0.1em 0.1em 0.2em black;
    }
}
.game-icon:hover {
    .game-title {
        font-size: 33px;
    }
    .vendor-title {
        font-size: 18px;
    }
}
::v-deep .v-responsive__content {
    text-align: center;
}
.egame__item__mask {
    height: 100%;
    display: grid;
    place-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 200ms linear;

    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
}
.egame__item__mask:hover {
    opacity: 1;
}
.egame__item__play-icon {
    width: 60px;
    height: 60px;
    display: inline-grid;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    font-size: 48px;
}
</style>
