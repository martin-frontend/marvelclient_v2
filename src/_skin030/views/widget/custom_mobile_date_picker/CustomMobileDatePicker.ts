import AbstractView from "@/core/abstract/AbstractView";
import { amountFormat, dateFormat, getTodayOffset, GoldformatNumber } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomMobileDatePicker extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: "" }) start!: any;
    @Prop({ default: "" }) end!: any;
    @Prop({ default: "" }) valueFormat!: any;
    @Prop({ default: true }) showIcon!: any;

    firstShowStart = false;
    firstShowEnd = false;

    startTime = this.start;
    @Watch("startTime")
    onWatchStartTime(time: any) {
        this.$emit("update:start", time);
    }

    endTime = this.end;
    @Watch("endTime")
    onWatchEndTime(time: any) {
        this.$emit("update:end", time);
    }

    pickerOptionsStart = {
        disabledDate: (time: any) => {
            if (this.endTime) {
                return time.getTime() > new Date(this.end).getTime();
            }
        },
    };
    pickerOptionsEnd = {
        disabledDate: (time: any) => {
            if (this.startTime) {
                return time.getTime() < new Date(this.start).getTime();
            }
        },
    };

    showStart() {
        if (!this.firstShowStart) {
            // @ts-ignore
            this.$refs.startDate.focus();
        }
    }

    showEnd() {
        if (!this.firstShowEnd) {
            // @ts-ignore
            this.$refs.endDate.focus();
        }
    }

    startBlur() {
        this.firstShowStart = true;
        if (this.firstShowEnd) {
            this.finished();
        } else {
            this.showEnd();
        }
    }

    endBlur() {
        this.firstShowEnd = true;
        if (this.firstShowStart) {
            this.finished();
        } else {
            this.showStart();
        }
    }

    finished() {
        this.$emit("change");
        this.firstShowStart = false;
        this.firstShowEnd = false;
    }
}
