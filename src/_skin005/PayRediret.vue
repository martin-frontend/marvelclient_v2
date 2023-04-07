<template>
    <div class="divbox">
        <div class="top">
            <div class="loading rotate" v-if="data.status == 0 || data.status == 3"></div>
            <img src="./assets/pay_redirect/1.png" width="120" height="120" alt="" />
        </div>
        <div>
            <div class="status">{{ statusOptions[data.status] }}</div>
            <div class="order">{{ LangUtil("订单编号") }} {{ order_no }}</div>
            <div class="btnclass">{{ LangUtil("确定") }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import PayRediret from "./PayRediret";

@Component
export default class extends PayRediret {}
</script>

<style lang="scss" scoped>
.divbox {
    margin-top: 40px;
    text-align: center;
    font-size: 14px;
}
.btnclass {
    margin-top: 20px !important;
    cursor: pointer;
    line-height: 36px;
    border-radius: 10px;
    background: linear-gradient(to right, #fcb131, #ffe64d);
    width: 104px;
    height: 36px;
    margin: auto;
    font-weight: bold;
    font-size: 16px;
}
.status {
    margin-bottom: 10px;
    font-size: 16px;
    color: #feba00;
}
.loading {
    position: absolute;
    height: 120px;
    width: 120px;
    background-image: url("./assets/pay_redirect/2.png");
    background-size: 120px;
    background-position: center;
}
.top {
    position: relative;
    display: flex;
    height: 135px;
    justify-content: center;
}
.rotate {
    animation: rotation 1s linear infinite;
}
@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.order {
    color: #5d5d5d;
}
</style>
