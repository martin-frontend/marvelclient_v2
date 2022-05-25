export default class PageMineProxy extends puremvc.Proxy {
    static NAME = "PageMineProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
        this.sendNotification(net.HttpType.api_user_var_backwater_trial, {
            user_id: core.user_id,
        });
    }

    pageData = {
        loading: false,
        nextExp: 0, //等级还差
        nextUSDT: 0, //,USDT充值
        vipProgress: 0, //vip 进度条
        vipLevel: 0, //目前vip等级
        vipConfig: [], //vip 所有等级
    };

    userInfo: core.UserInfoVO = {};

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        console.warn("user info >>>", this.userInfo);
        if (this.userInfo.vip_info) {
            const vip_progress = <any>this.userInfo.vip_info?.vip_progress[0];
            const vip_info = <any>this.userInfo.vip_info;
            const vip_config_info = <any>this.userInfo.vip_config_info;

            this.pageData.nextExp = vip_progress.next_vip_level_need_exp - vip_progress.user_exp;
            this.pageData.vipProgress = (Number(vip_progress.user_exp) / Number(vip_progress.next_vip_level_need_exp)) * 100;
            this.pageData.vipLevel = vip_info.vip_level;
            this.pageData.vipConfig = vip_config_info?.vip_config;
            // console.warn("== ==", this.pageData.vipConfig);
        }
    }

    setTrial(body: any) {
        console.log("setTrial >>", body);
    }
    /**返水试算领取接口 */
    api_user_var_backwater_trial_receive() {
        this.sendNotification(net.HttpType.api_user_var_backwater_trial_receive, {
            user_id: core.user_id,
        });
    }
}
