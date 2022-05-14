<template>
    <div style="width: 100%">
        <v-menu offset-y nudge-bottom="5">
            <template v-slot:activator="{ on, attrs }">
                <v-sheet
                    class="d-flex align-center rounded-lg pl-4"
                    width="100%"
                    height="41"
                    color="colorPanelTitleBg"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-img v-if="icons" class="mr-2" :src="icons[selectValue]" max-width="20" height="20"></v-img>
                    <div>{{ options[selectValue] && options[selectValue].name }}</div>
                    <v-spacer />
                    <div
                        v-if="options && Object.keys(options).length > 1"
                        class="icon-box iconfont mx-4 mr-5 text-14"
                        :class="attrs['aria-expanded'] == 'true' ? 'arrow-show' : 'arrow'"
                    >
                        
                    </div>
                </v-sheet>
            </template>
            <v-sheet class="rounded-lg py-2" color="colorPanelTitleBg" v-if="options && Object.keys(options).length > 1">
                <div class="d-flex align-center listitem pl-4 cursor-pointer" v-for="(item, key) of options" :key="key" @click="onChange(key)">
                    <v-img v-if="icons" class="mr-2" :src="icons[key]" max-width="20" height="20"></v-img>
                    <div>{{ item.name }}</div>
                </div>
            </v-sheet>
        </v-menu>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Emit, Prop, Watch } from "vue-property-decorator";
@Component
export default class CustomSelect extends AbstractView {
    @Prop() options!: any;
    @Prop() icons!: any;

    private selectValue = this.getValue;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.selectValue = this.value;
    }

    get getValue() {
        return this.value != undefined ? this.value : "";
    }

    private onChange(value: any) {
        this.selectValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
    }
}
</script>

<style lang="scss" scoped>
.arrow {
    transform: rotate(0deg);
    font-weight: 600;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.arrow-show {
    transform: rotate(180deg);
    font-weight: 600;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.listitem {
    height: 41px;
    color: gray;
}
.listitem:hover{
    color: white;
}
</style>
