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
        vipNextLevel: 0,
        vipConfig: [], //vip 所有等级
        //主币
        backwaterConfigMain: <any>{
            now: 0,
            next: 0,
        },
        //奖励币
        backwaterConfigReward: <any>{
            now: 0,
            next: 0,
        },
    };

    userInfo: core.UserInfoVO = {};

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        console.warn("user info >>>", this.userInfo);
        if (this.userInfo.vip_info) {
            const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
            const vip_info = <any>this.userInfo.vip_info;
            const vip_config_info = <any>this.userInfo.vip_config_info;

            this.pageData.nextExp = vip_progress[0].next_vip_level_need_exp - vip_progress[0].user_exp;
            this.pageData.nextUSDT = vip_progress[1].next_vip_level_need_exp - vip_progress[1].user_exp;
            this.pageData.vipProgress = (Number(vip_progress.user_exp) / Number(vip_progress.next_vip_level_need_exp)) * 100;
            this.pageData.vipLevel = vip_info.vip_level;
            this.pageData.vipConfig = vip_config_info?.vip_config;
            this.pageData.vipNextLevel =
                this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;
            //主币
            this.pageData.backwaterConfigMain.now = (
                this.pageData.vipConfig[this.pageData.vipLevel]["backwater_config"][2]["backwater_rate"] * 100
            ).toFixed(2);
            this.pageData.backwaterConfigMain.next = (
                this.pageData.vipConfig[this.pageData.vipNextLevel]["backwater_config"][2]["backwater_rate"] * 100
            ).toFixed(2);
            //奖励币
            this.pageData.backwaterConfigReward.now = (
                this.pageData.vipConfig[this.pageData.vipLevel]["backwater_config"][3]["backwater_rate"] * 100
            ).toFixed(2);
            this.pageData.backwaterConfigReward.next = (
                this.pageData.vipConfig[this.pageData.vipNextLevel]["backwater_config"][3]["backwater_rate"] * 100
            ).toFixed(2);
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
