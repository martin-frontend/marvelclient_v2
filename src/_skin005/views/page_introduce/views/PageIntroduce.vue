<template src="./PageIntroduce.vue.html" lang="html"></template>
<style src="./PageIntroduce.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageIntroduce from "./PageIntroduce";

import Guihua from "../widget/guihua/Guihua.vue";
import Howget from "../widget/howget/Howget.vue";
import Infoline from "../widget/infoline/Infoline.vue";
import Jieshao from "../widget/jieshao/Jieshao.vue";
import Planmap from "../widget/planmap/Planmap.vue";
import Yongtu from "../widget/yongtu/Yongtu.vue";

@Component({
    components: {
        Guihua,
        Howget,
        Infoline,
        Jieshao,
        Planmap,
        Yongtu,
    },
})
export default class extends PageIntroduce {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
