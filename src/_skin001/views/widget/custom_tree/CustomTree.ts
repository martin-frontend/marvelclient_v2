import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class CustomTree extends AbstractView {
    LangUtil = LangUtil;
    @Prop() dataarr!: any;
    @Prop({ default: 1 }) layerCount!: number; //当前层数
    @Prop({ default: 1 }) selfLayer!: number; //自己的层数
    @Prop({ default: 2 }) directlyLayer!: number; //直属的层数

    isshow = false;
    public get showdata(): any {
        return this.dataarr;
    }

    public get nextLayerCount(): number {
        return this.layerCount + 1;
    }

    onClick(val: any) {
        if (val && val.length && val.length > 0 && val[0].user_id != this.dataarr.user_id) {
            this.$emit("onClick", val);
            return;
        }
        this.isshow = !this.isshow;
        this.$emit("onClick", [this.dataarr, this.isshow]);
    }
    onClickSure(val: any) {
        if (val && val.user_id && val.user_id != this.dataarr.user_id) {
            if (!val.parents) {
                val.parents = <any>[];
                val.parents.push(val.user_id);
            }
            val.parents.unshift(this.dataarr.user_id);
            this.$emit("onClickSure", val);
            return;
        }
        //console.log("点击确定筛选");
        this.$emit("onClickSure", this.dataarr);
    }

    public get isCreateOther(): boolean {
        if (this.dataarr.directly_users && this.dataarr.directly_users > 0) {
            return true;
        } else {
            return false;
        }
    }

    public getlevelText(index: number): string {
        let str = "";
        switch (index) {
            case 1:
                str = "一级";
                break;
            case 2:
                str = "二级";
                break;
            case 3:
                str = "三级";
                break;
            case 4:
                str = "四级";
                break;
            case 5:
                str = "五级";
                break;
            case 6:
                str = "六级";
                break;
            case 7:
                str = "七级";
                break;
            case 8:
                str = "八级";
                break;
            case 9:
                str = "九级";
                break;
            case 10:
                str = "十级";
                break;
            case 11:
                str = "十一级";
                break;
            default:
                str = str + index;
                break;
        }
        return LangUtil(str);
    }
}
