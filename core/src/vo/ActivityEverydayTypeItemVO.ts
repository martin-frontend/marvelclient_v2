module core {
    export interface ActivityEverydayTypeItemVO {
        /**大规则名称*/
        name: string;
        /**图标icon*/
        icon: string;
        /**打开模块*/
        open_mode: number;
        /**大规则ID*/
        rule_num: number;
        /**是否已完成:0-否|1-是*/
        complete: number;
        /**是否可领奖:0-否|1-是*/
        receive: number;
        /**任务进度:1-待完成|2-待分享|3-待签到|81-待领取|91-已完成*/
        process: number;
        condition: {
            /**独立规则-类型:1-条件|21-消耗*/
            type: string;
            /**独立规则-参数值*/
            params: number;
            /**独立规则-游戏房间ID*/
            params_probability: string;
            /**独立规则-游戏房间名称*/
            room_name: string;
            /**当前用户此规则是否匹配:false-否|true-是【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
            match: boolean;
            /**当前用户匹配此规则时的真实数值【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
            match_num: number;
            /**子规则名称*/
            name: string;
        };
        award: {
            /**独立规则-类型:61-奖励|71-概率奖池*/
            type: string;
            /**独立规则-参数值*/
            params: string;
            /**独立规则-参数名称*/
            params_name: string;
            /**独立规则-派奖类型:1-金币|2-积分|3-京东卡*/
            award_type: number;
        };
    }
}
