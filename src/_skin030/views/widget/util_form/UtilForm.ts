import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class UtilForm extends AbstractView {
    LangUtil = LangUtil;
    /**传入进来的数组 或者对象 */
    @Prop() data!: any;
    /**没有数据的判断 */
    @Prop() isNoData!: boolean;
    /**分页信息，如果有 */
    @Prop() pageInfo!: any;
    /**默认高度 */
    @Prop({ default: 450 }) height!: number;
    /**是否为正在加载 */
    @Prop({ default: undefined }) isLoading!: boolean;
    onPageChange(val: any) {
        this.$emit("onPageChange", val);
    }
}
