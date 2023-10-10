import GameConfig from "@/core/config/GameConfig";
import PanelUtil from "./PanelUtil";
import Vue from "vue";

//保存 设置
function saveLocalStorageTheme() {
    const obj = {
        theme: Vue.vuetify.framework.theme.dark,
        time: new Date(),
    };
    window.localStorage.setItem("theme_custom", JSON.stringify(obj));
}

/**
 * 用户之前保存的 主题
 */
function getLocalStorageTheme() {
    const obj = window.localStorage.getItem("theme_custom");
    if (obj) {
        const timeObj = JSON.parse(obj);
        return timeObj;
    }
    return obj;
}

//自动设置主题  亮 与 暗
function autoSetTheme() {
    const themeObj = getLocalStorageTheme();
    if (themeObj) {
        //检查时间是否符合要求
        const time_save = new Date(themeObj.time);
        console.log("_ 保存的时间", time_save);

        const time_now = new Date();
        console.log("_ 当前的时间", time_now);
    }
}

export default {};
