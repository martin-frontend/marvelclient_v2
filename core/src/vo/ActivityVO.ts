module core {
    export interface ActivityVO {
        /**活动ID*/
        id: number;
        /**平台ID*/
        plat_id: number;
        /**活动名称*/
        activity_name: string;
        /**开始时间*/
        start_time: string;
        /**结束时间*/
        end_time: string;
        /**结算周期:1-每天|2-每周|3-每月|4-每个活动|5-每半月*/
        settlement_period: number;
        /**展示方式:0-客户端处理|1-平台H5展示|2-外部链接|4-图片上传*/
        show_type: number;
        /**展示方式对应的链接地址*/
        link_url: string;
        /**是否预热:0-否|1-是*/
        is_preheat: number;
        /**发布状态:1-待发布|2-已发布|3-已撤销*/
        publish_status: number;
        /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
        process_status: number;
        /**活动描述*/
        activity_desc: string;
    }
}
