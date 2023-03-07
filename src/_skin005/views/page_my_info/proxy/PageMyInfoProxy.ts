export default class PageMyInfoProxy extends puremvc.Proxy {
    static NAME = "PageMyInfoProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        nextExp: 0, //等级还差
        nextUSDT: 0, //,USDT充值
        vipProgress: 0, //vip 进度条
        vipLevel: 0, //目前vip等级
        vipNextLevel: 0, //vip下一等
        vipConfig: [], //vip 所有等级
        vipMaxLevel: 0, //最大等级
    };
    userInfo: core.UserInfoVO = {};

    pageInit(data: any) {
        Object.assign(this.userInfo, data);
        //console.warn("this.userInfo >>>", this.userInfo);
        const vip_progress = <any>this.userInfo.vip_info?.vip_progress;
        const vip_info = <any>this.userInfo.vip_info;
        const vip_config_info = <any>this.userInfo.vip_config_info;
        if (!vip_info)
        {
            return;
        }
        // 等级Max
        this.pageData.vipMaxLevel = vip_info.max_vip_level ? vip_info.max_vip_level : 0;
        //console.log("最大 等级", vip_info.max_vip_level);
        // 流水等级
        if (vip_progress[0]) {
            this.pageData.nextExp = <any>(Number(vip_progress[0].next_vip_level_need_exp) - Number(vip_progress[0].user_exp)).toFixed(2);
        }
        // USDT充值
        if (vip_progress[1]) {
            this.pageData.nextUSDT = <any>(Number(vip_progress[1].next_vip_level_need_exp) - Number(vip_progress[1].user_exp)).toFixed(2);
        }

        // 经验条
        this.pageData.vipProgress =
            ((vip_progress[0].user_exp - vip_progress[0].cur_vip_level_need_exp) /
                (vip_progress[0].next_vip_level_need_exp - vip_progress[0].cur_vip_level_need_exp)) *
            100;
        //this.pageData.vipProgress = 85;
        // 目前vip等级
        this.pageData.vipLevel = vip_info.vip_level;
        this.pageData.vipConfig = vip_config_info?.vip_config;
        if (vip_info.max_vip_level) {
            this.pageData.vipNextLevel =
                this.pageData.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.pageData.vipLevel + 1;
        }
    }
}
