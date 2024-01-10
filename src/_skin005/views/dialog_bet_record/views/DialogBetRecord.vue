<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogBetRecord from "./DialogBetRecord";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import CustomDatePick from "@/_skin005/views/widget/custom_date_pick/CustomDatePick.vue";
import CustomMobileDatePicker from "@/_skin005/views/widget/custom_mobile_date_picker/CustomMobileDatePicker.vue";
import UserIdList from "@/_skin005/views/dialog_bet_record/widget/user_id_list/UserIdList.vue";
import DetailCricket from "@/_skin005/views/dialog_bet_record/widget/detail_cricket/DetailCricket.vue";
import DetailEasybet from "@/_skin005/views/dialog_bet_record/widget/detail_easybet/DetailEasybet.vue";
import DetailFb from "@/_skin005/views/dialog_bet_record/widget/detail_fb/DetailFb.vue";
import DetailExchange from "@/_skin005/views/dialog_bet_record/widget/detail_exchange/DetailExchange.vue";
@Component({
    components: {
        CustomSelect,
        CustomDatePick,
        CustomMobileDatePicker,
        UserIdList,
        DetailCricket,
        DetailEasybet,
        DetailFb,
        DetailExchange,
    },
})
export default class extends DialogBetRecord {}
</script>
