<template src="./DialogDirectly.vue.html" lang="html"></template>
<style src="./DialogDirectly.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin003/views/widget/overlay/Overlay.vue";
import DialogDirectly from "./DialogDirectly";
import CustomInput from "@/_skin003/views/widget/custom_input/CustomInput.vue";
import ListNodata from "@/_skin003/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/_skin003/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        CustomInput,
        Overlay,
        ListNodata,
        LoadMore,
    },
})
export default class extends DialogDirectly {}
</script>
