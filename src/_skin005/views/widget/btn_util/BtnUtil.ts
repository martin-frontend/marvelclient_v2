import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class BtnUtil extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: "fit-content" }) width!: number | string;
    @Prop({ default: "auto" }) height!: number | string;
    @Prop({ default: 90 }) min_width!: number;
    @Prop({ default: 9 }) btn_type!: number | string;
    @Prop({ default: false }) disabled!: boolean;

    public get cur_btn_class(): string {
        if (this.btn_type == "nomal" || this.btn_type == 1) {
            //样式一   默认 黄色渐变 黑白一样， 禁用： 白 灰  黑 黑 渐变
            return "btn_base base_border btn_nomal";
        } else if (this.btn_type == "two" || this.btn_type == 2) {
            //样式二  渐变边框 透明底  禁用 单色
            return "test_my base_border";
        } else if (this.btn_type == "three" || this.btn_type == 3) {
            //样式三  黄色渐变 黑白一样 禁用 单色
            return "btn_base base_border btn_nomal";
        } else if (this.btn_type == "four" || this.btn_type == 4) {
            //样式四  黄色渐变 黑白一样 禁用 单色   半角
            //return "btn_base helf_border btn_nomal ";
            return "btn_base helf_border btn_helf_new ";
        } else if (this.btn_type == "five" || this.btn_type == 5) {
            //样式五  渐变边框 透明底  禁用 单色
            return "btn_base base_border btn_two btn_outline";
        } else if (this.btn_type == "six" || this.btn_type == 6) {
            //样式六  手机版 首页 进入图标 主要区别是 圆角 使用的是 6
            return "btn_base border_5 btn_nomal";
        } else if (this.btn_type == "game_btn" || this.btn_type == 7) {
            //样式七 首页 游戏开始按钮
            return "btn_base game_border btn_nomal";
        } else if (this.btn_type == "ebet_btn" || this.btn_type == 8) {
            //样式八 游戏列表 真人炼油 进入游戏，默认渐变，悬浮  黑白
            return "btn_base base_border buttton_yellow";
        } else if (this.btn_type == "btn_9" || this.btn_type == 9) {
            //样式八 游戏列表 真人炼油 进入游戏，默认渐变，悬浮  黑白
            return "btn_base base_border btn_9";
        } else if (this.btn_type == "btn_10" || this.btn_type == 10) {
            //样式九 用于btn组
            return "btn_base base_border btn_10";
        }
        return "";
    }

    public get cur_btn_class_disable(): string {
        let str = "";
        if (this.btn_type == "nomal" || this.btn_type == 1) {
            //样式一   默认 黄色渐变 黑白一样， 禁用： 白 灰  黑 黑
            str = "disable_base btn_nomal_disable";
        } else if (this.btn_type == "two" || this.btn_type == 2) {
            str = "disable_base test_my_disable";
        } else if (this.btn_type == "three" || this.btn_type == 3) {
            str = "disable_base btn_three_disable";
        } else if (this.btn_type == "four" || this.btn_type == 4) {
            //样式四  黄色渐变 黑白一样 禁用 单色   半角
            str = "disable_base btn_helf_new_disable";
        } else if (this.btn_type == "five" || this.btn_type == 5) {
            str = "disable_base btn_two_disable";
        } else if (this.btn_type == "six" || this.btn_type == 6) {
            //样式六  手机版
            str = "disable_base btn_three_disable";
        } else if (this.btn_type == "game_btn" || this.btn_type == 7) {
            //样式七 首页 游戏开始按钮
            str = "disable_base btn_nomal_disable";
        } else if (this.btn_type == "ebet_btn" || this.btn_type == 8) {
            //样式七 首页 游戏开始按钮
            str = "disable_base btn_nomal_disable";
        } else if (this.btn_type == "btn_9" || this.btn_type == 9) {
            //样式八 游戏列表 真人炼油 进入游戏，默认渐变，悬浮  黑白
            str = "disable_base btn_9_disable";
        } else if (this.btn_type == "btn_10" || this.btn_type == 10) {
            //样式八 游戏列表 真人炼油 进入游戏，默认渐变，悬浮  黑白
            str = "disable_base btn_10_disable";
        }
        return this.cur_btn_class + " " + str;
    }
}
