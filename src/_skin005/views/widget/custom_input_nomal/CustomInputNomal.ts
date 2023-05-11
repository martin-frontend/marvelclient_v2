import AbstractView from "@/core/abstract/AbstractView";
import { amountFormat, GoldformatNumber } from "@/core/global/Functions";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomInputNomal extends AbstractView {
    @Prop() icon!: string;
    @Prop() placeholder!: string;
    @Prop({ default: "text" }) type!: string;
    @Prop({ default: "#ff0" }) iconcolor!: string;
    @Prop({ default: 100 }) maxlength!: number;
    @Prop() disabled!: number;
    @Prop() readonly!: number;
    @Prop() height!: string;
    @Prop() isOnlyNumber!: boolean;
    @Prop({ default: true }) isNeedCloseBtn!: boolean;
    @Prop() isOnlyInt!: boolean;
    @Prop() isOnlyFloat!: boolean;
    @Prop({ default: true }) isBottomLine!: boolean;
    @Prop() inputColor!: string;
    @Prop({ default: false }) formatNumber!: boolean;
    @Prop({ default: false }) isEnterGold!: boolean;
    @Prop({
        default: function () {
            return { thousandSeparated: true };
        },
    })
    @Prop({ default: "" })
    inputId!: string;

    Custnumbro!: object; //thousandSeparated 表示千分位 mantissa表示保留后面几位小数点0 表示整数位

    inputValue = "";
    originalNumber = "";
    _lang = core.lang.replace("_", "-");
    isFocus = false;

    @Prop() value!: any;
    @Watch("value", { immediate: true })
    onValueChange(val: string) {
        if (this.isOnlyNumber) {
            //this.inputValue = val.replace(/[^\d.]/g, "");
            this.inputValue = this.formatNumber ? amountFormat(val.replace(/[^\d]/g, "")) : val.replace(/[^\d]/g, "");
            return;
        }
        if (this.isEnterGold && val && !this.isFocus) {
            const [numberPart, dotPart] = this.splitLastDot(val);
            this.originalNumber = numberPart;
            this.inputValue = parseFloat(this.originalNumber).toLocaleString(core.lang.substring(0, 2), {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
            this.inputValue = this.inputValue + dotPart;
        } else {
            this.inputValue = val;
        }
    }

    onInput(event: any) {
        if (this.isOnlyNumber) {
            // this.inputValue = event.target.value.replace(/[^\d.]/g, "");
            // this.$emit("input", this.inputValue);

            if (this.formatNumber) {
                this.inputValue = amountFormat(event.target.value.replace(/[^\d]/g, "").substring(0, this.maxlength - 1));
            } else {
                this.inputValue = event.target.value.replace(/[^\d]/g, "");
            }

            this.$emit("input", this.inputValue.replace(/,/g, ""));

            return;
        }
        if (this.isOnlyInt) {
            this.inputValue = event.target.value.replace(/[^0-9]/g, "");
            this.$emit("input", this.inputValue);
            return;
        }
        if (this.isOnlyFloat) {
            //this.inputValue = event.target.value.replace(/[^\d.]/g, "");

            if (this.formatNumber) {
                this.inputValue = amountFormat(event.target.value.replace(/[^\d.]/g, "").substring(0, this.maxlength - 1), true);
            } else {
                this.inputValue = event.target.value.replace(/[^\d.]/g, "");
            }

            this.$emit("input", this.inputValue.replace(/,/g, ""));
            return;
        }
        if (this.isEnterGold) {
            event.target.value = event.target.value.replace(/[^0-9.]/g, "");
            if (event.target.value) {
                const [numberPart, dotPart] = this.splitLastDot(event.target.value);
                this.originalNumber = numberPart;
                this.originalNumber = GoldformatNumber(this.originalNumber).toString() + dotPart;
                this.inputValue = this.originalNumber;
            } else {
                this.inputValue = event.target.value;
            }
            //    this.inputValue = GoldformatNumber(this.inputValue).toString();
            this.$emit("input", this.inputValue);
            return;
        }
        this.$emit("input", this.inputValue);
    }

    onClear() {
        this.originalNumber = "";
        this.inputValue = "";
        this.$emit("input", this.inputValue);
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

    onBlur() {
        this.isFocus = false;
        if (this.isEnterGold) {
            if (this.inputValue) {
                this.inputValue = parseFloat(this.originalNumber).toLocaleString(core.lang.substring(0, 2), {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                });
                this.originalNumber = GoldformatNumber(this.originalNumber).toString();
                this.$emit("input", this.originalNumber);
            }
        }

        this.$emit("blur");
    }
    onFocus() {
        if (this.isEnterGold) {
            if (this.inputValue) this.inputValue = this.originalNumber;
        }
        this.isFocus = true;
        this.$emit("focus");
    }
    splitLastDot(input: string): [string, string] {
        // 找到第一个点的索引
        const firstDotIndex = input.indexOf(".");

        // 如果没有找到点，返回原始字符串和空字符串
        if (firstDotIndex === -1) {
            return [input, ""];
        }

        // 移除除第一个点之外的其他点
        const sanitizedInput = input.slice(0, firstDotIndex + 1) + input.slice(firstDotIndex + 1).replace(/\./g, "");

        // 判断最后一个字符是否为点
        const lastCharIsDot = sanitizedInput[sanitizedInput.length - 1] === ".";

        // 如果点位于末尾，返回处理后的字符串和一个点
        if (lastCharIsDot) {
            return [sanitizedInput.slice(0, -1), "."];
        }

        // 如果点不在末尾，返回处理后的字符串和空字符串
        return [sanitizedInput, ""];
    }
    endInput() {
        this.$emit("endInput");
    }
}
