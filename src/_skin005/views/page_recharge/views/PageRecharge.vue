<!--
 * @Author: custer custer@xx.xx
 * @Date: 2023-03-08 17:34:29
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-25 18:02:36
 * @FilePath: /marvelclient_v2/src/_skin005/views/page_recharge/views/PageRecharge.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template src="./PageRecharge.vue.html" lang="html"></template>
<style src="./PageRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageRecharge from "./PageRecharge";
import TabExchange from "./components/tab_exchange/TabExchange.vue";
import TabRecharge from "./components/tab_recharge/TabRecharge.vue";
import TabTransfer from "./components/tab_transfer/TabTransfer.vue";
import TabCurrencyExchange from "./components/tab_currency_exchange/TabCurrencyExchange.vue";

@Component({
    components: {
        TabExchange,
        TabRecharge,
        TabTransfer,
        TabCurrencyExchange,
    },
})
export default class extends PageRecharge {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
