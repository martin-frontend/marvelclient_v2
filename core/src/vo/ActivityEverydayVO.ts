module core {
    export interface ActivityEverydayVO {
        /**每日任务中可领取奖励的数量*/
        unread_num: number;
        list: ActivityEverydayTypeVO[];
    }
}
