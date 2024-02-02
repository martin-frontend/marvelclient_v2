import { timeText } from "../global/Functions";
import GlobalVar from "../global/GlobalVar";
import LangUtil from "../global/LangUtil";

/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-09-21 17:20:04
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-21 17:22:13
 * @FilePath: /marvelclient_v2/src/core/config/ActivityConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class ActivityConfig {
    static config = {
        sign_info: { is_open: false, activity_id_arr: [] }, // 是否开启签到
        every_day: { is_open: false, activity_id_arr: [] }, // 是否开启每日任务
        ball_rank: { is_open: false, activity_id_arr: [] }, // 是否开启彩球
        spin: { is_open: false, activity_id_arr: [] }, // 是否开启转盘
        every_point: { is_open: false, activity_id_arr: [], extend_arr: [] }, // 是否开启积分转盘
        rank_list: { is_open: false, activity_id_arr: <any>[] }, // 是否开启转盘
    };

    static init(data: any) {
        Object.assign(this.config, data);
        if (this.config.every_point && this.config.every_point.is_open) {
            const obj = {
                model_type: 14,
                last_end_time: this.config.every_point.extend_arr[0],
            };
            this.setPointSpinData(obj);
        }
    }
    static spinLastTimeTxt = "";
    static spinLastTimeCount = 0;
    static spinTimeHandle = 0;
    static pointSpinData = {
        model_type: 0,
        last_end_time: 0,
    };
    static setSpinLastTimeTxt() {
        const timeObj = timeText(this.spinLastTimeCount, true);
        if (timeObj.day) {
            this.spinLastTimeTxt = timeObj.day + LangUtil("天") + timeObj.hours + LangUtil("小时");
        } else if (timeObj.hours) {
            this.spinLastTimeTxt = timeObj.hours + LangUtil("小时") + timeObj.minutes + LangUtil("分钟");
        } else {
            this.spinLastTimeTxt = timeObj.minutes + LangUtil("分钟") + timeObj.seconds + LangUtil("秒");
        }
    }
    static setPointSpinData(data: any) {
        if (data.model_type != 14) return;
        Object.assign(this.pointSpinData, data);
        // this.spinLastTimeTxt = "";
        this.spinLastTimeCount = this.pointSpinData.last_end_time - GlobalVar.server_time;
        if (this.spinLastTimeCount < 0) {
            this.spinLastTimeTxt = LangUtil("已结束");
        }
        if (this.spinTimeHandle) {
            clearInterval(this.spinTimeHandle);
        }
        this.spinTimeHandle = setInterval(() => {
            this.spinLastTimeCount = this.spinLastTimeCount - 1;
            if (this.spinLastTimeCount < 0) {
                clearInterval(this.spinTimeHandle);
                this.spinLastTimeTxt = LangUtil("已结束");
                return;
            }
            this.setSpinLastTimeTxt();
        }, 1000);
        this.setSpinLastTimeTxt();
    }
}
