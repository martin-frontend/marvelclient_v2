<!-- <template src="./GameNavigationSearch.vue.html" lang="html"></template> -->
<template>
    <v-navigation-drawer color="colorPanelBg" class="rounded-xl" width="450" v-model="navigationData.bShow" app temporary floating>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="text-18 ml-2">搜索游戏</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
                <v-btn icon @click="navigationData.bShow = false">
                    <v-icon large color="white"> mdi-close </v-icon>
                </v-btn>
            </v-list-item-icon>
        </v-list-item>
        <v-tabs hide-slider grow background-color="transparent" v-model="tabs" @change="onTabsChange">
            <v-tab>
                <v-chip
                    class="rounded-xl d-flex justify-center align-center"
                    :ripple="false"
                    :class="tabs === 0 ? 'tabs-active' : 'tabs-deactive'"
                    :color="tabs === 0 ? 'colorBtnBg' : 'transparent'"
                >
                    <v-icon size="29" class="mr-2">mdi-circle</v-icon>
                    <span class="text-16">收藏游戏</span>
                </v-chip>
            </v-tab>
            <v-tab>
                <v-chip
                    class="rounded-xl d-flex justify-center align-center"
                    :ripple="false"
                    :class="tabs === 1 ? 'tabs-active' : 'tabs-deactive'"
                    :color="tabs === 1 ? 'colorBtnBg' : 'transparent'"
                >
                    <v-icon size="29" class="mr-2">mdi-circle</v-icon>
                    <span class="text-16">最近游戏</span>
                </v-chip>
            </v-tab>
            <v-tab>
                <v-chip
                    class="rounded-xl d-flex justify-center align-center"
                    :ripple="false"
                    :class="tabs === 2 ? 'tabs-active' : 'tabs-deactive'"
                    :color="tabs === 2 ? 'colorBtnBg' : 'transparent'"
                >
                    <v-icon size="29" class="mr-2">mdi-circle</v-icon>
                    <span class="text-16">游戏查询</span>
                </v-chip>
            </v-tab>
        </v-tabs>
        <v-divider class="my-2 ml-6 mr-8"></v-divider>
        <v-tabs-items v-model="tabs">
            <v-tab-item>
                <v-row no-gutters v-for="item of navigationData.collection" :key="item.id" class="py-2 pl-7 pr-6 mb-1 align-center white--text">
                    <v-col cols="3">
                        <v-img max-width="80" height="80" max-height="80" :src="item.icon">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-linear indeterminate color="gold"></v-progress-linear>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                    <v-col class="d-flex flex-column">
                        <span class="text-18">{{ item.vendor_product_name }}</span>
                        <span class="text-18">{{ item.vendor_name }}</span>
                    </v-col>
                    <v-col cols="auto" class="mr-2">
                        <v-rating
                            @input="onCollect(item)"
                            v-model="item.is_collection"
                            length="1"
                            clearable
                            background-color="orange lighten-1"
                            color="#FFB01A"
                            full-icon="mdi-circle"
                            empty-icon="mdi-circle-outline"
                            size="41"
                            dense
                        ></v-rating>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn width="100" height="40" class="playgame-btn" color="colorBtnBg" @click="onEnterGame(item)">去游戏</v-btn>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row no-gutters v-for="item of navigationData.recently" :key="item.id" class="py-2 pl-7 pr-6 mb-1 align-center white--text">
                    <v-col cols="3">
                        <v-img max-width="80" height="80" max-height="80" :src="item.icon">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-linear indeterminate color="gold"></v-progress-linear>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                    <v-col class="d-flex flex-column">
                        <span class="text-18">{{ item.vendor_product_name }}</span>
                        <span class="text-18">{{ item.vendor_name }}</span>
                    </v-col>
                    <v-col cols="auto" class="mr-2">
                        <v-rating
                            @input="onCollect(item)"
                            v-model="item.is_collection"
                            length="1"
                            clearable
                            background-color="orange lighten-1"
                            color="#FFB01A"
                            full-icon="mdi-circle"
                            empty-icon="mdi-circle-outline"
                            size="41"
                            dense
                        ></v-rating>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn width="100" height="40" class="playgame-btn" color="colorBtnBg" @click="onEnterGame(item)">去游戏</v-btn>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item>
                <v-row>
                    <v-col>
                        <v-text-field class="mx-6" height="50" flat outlined placeholder="查询游戏">
                            <template v-slot:prepend-inner>
                                <v-icon size="29" class="mr-2" color="#4C5D7F">mdi-circle</v-icon>
                            </template>
                            <template v-slot:append>
                                <v-btn width="80" height="35" class="rounded-lg primary text-subtitle-1" color="colorBtnBg">查询</v-btn>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="navigationData.searchList.length === 0">
                    <v-col class="search-nodata d-flex flex-column justify-center align-center">
                        <v-img max-width="112" height="100" max-height="112" :src="navigationData.noSearchGameIcon"></v-img>
                        <span class="text-14 search-nodata-text mt-2">暂无记录</span>
                    </v-col>
                </v-row>
                <v-row no-gutters v-for="item of navigationData.searchList" :key="item.id" class="py-2 pl-7 pr-6 mb-1 align-center white--text">
                    <v-col cols="3">
                        <v-img max-width="80" height="80" max-height="80" :src="item.icon">
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-linear indeterminate color="gold"></v-progress-linear>
                                </v-row>
                            </template>
                        </v-img>
                    </v-col>
                    <v-col class="d-flex flex-column">
                        <span class="text-18">{{ item.vendor_product_name }}</span>
                        <span class="text-18">{{ item.vendor_name }}</span>
                    </v-col>
                    <v-col cols="auto" class="mr-2">
                        <v-rating
                            @input="onCollect(item)"
                            v-model="item.is_collection"
                            length="1"
                            clearable
                            background-color="orange lighten-1"
                            color="#FFB01A"
                            full-icon="mdi-circle"
                            empty-icon="mdi-circle-outline"
                            size="41"
                            dense
                        ></v-rating>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn width="100" height="40" class="playgame-btn" color="colorBtnBg" @click="onEnterGame(item)">去游戏</v-btn>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </v-navigation-drawer>
</template>
<style src="./GameNavigationSearch.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import GameNavigationSearch from "./GameNavigationSearch";

@Component
export default class extends GameNavigationSearch {}
</script>
