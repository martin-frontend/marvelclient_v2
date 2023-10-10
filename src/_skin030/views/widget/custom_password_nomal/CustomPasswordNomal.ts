import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class CustomPasswordNomal extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: 20 }) maxlength!: number;
    @Prop({ default: false }) isBottomLine!: boolean;
    @Prop({ default: false }) isReadonly!: boolean; //
    inputValue = this.getValue;
    bShowPassword = true;

    isFocus = false;

    @Prop() value!: any;
    @Watch("value")
    onValueChange() {
        this.inputValue = this.value;
    }
    public get inputClass(): string {
        let str = "";
        if (this.isBottomLine) {
            str = "input-text-border-bottom";
        } else {
            str = "input-text";
        }

        if (this.isFocus) {
            str = str + "_focus";
        }
        return str;
    }

    onInput(value: any) {
        this.inputValue = this.inputValue.replace(/[\u4e00-\u9fa5]/g, "");
        this.inputValue = this.inputValue.replace(/\s*/g, "");
        this.$emit("input", this.inputValue);
    }

    onBlur() {
        //this.isFocus = false;
        this.$emit("blur");
    }
    onFocus() {
        // this.isFocus = true;
        this.$emit("focus");
    }

    get getValue() {
        return this.value ? this.value : "";
    }

    getType(): string {
        return this.bShowPassword ? "password" : "text";
    }

    onClear() {
        this.inputValue = "";
        this.$emit("input", this.inputValue);
    }

    onToggle() {
        this.bShowPassword = !this.bShowPassword;
    }
    mounted() {
        if (this.isReadonly) {
            //@ts-ignore
            window["removeAttr"] = this.removeAttr.bind(this);
            //@ts-ignore
            window["setAttr"] = this.setAttr.bind(this);
        }
    }
    public removeAttr(idName: string) {
        document.getElementById(idName)?.addEventListener("click", this.handleClick);
        document.getElementById(idName)?.addEventListener("keydown", this.handleKeydown);
        document.getElementById(idName)?.addEventListener("mousedown", this.handleMousedown);
        setTimeout(() => {
            console.log("移除 节点");
            document.getElementById(idName)?.removeAttribute("readonly");
        }, 300);
    }
    public setAttr(idName: string) {
        setTimeout(() => {
            console.log("添加  节点");
            document.getElementById(idName)?.setAttribute("readonly", "true");
        }, 300);
    }
    handleClick(e: any) {
        if (e.type === "click") {
            document.getElementById(e.target.id)?.blur();
            document.getElementById(e.target.id)?.focus();
        }
    }
    handleKeydown(e: any) {
        if (e.type === "keydown") {
            const keyCode = e.keyCode;
            const passwordText = <HTMLInputElement>document.getElementById(e.target.id);
            if (keyCode === 8 || keyCode === 46) {
                const len = passwordText.value.length;
                if (len === 1) {
                    passwordText.value = "";
                    return false;
                }
                if (e.target.selectionStart === 0 && e.target.selectionEnd === len) {
                    passwordText.value = "";
                    return false;
                }
            }
            return true;
        }
    }
    handleMousedown(e: any) {
        if (e.type === "mousedown") {
            document.getElementById(e.target.id)?.blur();
            document.getElementById(e.target.id)?.focus();
        }
    }
}
