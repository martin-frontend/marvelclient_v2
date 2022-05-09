<template>
    <div class="mt-8 font-weight-bold">
        <div class="text-18 mb-4 ml-2">热门活动</div>
        <div class="box-container">
            <v-img class="box-container-prize" src="@/assets/activity/cat.png">
                <div class="text-26">投注挖J9BC，终身享分红</div>
                <div class="text-16 mt-4">当前分红池:</div>
                <div class="text-54 font-weight-black gradient-text">$270,207</div>
                <v-sheet class="btn text-18 mt-5" rounded="pill">领取分红</v-sheet>
            </v-img>
            <div class="d-flex">
                <v-img class="mr-5 card-swiper" max-width="344" height="315" src="@/assets/activity/swap.png">
                    <div class="card-swiper-bottom">查看详情</div>
                </v-img>
                <v-img class="card-swiper" max-width="344" height="315" src="@/assets/activity/reg.png">
                    <div class="card-swiper-bottom">查看详情</div>
                </v-img>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";

@Component
export default class Activity extends AbstractView {}
</script>

<style scoped lang="scss">
@import "@/style/fontsize.scss";

.box-container {
    display: grid;
    grid-template-columns: 705px 1fr;
    grid-gap: 16px;
    gap: 16px;
    overflow: hidden;
    overflow-x: scroll;
}
.gradient-text {
    background: linear-gradient(#eef5fe, #89c0fb);
    -webkit-background-clip: text;
    color: transparent;
}
.box-container-prize {
    width: 702px;
    height: 360px;
    cursor: pointer;
    padding: 48px 0 105px 40px;
    .btn {
        background-color: white;
        text-align: center;
        width: 168px;
        height: 48px;
        color: rgb(50, 68, 102);
        line-height: 48px;
    }
}
.box-container-prize:hover {
    .btn {
        background-color: #ffaf1a;
        color: white;
    }
}

.card-swiper {
    cursor: pointer;
    .card-swiper-bottom {
        transform: translateY(100%);
        opacity: 0;
        font-size: 12px;
        text-align: center;
        line-height: 34px;
        background-color: rgba(255, 255, 255, 0.04);
        letter-spacing: 0.5px;
        width: 164px;
        color: rgba(255, 255, 255, 0.4);
        transition: all 0.3s ease-in-out 0s;
        border-radius: 16px 16px 0px 0px;

        margin-left: 90px;
        bottom: 0px;
        position: absolute;
    }
}
.card-swiper:hover {
    .card-swiper-bottom {
        bottom: 34px;
        opacity: 1;
    }
}
</style>
