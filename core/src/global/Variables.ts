module core {
    /**版本号*/
    export var version: number = 0;
    export var version_str: string = "";
    /**host*/
    export var host: string = "http://qa1.api.api_universe_swoole.nqsf9emow.com:27799";
    /**用户ID*/
    export var user_id: number = 0;
    /**用户认证token*/
    export var token: string;
    /**应用平台:1-wap|2-app|4-web*/
    export var app_type: number = 1;
    /**设备类型 1:ios 2安卓 3其它 */
    export var device_type: number = 3;
    /**设备号*/
    export var device: string;
    /**平台ID*/
    export var plat_id: string = "10001";
    /**渠道ID*/
    export var channel_id: string = "10001001";
    /**域名 */
    export var game_domain: string = "";
    /**推荐号*/
    export var invite_user_id: any;
    /**用来获取配置文件的cdn地址 */
    export var cdnUrl:string = "http://others.sftpuser.nqsf9emow.com:27799";
    /**配置文件 */
    export var configVo: ConfigVO;
    /**语言 */
    export var lang:string = "en_EN";
    
}
