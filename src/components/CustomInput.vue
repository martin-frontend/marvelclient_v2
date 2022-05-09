<template>
    <div class="input-text d-flex align-center pr-2">
        <v-icon v-if="icon" class="ml-3" color="colorInfo">{{ icon }}</v-icon>
        <input class="ml-3" :type="getType()" :placeholder="placeholder" @input="onInput" v-model="inputValue" />
        <v-btn v-if="value.length > 0" class="mr-2" icon width="20" height="20" @click="onClear">
            <v-icon class="mx-3" size="20" color="colorInfo">mdi-close-circle</v-icon>
        </v-btn>
        <v-btn v-if="type == 'password'" class="mr-2" icon width="20" height="20" @click="onToggle">
            <v-icon class="mx-3" size="20" color="colorInfo">{{ !bShowPassword ? "mdi-eye" : "mdi-eye-off" }}</v-icon>
        </v-btn>
        <div v-if="$slots.default" class="mr-2">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
@Component
export default class CustomInput extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;

    private inputValue = this.getValue;
    private bShowPassword = true;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }

    private onInput(value: any) {
        this.$emit("input", this.inputValue);
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    getType(): string {
        if (this.type == "password") {
            return this.bShowPassword ? this.type : "text";
        }
        return this.type;
    }

    private onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }

    private onToggle() {
        this.bShowPassword = !this.bShowPassword;
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/params.scss";
@import "@/style/fontsize.scss";
@import "@/style/input.scss";
</style>
