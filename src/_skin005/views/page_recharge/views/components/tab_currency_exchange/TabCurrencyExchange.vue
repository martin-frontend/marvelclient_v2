<!--
 * @Author: custer custer@xx.xx
 * @Date: 2023-09-25 19:38:04
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-27 17:10:08
 * @FilePath: /marvelclient_v2/src/_skin005/views/page_recharge/views/components/tab_currency_exchange/TabCurrencyExchange.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template src="./TabCurrencyExchange.vue.html" lang="html"></template>
<style src="./TabCurrencyExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";
import Component from "vue-class-component";
import TabCurrencyExchange from "./TabCurrencyExchange";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends TabCurrencyExchange {}
</script>
