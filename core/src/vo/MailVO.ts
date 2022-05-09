module core {
    /**
     * 邮件
     */
    export interface MailVO {
        /**邮件ID*/
        id: number;
        /**数据归属标记*/
        data_belong: string;
        /**邮件内容ID*/
        content_id: number;
        /**平台用户ID*/
        user_id: number;
        /**平台用户ID*/
        plat_id: number;
        /**渠道ID*/
        channel_id: number;
        /**是否已读:0-否|1-是*/
        is_read: number;
        /**阅读时间*/
        read_at: string;
        /**奖励金币*/
        attachment_gold: number;
        /**奖励积分*/
        attachment_score: number;
        /**附件状态:1-无附件|11-待打开[待领取]|21-已打开[已领取]*/
        attachment_status: number;
        /**附件打开时间*/
        attachment_open_at: string;
        /**是否删除:0-否|1-是*/
        is_delete: number;
        /**删除类型:1-用户删除|11-后台删除*/
        delete_type: number;
        /**创建人【默认用户system】*/
        created_by: string;
        /**创建时间*/
        created_at: string;
        /**修改人【默认用户system】*/
        updated_by: string;
        /**修改时间*/
        updated_at: string;
        /**标题*/
        title: string;
        /**类型:1-平台|11-活动*/
        cate: number;
        /**内容*/
        content: string;

        
    }
}
