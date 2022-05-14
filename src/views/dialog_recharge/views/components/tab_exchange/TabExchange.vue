<template src="./TabExchange.vue.html" lang="html"></template>
<style src="./TabExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabExchange from "./TabExchange";

@Component({
    components: {
        CustomSelect,
        Overlay,
    },
})
export default class extends TabExchange {
    mounted() {
        this.myProxy.exchangeProxy.api_user_var_exchange_method_list();
    }
}
</script>
