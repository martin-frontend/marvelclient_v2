<template>
    <div class="d-flex">
        <div>
            <v-carousel v-model="selectIndex" cycle height="auto" hide-delimiter-background show-arrows-on-hover :show-arrows="false">
                <v-carousel-item v-for="item of listData" :key="item.name">
                    <img :src="item.img" width="100%" class="ad-img" />
                </v-carousel-item>
            </v-carousel>
        </div>
        <ul class="swiper-operation">
            <li :class="selectIndex == index ? 'active' : ''" v-for="(item, index) of listData" :key="item.name">
                <button @click="onItemClick(item)">
                    <img :src="item.img_min" alt="" />
                    <p>{{ item.name }}</p>
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";

@Component
export default class Advertise extends AbstractView {
    listData = [
        {
            name: "J9 SWAP正式上线",
            img_min: require("@/assets/ad/ad1.min.webp"),
            img: require("@/assets/ad/ad1.webp"),
        },
        {
            name: "寻J9赌神，分亿元J9BC",
            img_min: require("@/assets/ad/ad2.min.webp"),
            img: require("@/assets/ad/ad2.webp"),
        },
        {
            name: "三重洗码百万奖池分红",
            img_min: require("@/assets/ad/ad3.min.webp"),
            img: require("@/assets/ad/ad3.webp"),
        },
        {
            name: "全球百家乐锦标赛",
            img_min: require("@/assets/ad/ad4.min.webp"),
            img: require("@/assets/ad/ad4.webp"),
        },
        {
            name: "集奖券领路虎卫士",
            img_min: require("@/assets/ad/ad5.min.webp"),
            img: require("@/assets/ad/ad5.webp"),
        },
    ];
    selectIndex = 0;

    private onItemClick(item: any) {
        this.selectIndex = this.listData.indexOf(item);
    }
}
</script>

<style scoped lang="scss">
@import "@/style/fontsize.scss";
.img-radius {
    border-top-left-radius: 100px;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    width: 325px;
    li {
        min-height: 90px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        text-align: left;
        padding: 0 16px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        button {
            display: flex;
            color: rgba(255, 255, 255, 0.8);
            img {
                width: 88px;
                border-radius: 8px;
                margin-right: 16px;
            }
            p {
                text-align: left;
                margin-bottom: 0px;
            }
        }
    }
    li:not(:last-child) {
        border-bottom: 2px solid #1c2b49;
    }
    .active {
        background-color: #33415d;
    }
}
li:hover {
    background-color: #33415d;
}
.swiper-operation {
    overflow: hidden;
    background-color: #1d3256;
    border-radius: 0 16px 16px 0;
    padding: 0;
    margin: 0;
    margin-left: 10px;
    width: 315px;
    height: 457px;
}
.ad-img {
    max-height: 457px;
    border-radius: 0px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
}
::v-deep .v-carousel--hide-delimiter-background .v-carousel__controls {
    display: none;
}
@media screen and (max-width: 1430px) {
    .swiper-operation {
        display: none;
    }
    .ad-img {
        max-height: none;
    }
    .ad-img {
        border-radius: 16px;
    }
    ::v-deep .v-carousel--hide-delimiter-background .v-carousel__controls {
        display: flex;
    }
}
</style>
