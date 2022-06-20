module core {
    /**初始化*/
    export function init() {
        net.initCommand();
        // 获取唯一码（设备码）
        let uuid = getQueryVariable("uuid") || window.localStorage.getItem("uuid");
        if (!uuid) {
            uuid = core.generateUUID();
            window.localStorage.setItem("uuid", uuid);
        }
        device = uuid;
        // 获取推荐号
        invite_user_id = (getQueryVariable("invite") || "").replace("/", "");
        // 自动登录
        token = window.localStorage.getItem("token");
        token && (user_id = parseInt(window.localStorage.getItem("user_id")) || 0);

        plat_id = getQueryVariable("plat_id") || "10001";
        channel_id = getQueryVariable("channel_id") || "10001001";
        app_type = EnumAppType.WEB;
        // device_type = parseInt(getQueryVariable("RunType")) || EnumDeviceType.OTHER;

        const runType = parseInt(getQueryVariable("RunType"));
        if(runType){
            device_type = runType;
        }else{
            if(isAndroid()){
                device_type = EnumDeviceType.ANDROID;
            }else if(isIOS()){
                device_type = EnumDeviceType.IOS;
            }else{
                device_type = EnumDeviceType.OTHER;
            }
        }
    }
}
