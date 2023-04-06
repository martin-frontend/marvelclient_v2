interface ConfigVO {
    id: string;
    apiUrl: string; //API 接口地址
    cdnUrl: string; //CDN 地址
    registrationType: number[]; //注册支持类型, 1,2,4,8
    lang: string; //语言版本

    version: string; //版本号
    platID: string; //平台号
    channelID: string; //渠道号
    modelType: number; //模版类型
    modelID: string; //模版编号
    platUrl: string; //跳转平台地址

    upload_version: string;
    faceBookEvent: number;
    gaEvent: number;
    gtmEvent: string;
}
