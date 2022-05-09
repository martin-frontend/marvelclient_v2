<template>
    <div class="mt-8">
        <div class="text-16 mb-1 ml-2 mr-4 d-flex align-center">
            <v-icon class="mr-1" color="primary">{{ gameProxy.categoryIcon[data.category] }}</v-icon>
            <div>{{ data.category_name }}</div>
            <v-spacer />
            <v-btn class="text-12 mr-16 rounded-pill" color="rgba(243, 231, 231, 0.098)" width="78" height="24">查看全部</v-btn>
        </div>
        <v-sheet max-width="1430" class="mx-auto" color="transparent">
            <v-slide-group show-arrows>
                <v-slide-item v-for="item of data.list" :key="item.index_no">
                    <v-card width="224" height="280" class="rounded-lg mr-4">
                        <v-img class="game-icon" :src="getIcon(item)">
                            <div class="game-title font-weight-bold">{{ item.vendor_product_name }}</div>
                            <div class="vendor-title ">{{ item.vendor_name }}</div>
                            <div class="egame__item__mask">
                                <div class="egame__item__play-icon">
                                    <div class="icon-box iconfont" style="font-size: 48px; --gap: 8px">
                                        <div class="icon-chevron-right icon__icon mt-n1"></div>
                                    </div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-slide-item>

                <!-- <v-slide-item>
                    <v-card width="224" height="280" class="rounded-lg mr-4">
                        <v-img class="game-icon" src="@/assets/game/gameicon.webp">
                            <div class="game-title font-weight-bold">古墓丽影</div>
                            <div class="vendor-title ">FUNFAIR</div>
                            <div class="egame__item__mask">
                                <div class="egame__item__play-icon">
                                    <div class="icon-box iconfont" style="font-size: 48px; --gap: 8px">
                                        <div class="icon-chevron-right icon__icon mt-n1"></div>
                                    </div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-slide-item> -->
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class GameGroup extends AbstractView {
    // @Prop(String) icon!: string;
    // @Prop(String) title!: string;
    // @Prop() list!:any;
    private gameProxy: GameProxy = this.getProxy(GameProxy);
    @Prop() data!: any;

    private setHotIcon(icon: any) {
        return `img/productimage/${icon}`;
    }

    private setVendorIcon(icon: any) {
        return `img/changlogo/${icon}`;
    }

    private getIcon(item: any) {
        if (item.list_type == 0) {
            return `img/productimage/${item.icon}`;
        } else {
            return `img/changlogo/${item.icon}`;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";

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

::v-deep .v-slide-group__prev {
    position: absolute;
    top: -38px;
    right: 40px;
    min-width: 0;
    border-radius: 12pt 0pt 0pt 12pt;
    width: 32px;
    height: 24px;
    i {
        font-size: 30px;
    }
}
::v-deep .v-slide-group__next {
    position: absolute;
    top: -38px;
    right: 5px;
    min-width: 0;
    border-radius: 0pt 12pt 12pt 0pt;
    width: 32px;
    height: 24px;
    i {
        font-size: 30px;
    }
}
::v-deep .theme--dark {
    .v-slide-group__prev,
    .v-slide-group__next {
        background: rgba(243, 231, 231, 0.098);
    }
}
::v-deep .theme--light {
    .v-slide-group__prev,
    .v-slide-group__next {
        background: rgba(243, 231, 231, 0.098);
    }
}
</style>
