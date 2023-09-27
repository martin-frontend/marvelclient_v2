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
        sign_info: { is_open: false }, // 是否开启签到
        every_day: { is_open: false }, // 是否开启每日任务
        ball_rank: { is_open: false }, // 是否开启彩球
    };

    static init(data: any) {
        Object.assign(this.config, data);
    }
}
